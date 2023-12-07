import { useEffect } from "react";
import "./App.css";
import Checkout from "./Components/Checkout";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
const promise = loadStripe(
  "pk_test_51OKfseSE81kJynkRhB98ilWgvoL7m9ZSzOiVJ71CrYHETDYqzlY343PxGuYCz4HvNzZwQYh3w9txQNTjqcBAI1vU00hg5T71cg"
);
function App() {
  const [{}, dispatch] = useStateValue();
  // listner to keep tracking who is sign in
  useEffect(() => {
    //  only runs once when app component loads......
    auth.onAuthStateChanged((authUser) => {
      console.log("TheUSER IS >>>", authUser);
      if (authUser) {
        // the user just loged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const renderHeader = !isLoginPage && <Header />;

  return (
    <div className="App">
      {renderHeader}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
