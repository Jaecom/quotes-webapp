import { useCallback, useMemo } from "react";

let isObserve = true;

const enableObserve = () => (isObserve = true);
const disableObserve = () => (isObserve = false);

const useObserver = (
	target: React.RefObject<HTMLElement>,
	callback: (enableObserve: () => void, disableObserve: () => void) => void
) => {
	const observer = useMemo(() => {
		const ObserverCallback: IntersectionObserverCallback = (entries, observer) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting && isObserve) {
					callback(enableObserve, disableObserve);
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
		enableObserve();
		target?.current && observer.observe(target!.current);
	}, [observer, target]);

	const detachObserver = useCallback(() => {
		disableObserve();
		target?.current && observer.unobserve(target.current);
	}, [observer, target]);

	return [attachObserver, detachObserver];
};

export default useObserver;
