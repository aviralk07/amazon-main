import React from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../Reducer";
import numeral from "numeral"; // Import numeral

const Subtotal = () => {
  const [{ basket }, dispatch] = useStateValue();
  const isMobile = window.innerWidth <= 767;

  return (
    <>
      <div className="subtotal">
        <p>
          Subtotal ({basket.length} items):
          <strong>{numeral(getBasketTotal(basket)).format("₹0,0.00")}</strong>
        </p>
        <small className="subtotal_gift">
          <input className="input_subtotal" type="checkbox" />
          <div className="input-p"> This order contains a gift</div>
        </small>
        <Button variant="warning">Proceed to checkout</Button>{" "}
      </div>

      {!isMobile && (
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 150 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        >
          <img
            className="car-ani"
            src="https://www.pngkey.com/png/full/195-1956755_tesla-car-png-tesla-models-s-png.png"
            alt="Cute Cat Drawing"
            style={{
              width: "180px",
              background: "transparent",
              marginTop: "10px",
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default Subtotal;
