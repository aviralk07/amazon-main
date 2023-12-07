import { React, useEffect, useState } from "react";
import "./style.css";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckOut-product";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { getBasketTotal } from "../../Reducer";
import { Axios as axios } from "axios";
import CurrencyFormat from "react-currency-format";

const Payment = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState();
  const [clientSceret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSceret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setProcessing(true);
      const { paymentIntent } = await stripe.confirmCardPayment(clientSceret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      setSucceeded(true);
      setError(null);
      // Display a success message or handle success as needed
      navigate("/orders"); // Use navigate instead of history.replace
    } catch (error) {
      setSucceeded(false);
      setError(`Payment failed: ${error.message}`);
      console.error("Error during payment:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* payment section - delivery address  */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 react lane</p>
            <p>los angeles ,Ca</p>
          </div>
        </div>
        {/* payment section - review item  */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review item and deliver</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment section - payment method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* stripe magic will go  */}
            <form action="" onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total:{value} </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
