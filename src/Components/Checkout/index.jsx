import React from "react";
import "./style.css";
import Subtotal from "../Subtotal";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckOut-product";
const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
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
        <h2 className="checkout_title">Your shopping basket</h2>
        {basket.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}
        {/* checkout product */}
        {/* checkout product */}
        {/* checkout product */}
        {/* checkout product */}
      </div>
    </div>
  );
};

export default Checkout;
