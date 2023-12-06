import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { IoEye, IoEyeOff } from "react-icons/io5"; // Import React Icons

const Login = () => {
  const navigate = useNavigate();

  const animationVariants = {
    desktop: {
      x: [-180, 180, -180],
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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasValidationErrors, setHasValidationErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError("Email is required");
      setHasValidationErrors(true);
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setHasValidationErrors(true);
    } else {
      setEmailError("");
      setHasValidationErrors(false);
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      setHasValidationErrors(true);
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setHasValidationErrors(true);
    } else {
      setPasswordError("");
      setHasValidationErrors(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setHasValidationErrors(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasValidationErrors(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      console.log("Signing in with email:", email);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Successfully signed in:", user);
          navigate("/");
        })
        .catch((error) => {
          console.error("Sign-in error:", error.code, error.message);
          alert(error.message);
        });
    } else {
      alert("Please fix the validation errors before signing in.");
    }
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div
      className={`login-page-container ${
        hasValidationErrors ? "has-errors" : ""
      }`}
    >
      <div className={`login ${hasValidationErrors ? "has-errors" : ""}`}>
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
            <input value={email} onChange={handleEmailChange} type="text" />
            {emailError && <p className="error-message">{emailError}</p>}
            <h5>Password</h5>
            <div className="password-input-container">
              <input
                value={password}
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
              />
              <div className="password-toggle-icon-container">
                {showPassword ? (
                  <IoEyeOff
                    className="password-toggle-icon"
                    onClick={handleTogglePassword}
                    style={{ color: "red" }}
                  />
                ) : (
                  <IoEye
                    className="password-toggle-icon"
                    onClick={handleTogglePassword}
                    style={{ color: "blue" }}
                  />
                )}
              </div>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
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
