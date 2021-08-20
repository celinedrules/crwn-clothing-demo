import React from 'react';
import { connect } from 'react-redux';
import SignInSignUpModal from './signInSignUp.modal';

function Modal(props) {
	const { modal, modalType } = props;

	if (!modal) {
		return null;
	}

	return (
		<>
			{modalType === 'SignInSignUp' &&
			<SignInSignUpModal />
			}
		</>
	);
}

const mapStateToProps = (state) => ({
	modal: state.modal.modal,
});

export default connect(mapStateToProps)(Modal);