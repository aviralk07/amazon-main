import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./style.css";
import Subtotal from "../Subtotal";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckOut-product";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInAnimation = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(120px)",
    config: { duration: 3000 },
  });

  return (
    <animated.div
      className={`checkout ${isMounted ? "checkout-fade-in" : ""}`}
      style={fadeInAnimation}
    >
      <div className="checkout-tit">
        <div className="left_chekout">
          <img
            className="checkout_ad"
            src="https://etimg.etb2bimg.com/photo/74458837.cms"
            alt=""
          />
        </div>
        <div className="right_checkout">
          <Subtotal />
        </div>
      </div>

      <div>
        {user && <h4> Hello, {user?.email}</h4>}
        <h2 className="checkout_title">Your shopping basket</h2>
        {basket.length === 0 ? (
          <p className="neon-text">Your basket is empty.</p>
        ) : (
          basket.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))
        )}
      </div>
    </animated.div>
  );
};

export default Checkout;
