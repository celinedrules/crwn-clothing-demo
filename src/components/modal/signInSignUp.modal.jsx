import * as ms from '../../components/modal/modal.styles';
import React, { useState } from 'react';
import {connect} from 'react-redux';
import {AccountContext} from '../sign-in-sign-up/sign-in-sign-up.context';
import CloseIcon from '../../assets/close-icon.png';
import SigninForm from '../../components/sign-in/signin-form.component';
import { SignupForm } from '../sign-up/signup-form.component';
import { hideModal } from '../../redux/modal/modal.actions';

function SignInSignUpModal(props){
	const { dispatchHideModal, modal, modalType } = props;
	const [isExpanded, setExpanded] = useState(false);
	const [active, setActive] = useState('signin');
	
	const playExpandingAnimation = () => {
		setExpanded(true);
		setTimeout(() => {
				setExpanded(false);
			},
			ms.expandedTransition.duration * 1000 - 1500);
	};

	const switchToSignup = () => {
		playExpandingAnimation();
		setTimeout(() => {
			setActive('signup');
		}, 400);
	};

	const switchToSignin = () => {
		playExpandingAnimation();
		setTimeout(() => {
			setActive('signin');
		}, 400);
	};

	const contextValue = { switchToSignup, switchToSignin };

	const onCloseButtonClick = () => {
		dispatchHideModal();
	};

	return (
		<AccountContext.Provider value={contextValue}>
			<ms.ModalContainer>
				<ms.BoxContainer>
					<ms.CloseButton>
						<img src={CloseIcon} onClick={onCloseButtonClick} style={{ width: '32px' }} />
					</ms.CloseButton>
					<ms.TopContainer>
						<ms.BackDrop initial={false}
									 animate={isExpanded ? 'expanded' : 'collapsed'}
									 variants={ms.backdropVariants}
									 transition={ms.expandedTransition} />
						{active === 'signin' &&
						<ms.HeaderContainer>
							<ms.HeaderText>Welcome</ms.HeaderText>
							<ms.HeaderText>Back</ms.HeaderText>
							<ms.SmallText>Please sign-in to continue!</ms.SmallText>
						</ms.HeaderContainer>
						}
						{active === 'signup' &&
						<ms.HeaderContainer>
							<ms.HeaderText>Create</ms.HeaderText>
							<ms.HeaderText>Account</ms.HeaderText>
							<ms.SmallText>Please sign-up to continue!</ms.SmallText>
						</ms.HeaderContainer>
						}
					</ms.TopContainer>
					<ms.InnerContainer>
						{active === 'signin' &&
						<SigninForm handleDialogClose={onCloseButtonClick} hide={dispatchHideModal} />}
						{active === 'signup' && <SignupForm />}
					</ms.InnerContainer>
				</ms.BoxContainer>
			</ms.ModalContainer>
		</AccountContext.Provider>
	);
}

const mapDispatchToProps = {
	dispatchHideModal: hideModal,
};

export default connect(null, mapDispatchToProps)(SignInSignUpModal);