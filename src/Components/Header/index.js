import "./style.css";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

function Header() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="header">
      {/* amazon logo */}
      <Link to="/">
        <img
          className="header-logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header_search">
        {/* search  logo*/}
        <input className="header_searchInput" type="text" />
        <SearchIcon
          className="header_searchIcon"
          style={{ fontSize: "24px !important" }}
        />
      </div>

      <div className="header_nav">
        <Link className="login_link" to="/login">
          <div className="header_option">
            <span className="header_optionLineOne"> Hello guest</span>
            <span className="header_optionLineTwo"> Sign In </span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne"> Returns</span>
          <span className="header_optionLineTwo"> & Orders </span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne"> Your</span>
          <span className="header_optionLineTwo"> Prime </span>
        </div>
        <div className="header_optionBasket">
          <Link to="/checkout">
            <ShoppingBasketIcon
              className="ShoppingBasketIcon"
              style={{ color: "white" }}
            />
          </Link>
          <span className="header_optionLineTwo header_basketCount">
            {basket?.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
