import { useState, useCallback } from "react";

interface RequestObject {
	url: string;
	body: string;
	method: string;
	headers: {
		[header: string]: string;
	};
}

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const sendRequest = useCallback(
		async (requestObject: RequestObject, processData: (data: any) => {}) => {
			try {
				const { url, body, method, headers } = requestObject;
				setIsLoading(true);
				const res = await fetch(url, {
					body: body ? JSON.stringify(body) : null,
					method: method ?? "GET",
					headers: headers ?? { "Content-Type": "application/json" },
				});

				if (!res.ok) {
					throw new Error("Something went wrong");
				}

				const data = await res.json();
				// console.log(data);
				processData(data);

				setIsLoading(false);
			} catch (e: any) {
				setError(e.message);
				setIsLoading(false);
			}
		},
		[]
	);

	return [sendRequest, isLoading, error];
};

export default useHttp;
