class HttpError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

class SchemaError extends Error {
	constructor(messageArray, status) {
		super();
		this.status = status;
		this.messageArray = messageArray;
	}
}

export { HttpError, SchemaError };
