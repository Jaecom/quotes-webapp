import classes from "./PreviewImage.module.scss";
import inputClasses from "../../UI/Form/Input.module.scss";
import Loading from "../../UI/Loading/Loading";
import { useEffect, useState } from "react";

interface Props {
	inputUrl: string;
	localImage: string;
	inputRef: React.RefObject<HTMLInputElement>;
}

const isValidHttpUrl = (inputUrl: string) => {
	let url: URL;

	try {
		url = new URL(inputUrl);
	} catch (e) {
		return { isValidUrl: false, errorMessage: "Invalid url" };
	}

	if (url.protocol !== "https:" && url.protocol !== "http:") {
		return { isValidUrl: false, errorMessage: "Invalid url" };
	}

	if (url.host !== ("images.unsplash.com" || "images.pexels.com")) {
		return {
			isValidUrl: false,
			errorMessage: "Url must come from images.unsplash.com or images.pexels.com",
		};
	}

	return { isValidUrl: true, errorMessage: "" };
};

const PreviewImage = ({ inputUrl, inputRef, localImage }: Props) => {
	const [imageUrl, setImageUrl] = useState("");
	const [imageLoaded, setImageLoaded] = useState(false);
	const [error, setError] = useState(false);

	const urlEmpty = inputUrl.trim() === "";
	const { isValidUrl, errorMessage } = isValidHttpUrl(inputUrl);
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
		setImageUrl(inputUrl);
		setImageLoaded(false);
		setError(false);
	}, [inputUrl]);

	useEffect(() => {
		setImageUrl(localImage);
		setImageLoaded(false);
		setError(false);

		inputRef.current!.value = "";
		inputRef.current?.classList.remove(inputClasses.error);
	}, [localImage, inputRef]);

	const status = () => {
		if (urlEmpty) {
			return <div className={classes.empty}>Insert URL</div>;
		}

		if (!isValidUrl || error) {
			return <div className={classes.invalid}>Insert valid url</div>;
		}

		//is loading
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
				src={imageUrl}
				alt="quote"
				onError={() => setError(true)}
				onLoad={() => setImageLoaded(true)}
			/>
		</div>
	);
};

export default PreviewImage;
