import { useState } from "react";

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	return [isModalOpen, openModal, closeModal];
};

export default useModal;
