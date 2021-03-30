import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    try {
      //create payment intent and get secret key
      const response = await axios.post(
        "http://localhost:8080/checkout/create-payment-intent"
      );
      let clientSecret = await response.data.clientSecret;
      console.log(clientSecret);

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      });
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        throw new Error(JSON.stringify(result.error));
      }
      if (result.paymentIntent.status === "succeeded") {
        addBeat();
      }
      console.log(result.paymentIntent.status);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center bg-yellow-400 p-8">
      <p className="text-2xl text-black font-bold">Checkout</p>

      <div
        className="h-48 w-60"
        style={{
          backgroundImage: `url("")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex flex-col p-4 w-full items-start">
        <p className="text-2xl font-medium">title</p>
        <p className="text-2xl font-medium">price</p>
      </div>
      <CheckoutForm
        handleSubmit={(event) => handleSubmit(event)}
      ></CheckoutForm>
    </div>
  );
};

export default Checkout;
