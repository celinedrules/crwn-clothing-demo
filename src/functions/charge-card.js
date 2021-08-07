require('encoding');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {

	const data = JSON.parse(event.body);
	const body = {
		source: data.token.id,
		amount: data.amount,
		currency: 'usd',
	};

	await stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			return {
				statusCode: 500,
				body: stripeErr,
			};
		} else {
			return {
				statusCode: 200,
				body: stripeRes,
			};
		}
	});
};