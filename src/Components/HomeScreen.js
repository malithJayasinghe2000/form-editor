import React from 'react';
import  '../css/HomeScreen.css';

const HomeScreen = ({ title, description, image, position }) => {
  return (
    <div className="home-screen">
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={`image-container ${position}`}>
        {image && <img src={image} alt="Uploaded" className="home-image" />}
      </div>
    </div>
  );
};

export default HomeScreen;
