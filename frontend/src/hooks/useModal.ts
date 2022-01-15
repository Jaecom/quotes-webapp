import { useCallback, useState } from "react";

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	return [isModalOpen, openModal, closeModal] as const;
};

export default useModal;
