import React, { useEffect, useState } from "react";
import "./style.css";
import Product from "../Product/Index";
import abcdAudio from "./aa.mp3"; // Adjust the path accordingly

const Home = () => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (!audioPlayed) {
        try {
          const audio = new Audio(abcdAudio);
          audio.play();
          setAudioPlayed(true);
        } catch (error) {
          console.error("Error playing audio:", error);
        }

        // Clean up the event listener after the first interaction
        document.removeEventListener("click", playAudio);
      }
    };

    // Attach event listener for the first user interaction (e.g., click)
    document.addEventListener("click", playAudio);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, [audioPlayed]);

  return (
    <div className="home">
      <div className="home_container">
        <img
          src="https://assets.beartai.com/uploads/2022/08/prime-video-th.jpg"
          alt=""
          className="home_image"
        />
        <div className="home_row">
          {/* product  */}
          <Product
            id={"12312312"}
            title="Sony PS5® Console – Marvel’s Spider-Man 2 Limited Edition Bundle"
            price={62990}
            image={
              "https://cdn.mos.cms.futurecdn.net/8EvShgipkzT23s27rfyor6-1200-80.png"
            }
            rating={4.5}
          />
          <Product
            id={"67548390"}
            title="Apple 2023 MacBook Pro Laptop M2 Max chip."
            price={263399}
            image={
              "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Apple_MacBook_Pro_M2_Pro_M2_Max_2023.jpg"
            }
            rating={3.5}
          />
          {/* product  */}
        </div>
        <div className="home_row">
          {/* product  */}
          <Product
            id={"90784317"}
            title="Apple iPhone 15 Pro Max (256 GB) - Blue Titanium."
            price={159900}
            image={
              "https://m.media-amazon.com/images/I/81fxjeu8fdL._SL1500_.jpg"
            }
            rating={5}
          />
          {/* product  */}
          <Product
            id={"29674301"}
            title="Optimum Nutrition (ON) Gold Standard 100% Whey Protein Powder 5 lb (+10% Extra), 2.5 kg."
            price={6884}
            image={
              "https://m.media-amazon.com/images/I/61WD2RzBtBL._SL1200_.jpg"
            }
            rating={3.5}
          />
          {/* product  */}
          <Product
            id={"68390327"}
            title="Air Jordan 1 Low OG Shoes."
            price={12795}
            image={
              "https://millenniumshoes.com/cdn/shop/products/AURORA_CZ0858-001_PHCFH001-2000_2_bd2feadf-54cf-43bd-8bc8-44a46c92b234_1200x.jpg?v=1686949022"
            }
            rating={2.5}
          />
        </div>
        <div className="home_row">
          <Product
            id={"44578312"}
            title="Hisense 305 cm (120 inches) Trichrom ALR Screen Series 4K Ultra HD Smart Laser TV 120L9HE (Black)."
            price={499999}
            image={
              "https://m.media-amazon.com/images/I/91TDtZiFW4L._SL15000_.jpg"
            }
            rating={1.5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
