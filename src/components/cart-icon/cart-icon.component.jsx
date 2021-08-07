import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { CartContainer, ItemCountContainer } from './cart-icon.styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
	<CartContainer onClick={toggleCartHidden}>
		<ShoppingIcon />
		<ItemCountContainer>{itemCount}</ItemCountContainer>
	</CartContainer>
);

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

// const CartIcon = () => {
// 	const itemCount = useSelector(state => selectCartItemsCount(state));
// 	const dispatch = useDispatch();
// 	const dispatchCartHidden = () => dispatch(toggleCartHidden());
// 	return (
// 		<CartContainer onClick={dispatchCartHidden}>
// 			<ShoppingIcon />
// 			<ItemCountContainer>{itemCount}</ItemCountContainer>
// 		</CartContainer>
// 	);
// };
//
// export default CartIcon;
