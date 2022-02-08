import multer from "multer";
import AWS from "aws-sdk";
import { quoteSchema } from "../schemas.js";
import { SchemaError } from "../utils/CustomErrors.js";
import { returnValidateErrorObject } from "../middleware/schema-validate.js";
import path from "path";

const s3 = new AWS.S3({
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY,
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
	},
	region: "ap-northeast-2",
});

function getDestination(req, file, cb) {
	cb(null, "/dev/null");
}

function S3Storage() {
	this.getDestination = getDestination;
}

S3Storage.prototype._handleFile = function _handleFile(req, file, cb) {
	this.getDestination(req, file, function (err, path) {
		if (err) return cb(err);

		// fieldname: 'imageFile',
		// originalname: 'Screenshot 2021-06-02 215458.jpg',
		// encoding: '7bit',
		// mimetype: 'image/jpeg'

		const AWSparams = {
			Bucket: process.env.AWS_S3_BUCKET,
			Key: Date.now().toString() + "_" + file.originalname,
			ContentType: file.mimetype,
			Body: file.stream,
			Metadata: { fieldname: file.fieldname },
		};

		const upload = s3.upload(AWSparams);

		upload.send(function (err, result) {
			if (err) return cb(err);

			const url = result.Location;
			cb(null, {
				location: {
					original: url,
					medium: getResizedImageUrl(url, "medium"),
					thumbnail: getResizedImageUrl(url, "thumbnail"),
				},
			});
		});
	});
};

function getResizedImageUrl(url, modification) {
	// example original
	//https://<bucketname>.example/example.jpg
	const regex = new RegExp("(?<=^(https|http)://)" + process.env.AWS_S3_BUCKET);
	//match extesion
	const extension = path.extname(url);

	const newUrl = url
		//replace "bucket" name with "bucket-resized"
		.replace(regex, process.env.AWS_S3_BUCKET + "-resized")
		.replace(extension, "_" + modification + extension);

	return newUrl;
}

S3Storage.prototype._removeFile = function _removeFile(req, file, cb) {
	s3.deleteObject({ Bucket: file.bucket, Key: file.key }, cb);
};

export default multer({
	fileFilter: function (req, file, cb) {
		const { error } = quoteSchema.validate(req.body, { abortEarly: false });
		
		if (error) {
			const msg = returnValidateErrorObject(error);
			return cb(new SchemaError(msg, 400));
		}

		return cb(null, true);
	},
	storage: new S3Storage(),
});
