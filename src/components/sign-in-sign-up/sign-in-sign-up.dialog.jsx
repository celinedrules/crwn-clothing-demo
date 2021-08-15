import React from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import { SignInSignUp } from './sign-in-sign-up.component';

export default function SignInSignUpDialogue(props) {
	const { onClose, open } = props;

	const handleClose = (event, reason) => {
		if (reason === 'backdropClick') {
			return false;
		}

		if (typeof onClose === 'function') {
			onClose();
		}
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<SignInSignUp handleClose={handleClose} />
		</Dialog>
	);
}

SignInSignUpDialogue.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};