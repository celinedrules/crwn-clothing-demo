import React from 'react';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import Swal from 'sweetalert2';
import {
	signInFailure,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	signUpSuccess,
} from './user.actions';
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from '../../firebase/firebase.utils';

import 'animate.css';
import { setSnackbar } from '../snackbar/snackbar.reducer';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(
			createUserProfileDocument,
			userAuth,
			additionalData,
		);
		const userSnapshot = yield userRef.get();
		yield put(
			signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }),
		);
		return userSnapshot.data().displayName;
	} catch (error) {
		yield put(signInFailure(error.message));
	}
}

export function* signInWithGoogle({payload: {dispatch, hideSignInForm}}) {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
		dispatch(setSnackbar(true, 'info', 'Welcome'));
		hideSignInForm();
		return user;
	} catch (error) {
		dispatch(setSnackbar(true, 'error', `Unknown Error: ${error.message}`));
		yield put(signInFailure(error.message));
	}
}

export function* signInWithEmail({ payload: { email, password, dispatch, hideSignInForm } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
		dispatch(setSnackbar(true, 'info', 'Welcome'));
		hideSignInForm();
		return user;
	} catch (error) {
		if (error.code === 'auth/wrong-password') {
			dispatch(setSnackbar(true, 'error', 'Wrong Password'));
		} else if (error.code === 'auth/user-not-found') {
			dispatch(setSnackbar(true, 'error', 'User Not Found'));
		} else if (error.code === 'auth/invalid-email') {
			dispatch(setSnackbar(true, 'error', 'Incorrect Email Format'));
		} else {
			dispatch(setSnackbar(true, 'error', `Unknown Error: ${error.message}`));
		}

		yield put(signInFailure(error.message));
	}
}

export function* signOut({ payload: { dispatch } }) {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
		dispatch(setSnackbar(true, 'info', 'Goodbye'));
	} catch (error) {
		yield put(signOutFailure(error.message));
		dispatch(setSnackbar(true, 'error', error.message));
	}
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(
			email,
			password,
		);
		yield put(signUpSuccess({ user, additionalData: { displayName } }));
	} catch (error) {
		yield Swal.fire({
			title: 'Uh-Oh',
			text: error.message,
			imageUrl:
				'https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Actions-window-close-icon.png',
			showClass: { popup: 'animate__animated animate__zoomInDown' },
			hideClass: { popup: 'animate__animated animate__zoomOutUp' },
		});
		yield put(signUpFailure(error.message));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	yield getSnapshotFromUserAuth(user, additionalData);
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();

		if (!userAuth) return;

		yield getSnapshotFromUserAuth(userAuth);
		return userAuth;
	} catch (error) {
		yield put(signInFailure(error.message));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
