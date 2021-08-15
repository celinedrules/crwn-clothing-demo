import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import CartIcon from '../cart-icon/cart-icon.component';
import * as sc from './header.styles';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';
import SignInSignUpDialogue from '../sign-in-sign-up/sign-in-sign-up.dialog';

const Header = ({ currentUser, hidden, signOutStart }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<sc.HeaderContainer>
			<sc.LogoContainer to={'/'}>
				<Logo className={'logo'} />
			</sc.LogoContainer>
			<sc.OptionsContainer style={{paddingRight: '80px'}}>
				<sc.OptionLink to={'/shop'}>SHOP</sc.OptionLink>
				<sc.OptionLink to={'/contact'}>CONTACT</sc.OptionLink>
				{currentUser ? (
					<sc.OptionLink as={'div'} to={'/#'} onClick={signOutStart}>SIGN OUT</sc.OptionLink>
				) : (
					<sc.OptionsContainer>
						<sc.OptionLink onClick={handleClickOpen} to={'/#'}>SIGN IN</sc.OptionLink>
						<SignInSignUpDialogue onClose={handleClose} open={open} />
					</sc.OptionsContainer>
				)}
				<CartIcon />
			</sc.OptionsContainer>
			{hidden ? null : <CartDropdownContainer />}
		</sc.HeaderContainer>
	);
};
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
