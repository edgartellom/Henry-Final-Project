import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Footer } from "../../components";
import { useState, useEffect } from "react";
import "./landingPage.css";

const LandingPage = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const prevImg = () => {
    setCurrentImgIndex(
      currentImgIndex === 0 ? images.length - 1 : currentImgIndex - 1
    );
  };

  const nextImg = () => {
    setCurrentImgIndex(
      currentImgIndex === images.length - 1 ? 0 : currentImgIndex + 1
    );
  };

  const images = [
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/130.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/126.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/137.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/81.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/125.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextImg();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImgIndex]);

  return (
    <div>
      <Navbar />
      <div className="carousel">
        <img src={images[currentImgIndex]} alt="carousel-img" />
      </div>
      <div className="botones">
        <button id="boton_prev" onClick={prevImg}>
          Prev
        </button>
        <button id="boton_next" onClick={nextImg}>
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;