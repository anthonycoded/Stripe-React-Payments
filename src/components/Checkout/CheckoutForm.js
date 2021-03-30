import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import "./checkout.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ handleSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <div className="h-72 w-full p-8 bg-white rounded-xl">
      <form onSubmit={handleSubmit} className="w-full h-full">
        <label className="text-yellow-400 font bold text-xl">
          Card details
        </label>
        <CardElement options={CARD_ELEMENT_OPTIONS} className="h-full w-full" />
        <button disabled={!stripe}>Confirm order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
