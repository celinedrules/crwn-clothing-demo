import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { ClickedOutside } from '../../redux/cart/cart.utils';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import {
	CartDropdownContainer,
	CartItemsContainer,
	EmptyMessageContainer,
} from './cart-dropdown.styles';

// --------- THIS DOES WORK ----------

const CartDropdown = ({ cartItems, history, dispatch }) => {
	const { wrapperRef, isVisible } = ClickedOutside();

	return (
		isVisible && (
			<CartDropdownContainer ref={wrapperRef}>
				<CartItemsContainer>
					{cartItems.length ? (
						cartItems.map(cartItem => (
							<CartItem key={cartItem.id} item={cartItem} />
						))
					) : (
						<EmptyMessageContainer>
							Your cart is empty
						</EmptyMessageContainer>
					)}
				</CartItemsContainer>
				<CustomButton
					onClick={() => {
						history.push('/payment');
						dispatch(toggleCartHidden());
					}}>
					GO TO CHECKOUT
				</CustomButton>
			</CartDropdownContainer>
		)
	);
};

// const CartDropdown = ({ cartItems, history, dispatch }) => (
// 	<div className='cart-dropdown'>
// 		<div className='cart-items'>
// 			{cartItems.length ? (
// 				cartItems.map(cartItem => (
// 					<CartItem key={cartItem.id} item={cartItem} />
// 				))
// 			) : (
// 				<span className={'empty-message'}>Your cart is empty</span>
// 			)}
// 		</div>
// 		<CustomButton
// 			onClick={() => {
// 				history.push('/checkout');
// 				dispatch(toggleCartHidden());
// 			}}>
// 			GO TO CHECKOUT
// 		</CustomButton>
// 	</div>
// );

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
