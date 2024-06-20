import { useState, useEffect, useRef } from "react";

const CustomCarousel = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef();

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    const handleTransitionEnd = () => setIsTransitioning(false);
    const slidesContainer = document.querySelector(".slides-container");
    slidesContainer.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      slidesContainer.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  useEffect(() => {
    const play = () => {
      nextSlide();
    };
    intervalRef.current = setInterval(play, 5000);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const handleImageClick = () => {
    nextSlide();
  };

  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div
      className="carousel-container"
      onClick={handleImageClick}
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={() =>
        (intervalRef.current = setInterval(() => nextSlide(), 5000))
      }
    >
      <div className="carousel-slides">
        <div
          className="slides-container"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="slide">
              <img src={item.file} alt={item.title} className="slide-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
