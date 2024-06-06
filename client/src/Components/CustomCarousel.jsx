import { useState, useEffect, useRef } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const CustomCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef();
  const intervalRef = useRef();

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  useEffect(() => {
    const handleTransitionEnd = () => setIsTransitioning(false);
    const slidesContainer = document.querySelector(".slides-container");
    slidesContainer.addEventListener("transitionend", handleTransitionEnd);

    return () =>
      slidesContainer.removeEventListener("transitionend", handleTransitionEnd);
  }, []);

  useEffect(() => {
    autoplayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoplayRef.current();
    };
    intervalRef.current = setInterval(play, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const pauseAutoplay = () => {
    clearInterval(intervalRef.current);
  };

  const resumeAutoplay = () => {
    intervalRef.current = setInterval(autoplayRef.current, 3000);
  };

  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div
      className="relative w-full h-56 md:h-72 lg:h-96 object-cover overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div
        className="slides-container absolute inset-0 flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
            <div className="absolute z-10 top-1/4 sm:top-1/3 w-full text-center px-4">
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold font-serif text-white">
                {item.title}
              </h1>
              <p className="text-white text-sm md:text-lg lg:text-xl py-2">
                {item.content.replace(/<[^>]+>/g, "")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 text-9xl p-2"
      >
        <FaCircleArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 text-9xl p-2"
      >
        <FaCircleArrowRight />
      </button>
    </div>
  );
};

export default CustomCarousel;
