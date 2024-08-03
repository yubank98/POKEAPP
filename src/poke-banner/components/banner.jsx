import React, { useState, useEffect } from "react";
import "../styles/banner.css";

const images = [
  "/images/img-1.avif",
  "/images/img-2.avif",
  "/images/img-3.avif",
  "/images/img-4.jpg",
  "/images/img-5.jpg",
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="banner-image"
      />
    </div>
  );
}

export default Banner;
