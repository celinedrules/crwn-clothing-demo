import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import CartIcon from '../cart-icon/cart-icon.component';

import * as sc from './header.styles';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';

const Header = ({ currentUser, hidden, signOutStart }) => (
	<sc.HeaderContainer>
		<sc.LogoContainer to={'/'}>
			<Logo className={'logo'} />
		</sc.LogoContainer>
		<sc.OptionsContainer>
			<sc.OptionLink to={'/shop'}>SHOP</sc.OptionLink>
			<sc.OptionLink to={'/contact'}>CONTACT</sc.OptionLink>
			{currentUser ? (
				<sc.OptionLink as={'div'} onClick={signOutStart}>
					SIGN OUT
				</sc.OptionLink>
			) : (
				<sc.OptionLink to={'/signin'}>SIGN IN</sc.OptionLink>
			)}
			<CartIcon />
		</sc.OptionsContainer>
		{hidden ? null : <CartDropdownContainer />}
	</sc.HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
