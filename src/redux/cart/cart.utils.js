import { useEffect, useRef, useState } from 'react';
import { toggleCartHidden } from './cart.actions';

export const addItemToCart = (cartItems, cartItemToAdd) =>
{
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id,
	);

	if (existingCartItem)
	{
		return cartItems.map(cartItem =>
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem,
		);
	}

	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) =>
{
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToRemove.id,
	);

	if (existingCartItem.quantity > 1)
	{
		return cartItems.map(cartItem =>
			cartItem.id === cartItemToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem,
		);
	}

	return cartItems;
};

export const ClickedOutside = () =>
{
	const wrapperRef = useRef(null);
	const [isVisible, setIsVisible] = useState(true);

	// below is the same as componentDidMount and componentDidUnmount
	useEffect(() =>
	{
		document.addEventListener('click', handleClickOutside, false);
		return () =>
		{
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);

	const handleClickOutside = event =>
	{
		if (wrapperRef.current && !wrapperRef.current.contains(event.target))
		{
			setIsVisible(false);
			toggleCartHidden();
		}
	};
	return { wrapperRef, isVisible };
};