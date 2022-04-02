import AWS from "aws-sdk";
import { HttpError } from "../utils/CustomErrors.js";
import path from "path";
import { RequestHandler } from "express";
import { PutObjectRequest } from "aws-sdk/clients/s3";

const s3 = new AWS.S3({
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? "",
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? "",
	},
	region: "ap-northeast-2",
});

const getResizedImageUrl = (url: string, modString: string) => {
	//select bucketname
	//https://<bucketname>.example/example.jpg
	const regex = new RegExp("(?<=^(https|http)://)" + process.env.AWS_S3_BUCKET);
	const extension = path.extname(url);
	const newUrl = url
		//replace "bucket" name with "bucket-resized"
		.replace(regex, process.env.AWS_S3_BUCKET + "-resized")
		.replace(extension, "_" + modString + extension);

	return newUrl;
};

const uploadToS3: RequestHandler = (req, res, next) => {
	const file = req.file;

	const AWSparams: PutObjectRequest = {
		Bucket: process.env!.AWS_S3_BUCKET ?? "",
		Key: Date.now().toString() + "_" + file!.originalname,
		ContentType: file!.mimetype,
		Body: file!.buffer,
		Metadata: { fieldname: file!.fieldname },
	};

	const upload = s3.upload(AWSparams);

	upload.send(function (err, result) {
		if (err) return next(new HttpError("Something went wrong uploading the image", 400));

		const url = result.Location;
		const location = {
			original: url,
			medium: getResizedImageUrl(url, "medium"),
			thumbnail: getResizedImageUrl(url, "thumbnail"),
		};

		req.file!.location = location;
		next();
	});
};

export default uploadToS3;
