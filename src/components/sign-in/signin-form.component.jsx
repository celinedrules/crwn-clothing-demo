import React, { useContext, useState } from 'react';
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, Submit } from '../../css/common.styles';
import { Marginer } from '../marginer/marginer.component';
import { AccountContext } from '../sign-in-sign-up/sign-in-sign-up.context';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';
import { connect, useDispatch } from 'react-redux';
import DividerWithText from '../divider/divider-with-text';

const SigninForm = ({ emailSignInStart, googleSignInStart, hide }) => {
	const { switchToSignup } = useContext(AccountContext);
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const { email, password } = userCredentials;
	const dispatch = useDispatch();
	const hideSignInForm = hide;

	const signIn = async event => {
		event.preventDefault();
		emailSignInStart(email, password, dispatch, hideSignInForm);
	};

	const signInWithGoogle = async event => {
		event.preventDefault();
		googleSignInStart(dispatch, hideSignInForm);
	};

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};

	return <BoxContainer>
		<Marginer direction={'vertical'} margin={15} />
		<FormContainer>
			<Input name={'email'} type={'email'} onChange={handleChange} placeholder={'Email'} />
			<Input name={'password'} type={'password'} onChange={handleChange} placeholder={'Password'} />
			<Marginer direction={'vertical'} margin={10} />
			<MutedLink href={'#'}>Forgot Password?</MutedLink>
			<Marginer direction={'vertical'} margin={10} />
			<Submit type={'submit'} onClick={signIn}>Sign In</Submit>
			<Marginer direction={'vertical'} margin={'1em'} />
			<DividerWithText style={{ fontSize: '18px' }}>or</DividerWithText>
			<Marginer direction={'vertical'} margin={'1em'} />
			<Submit type={'button'} onClick={signInWithGoogle} isGoogleSignIn> Sign in with Google </Submit>
			<Marginer direction={'vertical'} margin={'1em'} />
			<MutedLink href={'#'}>
				Don't have an account?
				<BoldLink href={'#'} onClick={switchToSignup}>Sign Up</BoldLink>
			</MutedLink>
		</FormContainer>
	</BoxContainer>;
};


const mapDispatchToProps = dispatch => ({
	googleSignInStart: (dispatch, hideSignInForm) => dispatch(googleSignInStart({ dispatch, hideSignInForm })),
	emailSignInStart: (email, password, dispatch, hideSignInForm) =>
		dispatch(emailSignInStart({ email, password, dispatch, hideSignInForm })),
});

export default connect(null, mapDispatchToProps)(SigninForm);