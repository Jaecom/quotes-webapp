import { useCallback, useMemo } from "react";

const useObserver = (target: React.RefObject<HTMLElement>, callback: () => void) => {
	const observer = useMemo(() => {
		let debounceFlag = true;

		const ObserverCallback = (entries: any, observer: any) => {
			entries.forEach((entry: any) => {
				if (entry.isIntersecting && debounceFlag) {
					callback();

					debounceFlag = false;
					setTimeout(() => {
						debounceFlag = true;
					}, 50);
				}
			});
		};

		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.1,
		};

		return new IntersectionObserver(ObserverCallback, options);
	}, [callback]);

	const attachObserver = useCallback(() => {
		target?.current && observer.observe(target.current);
	}, [observer, target]);

	const detachObserver = useCallback(() => {
		target?.current && observer.unobserve(target.current);
	}, [observer, target]);

	return [attachObserver, detachObserver];
};

export default useObserver;
