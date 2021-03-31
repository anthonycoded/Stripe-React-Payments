import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  return (
    <div className="h-full flex flex-col items-center bg-blue-400 p-4 space-y-4">
      <p className="text-2xl text-black font-bold">Checkout</p>

      <div
        className="h-24 w-32"
        style={{
          backgroundImage: `url("")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <CheckoutForm
        handleSubmit={(event) => handleSubmit(event)}
      ></CheckoutForm>
    </div>
  );
};

export default Checkout;
