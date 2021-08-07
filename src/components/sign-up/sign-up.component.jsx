import React, { useState } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';
import { signUpStart } from '../../redux/user/user.actions';
import Swal from 'sweetalert2';
import 'animate.css';

const SignUp = ({ signUpStart }) =>
{
	const [userCredentials, setUserCredentials] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async event =>
	{
		event.preventDefault();

		if (password !== confirmPassword)
		{
			await Swal.fire({
				title: 'Uh-Oh',
				text: 'Passwords do not match!',
				imageUrl:
					'https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Actions-window-close-icon.png',
				showClass: { popup: 'animate__animated animate__zoomInDown' },
				hideClass: { popup: 'animate__animated animate__zoomOutUp' },
			});
			return;
		}

		signUpStart({ displayName, email, password });
	};

	const handleChange = event =>
	{
		const { name, value } = event.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<SignUpContainer>
			<SignUpTitle>I do not have an account</SignUpTitle>
			<span>SIgn up with your email and password</span>
			<form className={'sign-up-form'} onSubmit={handleSubmit}>
				<FormInput
					type={'text'}
					name={'displayName'}
					value={displayName}
					handleChange={handleChange}
					label={'Display Name'}
					required
				/>
				<FormInput
					type={'email'}
					name={'email'}
					value={email}
					handleChange={handleChange}
					label={'Email'}
					required
				/>
				<FormInput
					type={'password'}
					name={'password'}
					value={password}
					handleChange={handleChange}
					label={'Password'}
					required
				/>
				<FormInput
					type={'password'}
					name={'confirmPassword'}
					value={confirmPassword}
					handleChange={handleChange}
					label={'Confirm Password'}
					required
				/>
				<CustomButton type={'submit'}>SIGN UP</CustomButton>
			</form>
		</SignUpContainer>
	);
};

const mapDispatchToProps = dispatch => ({
	signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
