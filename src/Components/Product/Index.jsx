import React, { useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import StarRatings from "react-star-ratings";
import { useStateValue } from "../../StateProvider";

const Product = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item ino the data layer
    dispatch({
      type: "Add_To_Basket",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  };
  const maxLength = 30; // Set the maximum length for the title
  const [showFullTitle, setShowFullTitle] = useState(false);

  const displayedTitle = showFullTitle
    ? title
    : `${title.slice(0, maxLength)}...`;

  const toggleTitle = () => {
    setShowFullTitle(!showFullTitle);
  };

  return (
    <div className="product">
      <div className="product_info">
        <div className="product_title_container" onClick={toggleTitle}>
          <p className="product-p">{displayedTitle}</p>
          {!showFullTitle && (
            <span className="expand_icon">
              &#9660; {/* Downward arrow or any other icon you prefer */}
            </span>
          )}
        </div>
        <p className="product_price">
          <small> ₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          <StarRatings
            rating={rating}
            starRatedColor="#f39c12" // Color when rated
            starEmptyColor="#ecf0f1" // Color for empty stars
            starHoverColor="#09A428" // Color on hover
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
        </div>
      </div>
      <img
        src={image}
        alt=""
        style={{
          background: "transparent!important",
        }}
      />
      <Button onClick={addToBasket} variant="warning">
        Add to basket
      </Button>{" "}
    </div>
  );
};

export default Product;
