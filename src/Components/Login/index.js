import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const animationVariants = {
    desktop: {
      x: [-200, 200, -200],
      scale: [1, 1.7, 1],
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(120deg)",
        "hue-rotate(240deg)",
        "hue-rotate(360deg)",
      ],
      transition: { duration: 10, repeat: Infinity },
    },
    mobile: {
      x: [-70, 70, -90],
      scale: [1, 1.7, 1],
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(120deg)",
        "hue-rotate(240deg)",
        "hue-rotate(360deg)",
      ],
      transition: { duration: 10, repeat: Infinity },
    },
  };

  const isMobile = window.innerWidth <= 600;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/"); // Use navigate instead of history.push
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/"); // Use navigate instead of history.push
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login-page-container">
      <div className="login">
        <Link to="/">
          <motion.img
            className="login_logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
            animate={isMobile ? "mobile" : "desktop"}
            variants={animationVariants}
          />
        </Link>
        <div className="login_container">
          <h1 className="pancakes-text">Sign-In</h1>

          <form>
            <h5>E-mail</h5>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <h5> Password</h5>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <br /> <br />
            <button
              type="submit"
              onClick={signIn}
              className="custom-btn btn-12"
            >
              <span>Click!</span>
              <span>Sign-In</span>
            </button>
          </form>
          <p className="login-p">
            By signing in, you agree to the Amazon Fake Clone Conditions of Use
            & Sales. Please see our Privacy Notice, our Cookies Notice, and our
            Interest-Based Ads Notice.
          </p>

          <div onClick={register} className="sub-main">
            <button className="button-three">Create your Amazon account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
