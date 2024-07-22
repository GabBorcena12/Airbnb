import React, { useState, useEffect } from "react";
import "../../css/ItemView.css";

const ItemImage = ({ thumbnails }) => {
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const images = await Promise.all(
        thumbnails.map(thumbnail =>
          import(`../../assets/img/${thumbnail.src}.png`).then(image => image.default)
        )
      );
      setLoadedImages(images);
    };

    if (thumbnails && thumbnails.length > 0) {
      loadImages();
    }
  }, [thumbnails]);

  if (!thumbnails || thumbnails.length <= 1) {
    return (
      <div className="container">
        <div className="full-image-column">
          {thumbnails && thumbnails[0] && (
            <img
              src={loadedImages[0]}
              alt={thumbnails[0].description}
              className="full-image"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="main-column">
        {thumbnails[0] && (
          <img
            src={loadedImages[0]}
            alt={thumbnails[0].description}
            className="item-main-image"
          />
        )}
      </div>
      <div className="column image-container">
        {thumbnails.slice(1).map((thumbnail, index) => (
          <img
            key={index}
            src={loadedImages[index + 1]}
            alt={thumbnail.description}
            className="item-thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default ItemImage;
