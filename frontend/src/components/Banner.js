import React from 'react';
import '../css/Banner.css'; // Import CSS file for styling

const Banner = () => {
  const images = [
    'https://theme.hstatic.net/1000061481/1001035882/14/slideshow_2.jpg?v=2217',
    'https://file.hstatic.net/1000061481/collection/nms07343_2f76841e3ddf4516b84bb7521a24e965.jpg',
    'https://theme.hstatic.net/1000061481/1001035882/14/slideshow_1.jpg?v=2217',
     

  ];

  return (
    <div className="banner-container">
      <div className="banner-carousel">
        {images.map((image, index) => (
          <div key={index} className="banner-slide">
            <img src={image} alt={`Banner ${index + 1}`} className="banner-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;