import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IaNZlCILXbg6WUSGDz5uOCrk6AgKamms3Lpa8DtMAdyakKzcelFTqPzbYDU8H9F21ZJimiH55WOROIUp2hae6sa00G0olzXE0"
);

import check from "../../assets/checked.svg";

const Success = ({ sessionId }) => {
  return (
    <div className="flex flex-col justify-center items-center py-24 px-6">
      <div className="bg-yellow-400 h-5/6 w-full p-8 rounded-xl lg:h-96 flex flex-col items-center space-y-6">
        <img src={gorilla} alt="logo" className="h-32"></img>
        <p className="text-2xl font-bold text-center">
          Thank You for your Payment
        </p>
        <img className="h-12" src={check} alt="success"></img>
        <p className="text-md font-medium text-left">
          You new Beat is now available for download in your account.{" "}
        </p>
        <Link to="/account" className="bg-green-400 p-4 rounded">
          {" "}
          Account
        </Link>
      </div>
    </div>
  );
};
export default Success;
