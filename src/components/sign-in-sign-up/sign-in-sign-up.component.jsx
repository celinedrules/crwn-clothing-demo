import React, { useState } from 'react';
import styled from 'styled-components';
import SigninForm from '../sign-in/signin-form.component';
import { SignupForm } from '../sign-up/signup-form.component';
import { motion } from 'framer-motion';
import { AccountContext } from './sign-in-sign-up.context';
//import CloseIcon  from '@material-ui/icons/Close'
import CloseIcon from '../../assets/close-icon.png';

const BoxContainer = styled.div`
  width: 520px;
  min-height: 580px;
  max-height: 580px	;
  display: flex;
  flex-direction: column;
  //border-radius: 19px;
  background-color: white;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -460px;
  left: -300px;
  background: rgb(52, 152, 219);
  background: linear-gradient(57deg, rgba(52, 152, 219, 1) 20%, rgba(18, 145, 171, 1) 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: white;
  z-index: 10;
  margin: 0;
`;

const CloseButton = styled.div`
  width: 32px;
  margin-left: auto;
  margin-right: 0;
  justify-content: right;
  z-index: 10;
  cursor: pointer;
`;

const SmallText = styled.h5`
  color: white;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 7px 0 0;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
	expanded: {
		width: '233%',
		height: '1350px',
		borderRadius: '20%',
		transform: 'rotate(60deg)',
		zIndex: '30',
		transition: {
			zIndex: {
				delay: .01,
			},
		},
	},
	collapsed: {
		width: '210%',
		height: '550px',
		borderRadius: '50%',
		transform: 'rotate(160deg)',
		zIndex: 'auto',
		transition: {
			zIndex: {
				delay: .3,
			},
		},
	},
};

const expandedTransition = {
	type: 'spring',
	duration: 2.3,
	stiffness: 30,
};

export function AccountBox(props)
{

	const { handleClose } = props;

	const [isExpanded, setExpanded] = useState(false);
	const [active, setActive] = useState('signin');

	const playExpandingAnimation = () =>
	{
		setExpanded(true);
		setTimeout(() =>
			{
				setExpanded(false);
			},
			expandedTransition.duration * 1000 - 1500);
	};

	const switchToSignup = () =>
	{
		playExpandingAnimation();
		setTimeout(() =>
		{
			setActive('signup');
		}, 400);
	};

	const switchToSignin = () =>
	{
		playExpandingAnimation();
		setTimeout(() =>
		{
			setActive('signin');
		}, 400);
	};

	const contextValue = { switchToSignup, switchToSignin };

	return (
		<AccountContext.Provider value={contextValue}>
			<BoxContainer>
				<CloseButton>
					<img src={CloseIcon} onClick={handleClose} style={{ width: '32px' }} />
				</CloseButton>
				<TopContainer>
					<BackDrop initial={false}
							  animate={isExpanded ? 'expanded' : 'collapsed'}
							  variants={backdropVariants}
							  transition={expandedTransition} />
					{active === 'signin' &&
					<HeaderContainer>
						<HeaderText>Welcome</HeaderText>
						<HeaderText>Back</HeaderText>
						<SmallText>Please sign-in to continue!</SmallText>
					</HeaderContainer>
					}
					{active === 'signup' &&
					<HeaderContainer>
						<HeaderText>Create</HeaderText>
						<HeaderText>Account</HeaderText>
						<SmallText>Please sign-up to continue!</SmallText>
					</HeaderContainer>
					}
				</TopContainer>
				<InnerContainer>
					{active === 'signin' && <SigninForm handleClose={handleClose} />}
					{active === 'signup' && <SignupForm />}
				</InnerContainer>
			</BoxContainer>
		</AccountContext.Provider>
	);
}