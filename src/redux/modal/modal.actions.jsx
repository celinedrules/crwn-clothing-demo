import ModalTypes from './modal.types';

export const ModalAction = () => ({
	type: ModalTypes,
	//payload: any
});

export const showModal = ModalAction => ({
	type: ModalTypes.SHOW_MODAL,
});

export const hideModal = ModalAction => ({
	type: ModalTypes.HIDE_MODAL,
});