import { string } from "joi";

class HttpError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

interface JOIError {
	path: string | number;
	message: string;
}

class SchemaError extends Error {
	status: number;
	messageArray: JOIError[] | string;

	constructor(messageArray: JOIError[] | string, status: number) {
		super();
		this.status = status;
		this.messageArray = messageArray;
	}
}

export { HttpError, SchemaError };
