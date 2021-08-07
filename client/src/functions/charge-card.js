const FireStoreParser = require('firestore-parser');
const fetch = require('node-fetch');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const projectID = 'crwn-db-6bb11';
const key = 'AIzaSyADBBnLr-VlJ1P2lCp2CPdFRp-IAGBrmFI';
const doc = 'collections';
const url = `https://firestore.googleapis.com/v1beta1/projects/${projectID}/databases/(default)/documents/${doc}?key=${key}`;

const getProducts = async () => {
	console.log(process.env.STRIPE_SECRET_KEY);
	const categories = [];
	const items = [];

	await fetch(url)
		.then(response => response.json())
		.then(json => FireStoreParser(json))
		.then(json => {
			const documents = json['documents'];
			Object.keys(documents).forEach(function(key) {
				categories.push(documents[key]);

				Object.keys(categories[key]['fields']).forEach(function(key2) {
					items.push(categories[key]['fields']['items']);
				});
			});
		});

	return items[0];
};

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

// exports.handler = async (event, context) => {
// 	const { items } = JSON.parse(event.body);
// 	const allItems = await getProducts();
//
// 	const cartWithProducts = items.map(({ id, quantity }) => {
// 		const item = allItems.find(p => p.id === id);
// 		return {
// 			...item,
// 			quantity,
// 		};
// 	});
//
// 	const lineItems = cartWithProducts.map(product => ({
// 		price_data: {
// 			currency: 'usd',
// 			product_data: {
// 				name: product.name,
// 			},
// 			unit_amount: product.price,
// 		},
// 		quantity: product.quantity,
// 	}));
//
// 	const session = await stripe.checkout.sessions.create({
// 		payment_method_types: ['card'],
// 		line_items: lineItems,
// 		mode: 'payment',
// 		success_url: `${process.env.URL}/success`,
// 		cancel_url: `${process.env.URL}/cancelled`,
// 	});
//
// 	console.log(lineItems);
//
// 	return {
// 		statusCode: 200,
// 		body: JSON.stringify({
// 			id: session.id,
// 		}),
// 	};
// };