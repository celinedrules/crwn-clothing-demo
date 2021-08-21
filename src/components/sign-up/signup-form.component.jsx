import React, { useContext, useState } from 'react';
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, Submit } from '../../css/common.styles';

import { Marginer } from '../marginer/marginer.component';
import { AccountContext } from '../sign-in-sign-up/sign-in-sign-up.context';
import { signUpStart } from '../../redux/user/user.actions';
import { connect, useDispatch } from 'react-redux';
import { NameContainer } from './signup-form.styles';

const SignupForm = ({ signUpStart, hide }) => {
	const { switchToSignin } = useContext(AccountContext);
	const [userCredentials, setCredentials] = useState({
		firstName: '',
		lastName: '',
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { firstName, lastName, displayName, email, password, confirmPassword } = userCredentials;
	const dispatch = useDispatch();
	const hideSignUpForm = hide;

	const signUp = async event => {
		event.preventDefault();
		signUpStart(email, password, displayName, firstName, lastName, dispatch, hideSignUpForm);
	};

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};

	return <BoxContainer>
		<Marginer direction={'vertical'} margin={15} />
		<FormContainer>
			<Input type={'text'} name={'displayName'} placeholder={'Display Name'} onChange={handleChange} />
			<NameContainer>
				<Input type={'text'} name={'firstName'} placeholder={'First Name'} onChange={handleChange} />
				<Input type={'text'} name={'lastName'} placeholder={'Last Name'} onChange={handleChange} />
			</NameContainer>
			<Input type={'email'} name={'email'} placeholder={'Email'} onChange={handleChange} />
			<Input type={'password'} name={'password'} placeholder={'Password'} onChange={handleChange} />
			<Input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'}
				   onChange={handleChange} />
			<Marginer direction={'vertical'} margin={'2em'} />
			<Submit type={'submit'} onClick={signUp}>Sign Up</Submit>
			<Marginer direction={'vertical'} margin={10} />
			<MutedLink href={'#'}>
				Already have an account?
				<BoldLink href={'#'} onClick={switchToSignin}>Sign In</BoldLink>
			</MutedLink>
		</FormContainer>
	</BoxContainer>;
};

const mapDispatchToProps = dispatch => ({
	signUpStart: (email, password, displayName, firstName, lastName, dispatch, hideSignUpForm) =>
		dispatch(signUpStart({ email, password, displayName, firstName, lastName, dispatch, hideSignUpForm })),
});

export default connect(null, mapDispatchToProps)(SignupForm);