import { useState, useCallback } from "react";

class CustomError extends Error {
	errorArray: [];
	isArray: boolean;

	constructor(error: any) {
		super(error.message);
		this.errorArray = error;
		this.isArray = Array.isArray(error);
	}
}

interface RequestObject {
	url: string;
	body?: string;
	method?: string;
	headers?: {
		[header: string]: string;
	};
	credentials?: RequestCredentials;
}

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const sendRequest = useCallback(
		async (requestObject: RequestObject, processData: (data: any) => void) => {
			try {
				const { url, body, method, headers, credentials } = requestObject;
				setIsLoading(true);
				const res = await fetch(url, {
					body: body ?? null,
					method: method ?? "GET",
					headers: headers ?? { "Content-Type": "application/json" },
					credentials: credentials ?? "same-origin",
				});
				// console.log(res);
				const data = await res.json();
				// console.log(data);
				if (!res.ok) {
					throw new CustomError(data);
				}

				processData(data);
				setIsLoading(false);
			} catch (e: any) {
				const error = e.isArray ? e.errorArray : e.message;
				setError(error);
				setIsLoading(false);
			}
		},
		[]
	);

	return [sendRequest, isLoading, error] as const;
};

export default useHttp;
