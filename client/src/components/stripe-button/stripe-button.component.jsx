import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JH6hyD5a5nqvcruNAs1UMI7S1gKyfRXIgfELdtSKVWY1KqbVLxODdATHHlMOAgNgXcKrWFVVkK56AP2HWJmlKnf00H6vPTHnL";

  const onToken = token => {
    axios({
      url: "/",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert("Payment Successful");
    }).catch(error => {
      console.log("Payment error:", error);
      alert("There was in issue with your payment. Please make sure you use the provided credit card.");
    });
  };

  return (
    <StripeCheckout
      label={"Pay Now"}
      name={"CRWN Clothing Ltd."}
      billingAddress
      shippingAddress
      image={"https://svgshare.com/i/CUz.svg"} // Causes 400 Bad request error
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel={"Pay Now"}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
