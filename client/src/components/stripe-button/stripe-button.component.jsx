import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	console.log(price)
	const publishableKey =
		'pk_test_51JH6hyD5a5nqvcruNAs1UMI7S1gKyfRXIgfELdtSKVWY1KqbVLxODdATHHlMOAgNgXcKrWFVVkK56AP2HWJmlKnf00H6vPTHnL';

	// const processPayment = async () => {
	// 	const url = '/.netlify/functions/charge-card';
	// 	const newItems = items.map(({ id, quantity }) => ({
	// 		id,
	// 		quantity,
	// 	}));
	//
	// 	const stripe = await loadStripe(publishableKey);
	// 	const { data } = await axios.post(url, { items: newItems });
	// 	await stripe.redirectToCheckout({ sessionId: data.id });
	// };
	
	
	const onToken = token => {

		//const url = 'checkout';
		const url = '/.netlify/functions/charge-card';
		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({
				amount: priceForStripe,
				token,
			}),
		};
		fetch(url, options)
			.then(response => {
				alert('Payment Successful');
			}).catch(error => {
			console.log('Payment error:', error);
			alert('There was in issue with your payment. Please make sure you use the provided credit card.');
		});

	}
	// axios(options)
	// 	.then(response => {
	// 		alert('Payment Successful');
	// 	}).catch(error => {
	// 	console.log('Payment error:', error);
	// 	alert('There was in issue with your payment. Please make sure you use the provided credit card.');
	// });
	//};
	// const onToken = token => {
	//   axios({
	//     url: "checkout",
	//     method: "post",
	//     data: {
	//       amount: priceForStripe,
	//       token
	//     }
	//   }).then(response => {
	//     alert("Payment Successful");
	//   }).catch(error => {
	//     console.log("Payment error:", error);
	//     alert("There was in issue with your payment. Please make sure you use the provided credit card.");
	//   });
	// };

	return (
		<StripeCheckout
			label={'Pay Now'}
			name={'CRWN Clothing Ltd.'}
			billingAddress
			shippingAddress
			image={'https://svgshare.com/i/CUz.svg'} // Causes 400 Bad request error
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel={'Pay Now'}
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
