import { useState, useCallback } from "react";

interface RequestObject {
	url: string;
	body?: FormData | string;
	method?: string;
	headers?: HeadersInit;
	credentials?: RequestCredentials;
}

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const sendRequest = useCallback(
		async (
			requestObject: RequestObject,
			processData: (data: any) => void,
			onError?: (e: any) => void
		) => {
			try {
				const { url, body, method, headers, credentials } = requestObject;
				setIsLoading(true);
				const res = await fetch(url, {
					body: body ?? null,
					method: method ?? "GET",
					headers: headers ?? { "Content-Type": "application/json" },
					credentials: credentials ?? "same-origin",
				});
				console.log(res);
				const data = await res.json();
				console.log(data);
				if (!res.ok) {
					throw new Error(data);
				}

				processData(data);
				setIsLoading(false);
			} catch (e: any) {
				onError && onError(e);
				setError(e.message);
				setIsLoading(false);
			}
		},
		[]
	);

	return [sendRequest, isLoading, error] as const;
};

export default useHttp;
