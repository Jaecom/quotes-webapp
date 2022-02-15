import fetch from "node-fetch";
import { SchemaError } from "../utils/CustomErrors.js";

const getBuffer = async (url) => {
	try {
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		return buffer;
	} catch (error) {
		throw new SchemaError([{ path: "imageUrl", message: "Cannot download from image url" }], 500);
	}
};

const parseImageUrl = async (req, res, next) => {
	const { imageUrl } = req.body;

	if (imageUrl) {
		const buffer = await getBuffer(imageUrl);
		req.file = {
			originalname: Date.now().toString() + "_image.jpg",
			mimetype: "image/jpeg",
			fieldname: "imageUrl",
			buffer,
		};
	}

	return next();
};

export default parseImageUrl;
