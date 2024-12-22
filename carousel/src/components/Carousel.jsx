import { useRef, useState } from "react";
import { useEffect } from "react";

const Carousel = ({
  images = [],
  isLoading = false,
  imagesPerSlide = 1,
  imagesLimit = images.length,
  customPrevButton,
  customNextButton,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesLimit - 1 : prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imagesLimit - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{ width: imagesPerSlide * imageWidth }}>
      <div
        className="image-container"
        style={{
          transform: `translateX(-${currentIndex * imageWidth}px)`,
        }}
      >
        {images
          .slice(0, imagesLimit > images.length ? images.length : imagesLimit)
          .map((image) => {
            return (
              <img
                onLoad={() => setImageWidth(imageRef.current.offsetWidth)}
                ref={imageRef}
                key={image.id}
                src={image.url}
                alt={image.title}
                className="image"
              />
            );
          })}
      </div>

      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}

      {customNextButton instanceof Function ? (
        customNextButton(goToNext)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
