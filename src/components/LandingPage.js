import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className=" flex flex-col justify-center p-8 items-center">
      <p className="font-bold text-5xl text-green-500 mb-8">Hello World</p>
      <div className=" flex flex-col items-center">
        <p className="text-2xl w-full text-justified mb-12">
          This is a Web Development template for processing payments using React
          and Stripe.
        </p>
        <div className="flex flex-col w-full h-full items-center bg-gray-300 rounded-2xl p-8 space-y-8">
          <p className="text-left text-xl font-medium">
            This is a custom Checkout process. Click below to test the checkout
            process
          </p>
          <Link to="/checkout" className="bg-green-400 p-4 rounded-xl">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
