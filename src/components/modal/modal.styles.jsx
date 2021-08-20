import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalContainer = styled.div`
	position: absolute;
    z-index: 9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BoxContainer = styled.div`
  width: 520px;
  min-height: 580px;
  max-height: 580px;
  display: flex;
  flex-direction: column;
  //border-radius: 19px;
  background-color: white;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em 5em;
`;

export const BackDrop = styled(motion.div)`
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

export const CloseButton = styled.div`
  width: 32px;
  margin-left: auto;
  margin-right: 0;
  justify-content: right;
  z-index: 10;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: white;
  z-index: 10;
  margin: 0;
`;



export const SmallText = styled.h5`
  color: white;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 7px 0 0;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

export const backdropVariants = {
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

export const expandedTransition = {
	type: 'spring',
	duration: 2.3,
	stiffness: 30,
};