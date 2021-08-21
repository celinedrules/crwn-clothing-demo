import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/thanyou.svg';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CartIcon from '../cart-icon/cart-icon.component';
import * as sc from './header.styles';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';
import UserMenu from '../user-menu/user-menu.component';
import { Title } from './header.styles';

const Header = ({ hidden }) => {
	return (
		<sc.HeaderContainer>
			<sc.LogoContainer to={'/'}>
				<Logo className={'logo'} />
			</sc.LogoContainer>
			<Title>
				Xiè Xiè Beads
			</Title>
			<sc.OptionsContainer style={{ paddingRight: '80px' }}>
				<sc.OptionLink to={'/shop'}>SHOP</sc.OptionLink>
				<sc.OptionLink to={'/contact'}>CONTACT</sc.OptionLink>
				<UserMenu />
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

export default connect(mapStateToProps)(Header);
