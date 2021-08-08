import styled, { css } from 'styled-components';

const buttonStyles = css`
	background-color: black;
	color: white;
	border: none;

	&:hover {
		background-color: white;
		color: black;
		border: 1px solid black;
	}
`;

const invertedButtonStyles = css`
	background-color: white;
	color: black;
	border: 1px solid black;

	&:hover {
		background-color: black;
		color: white;
		border: none;
	}
`;

const googleSignInStyles = css`
	background-color: #4285f4;
	color: white;
	border: 1px solid rgba(0, 0, 0, 0);

	&:hover {
		background-color: #357ae8;
	}
`;

const stripeCheckoutStyles = css`
	-moz-box-shadow: 3px 4px 0px 0px #1564ad;
	-webkit-box-shadow: 3px 4px 0px 0px #1564ad;
	box-shadow: 3px 4px 0px 0px #1564ad;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5));
	background:-moz-linear-gradient(top, #79bbff 5%, #378de5 100%);
	background:-webkit-linear-gradient(top, #79bbff 5%, #378de5 100%);
	background:-o-linear-gradient(top, #79bbff 5%, #378de5 100%);
	background:-ms-linear-gradient(top, #79bbff 5%, #378de5 100%);
	background:linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5',GradientType=0);
	background-color:#79bbff;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px;
	border:1px solid #337bc4;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	font-weight:bold;
	padding:1px 44px;
	text-decoration:none;
	text-shadow:0px 1px 0px #528ecc;
	
	&:hover {
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #378de5), color-stop(1, #79bbff));
		background:-moz-linear-gradient(top, #378de5 5%, #79bbff 100%);
		background:-webkit-linear-gradient(top, #378de5 5%, #79bbff 100%);
		background:-o-linear-gradient(top, #378de5 5%, #79bbff 100%);
		background:-ms-linear-gradient(top, #378de5 5%, #79bbff 100%);
		background:linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#378de5', endColorstr='#79bbff',GradientType=0);
		background-color:#378de5;
	}
	
	&:active {
		position:relative;
		top:1px;
	}		
`;

const getButtonStyles = props =>
{
	if (props.isGoogleSignIn)
	{
		return googleSignInStyles;
	}

	if (props.isStripeCheckout)
		return stripeCheckoutStyles;

	return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
	min-width: 165px;
	width: auto;
	height: 50px;
	letter-spacing: 0.5px;
	line-height: 50px;
	padding: 0 35px 0 35px;
	font-size: 15px;
	text-transform: uppercase;
	font-family: 'Open Sans Condensed';
	font-weight: bolder;
	cursor: pointer;
	display: flex;
	justify-content: center;

	${getButtonStyles}
`;

CustomButtonContainer.displayName = 'CustomButtonContainer';
