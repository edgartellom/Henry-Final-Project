import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Footer } from "../../components";
import { useState, useEffect } from "react";
import useStore from "../../store/products";
import { Link } from "react-router-dom";
import "./home.css";
import img from "../../assets/img/mousese.jpg";

const Home = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const products = useStore((state) => state.products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const sliceProducts = products.slice(0, 3);

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
    }, 3500);

    return () => clearInterval(interval);
  }, [currentImgIndex]);

  return (
    <div>
      <Navbar />
      <div className="carousel">
        <img src={images[currentImgIndex]} alt="carousel-img" />
      </div>
      <div className="text-banner"></div>
      <img className="img-mouse" src={img} alt="Descripción de la imagen" />
      <h3 className="populares">Mas populares</h3>
      <div className="card_div">
        {sliceProducts.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="card">
              <img src={product.image[0]} alt={product.name} />
              <div className="container-price">
                <p className="price">
                  {product.feature} {"$" + product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
