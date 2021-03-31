import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./app.css";
import Admin from "./components/Admin";
import Header from "./components/UI/Header";
import LandingPage from "./components/LandingPage";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Success from "./components/Checkout/Success";
const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);

const App = () => {
  return (
    <div className="h-full">
      <Router>
        <Header className="display-block"></Header>
        <Switch>
          <Route path="/" exact>
            <LandingPage></LandingPage>
          </Route>
          <Route path="/admin" exact component={Admin}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/checkout">
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
