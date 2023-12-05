import React from "react";
import "./style.css";
import StarRatings from "react-star-ratings";
import RemoveShoppingCartTwoToneIcon from "@mui/icons-material/RemoveShoppingCartTwoTone";
import Button from "@mui/material/Button";
import { useStateValue } from "../../StateProvider";

function CheckoutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  // remove the item from basket
  const removeFromBasket = () => {
    // Dispatch the "Remove_From_Basket" action
    dispatch({
      type: "Remove_From_Basket",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} alt="" />
      <div className="checkoutProuduct_info">
        <p className="checkoutProuduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          <StarRatings
            rating={rating}
            starRatedColor="#f39c12"
            starEmptyColor="#C6D2D5"
            starHoverColor="#003494"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
        </div>
        <Button
          className="btn-1-sc"
          variant="contained"
          onClick={removeFromBasket}
        >
          <span className="icon">
            <RemoveShoppingCartTwoToneIcon />
          </span>
          <span className="text">Remove From basket</span>
        </Button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
