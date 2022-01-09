class HttpError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

module.exports.HttpError = HttpError;

class SchemaError extends Error {
	constructor(messageArray, status) {
		super();
		this.status = status;
		this.messageArray = messageArray;
	}
}

module.exports.SchemaError = SchemaError;
