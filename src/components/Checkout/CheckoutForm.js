import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import "./checkout.css";
import axios from "axios";

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

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const data = {
      product: "test product",
      price: 2000,
    };

    axios
      .post("http://localhost:8080/checkout/create-payment-intent", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer sk_test_51IaNZlCILXbg6WUSrunHuSSL8Pr50JLnnOWNqOuESBqw6y1m5TLXQKIt3AWITKrSia762fviBnQczSMCFe9pS45A00hvLpQytJ",
        },
      })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        if (error) {
          console.log(err);
        }
      });
  }, []);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      console.log("successfull");
    }
  };

  return (
    <div className="h-full w-full  bg-white rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full space-y-8 flex flex-col"
      >
        <div className="flex flex-col p-4 w-full items-start bg-green-400">
          <p className="text-2xl font-medium">Product Title: </p>
          <p className="text-2xl font-medium">Product Price: </p>
        </div>
        <div className="flex flex-col items-start space-y-8 pb-8 px-8">
          <p className="w-full text-center text-xl font-bold ">Payment Info</p>
          <label className="text-green-400 font-bold text-xl">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
          <label className="text-green-400 font-bold text-xl">
            Enter your card details
          </label>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            className="h-full w-full"
            onChange={handleChange}
          />
          <button
            disabled={!stripe}
            onClick={handleSubmit}
            className="bg-green-400 h-12 rounded text-xl font-medium mb-8 w-full"
          >
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
