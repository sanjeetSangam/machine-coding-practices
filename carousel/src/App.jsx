import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
const url = "https://jsonplaceholder.typicode.com/photos?_limit=8";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const images = await response.json();
      setImages(images);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={loading}
        imagesPerSlide={2}
        imagesLimit={8}
        // customPrevButton={}
        // customNextButton={}
      />
    </div>
  );
};

export default App;
