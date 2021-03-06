import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import InventoryPage from './pages/inventory/inventory.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Modal from './components/modal/modal.component';

import './App.css';

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);
	
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path={'/'} component={HomePage} />
				<Route path={'/shop'} component={ShopPage} />
				<Route exact path={'/checkout'} component={CheckoutPage} />
				<Route exact path={'/inventory'} component={InventoryPage} />
				<Route
					exact
					path={'/signin'}
					render={() =>
						currentUser ? (
							<Redirect to={'/'} />
						) : (
							<SignInAndSignUpPage />
						)
					}
				/>
			</Switch>
			<Modal modalType={'SignInSignUp'} />
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);