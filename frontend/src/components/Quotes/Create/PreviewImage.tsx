import classes from "./PreviewImage.module.scss";
import inputClasses from "../../UI/Form/Input.module.scss";
import Loading from "../../UI/Loading/Loading";
import { useEffect, useState } from "react";
import LoadingPopup from "../../UI/Loading/LoadingPopup";

interface Props {
	inputUrl: string;
	inputRef: React.RefObject<HTMLInputElement>;
}

const isValidHttpUrl = (inputUrl: string) => {
	let url;

	if (inputUrl.trim() === "") {
		return false;
	}

	try {
		url = new URL(inputUrl);
	} catch (e) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
};

const PreviewImage = ({ inputUrl, inputRef }: Props) => {
	const urlEmpty = inputUrl.trim() === "";
	const isValidUrl = isValidHttpUrl(inputUrl);

	const [imageLoaded, setImageLoaded] = useState(false);
	const [error, setError] = useState(false);
	const urlError = !urlEmpty && (!isValidUrl || error);

	useEffect(() => {
		if (!inputRef.current) {
			return;
		}

		const inputClassList = inputRef.current.classList;
		const errorClass = inputClasses.error;

		urlError ? inputClassList.add(errorClass) : inputClassList.remove(errorClass);
	}, [inputRef, urlError]);

	useEffect(() => {
		//reset whenever inputUrl changes
		setImageLoaded(false);
		setError(false);
	}, [inputUrl]);

	const status = () => {
		if (urlEmpty) {
			return <div className={classes.empty}>Insert URL</div>;
		}
		
		if (!isValidUrl || error) {
			return <div className={classes.invalid}>Image URL is broken</div>;
		}

		return (
			<div className={classes.loading}>
				<Loading />
			</div>
		);
	};

	return (
		<div className={classes["image-preview"]}>
			{!imageLoaded && <div className={classes["status-box"]}>{status()}</div>}
			<img
				src={inputUrl}
				alt=""
				onError={() => setError(true)}
				onLoad={() => setImageLoaded(true)}
			/>
		</div>
	);
};

export default PreviewImage;
