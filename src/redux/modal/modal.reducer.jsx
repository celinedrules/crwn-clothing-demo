import { ModalAction } from './modal.actions';
import ModalTypes from './modal.types';

const initialState = {
	modal: false,
};

function modalReducer(state = initialState, action = ModalAction) {
	switch (action.type) {
		case ModalTypes.SHOW_MODAL:
			return {
				...state,
				modal: true,
			};
		case ModalTypes.HIDE_MODAL:
			return {
				...state,
				modal: false,
			};
		default:
			return state;
	}
}

//const rootReducer = combineReducers({ modal: modalReducer });

export default modalReducer;