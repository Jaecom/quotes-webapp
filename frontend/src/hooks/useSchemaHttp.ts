import { useState, useCallback, useEffect } from "react";

class CustomError extends Error {
	error: [] | string;

	constructor(error: any) {
		super();
		this.error = error;
	}
}

interface RequestObject {
	url: string;
	body?: FormDataEntryValue | any;
	method?: string;
	headers?: Headers;
}

export type SchemaError = [{ path: string; message: string }] | string | undefined;

const useSchemaHttp = () => {
	const [error, setError] = useState<SchemaError>();
	const [errorField, setErrorField] = useState({});

	const sendRequest = useCallback(
		async (requestObject: RequestObject, processData: (data: any) => void) => {
			try {
				const { url, body, method, headers } = requestObject;
				const res = await fetch(url, {
					body: new URLSearchParams(body) ?? null,
					method: method ?? "GET",
					headers: headers ?? { "Content-Type": "application/x-www-form-urlencoded" },
					credentials: "include",
				});

				const data = await res.json();

				if (!res.ok) {
					throw new CustomError(data);
				}

				processData(data);
			} catch (e: any) {
				setError(e.error);

				if (Array.isArray(e.error)) {
					//return object with fields that matches input name
					const errorField = e.error.reduce((prev: any, current: { path: string }) => {
						return { ...prev, [current.path]: true };
					}, {});
					setErrorField(errorField);
				}
			}
		},
		[]
	);

	useEffect(() => {
		return () => {
			//reset setErrorField on unmount
			setErrorField({});
		};
	}, []);

	return [sendRequest, error, errorField] as const;
};

export default useSchemaHttp;
