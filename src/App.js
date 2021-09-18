import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";

function App() {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState(null);

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;
    const getImages = () => {
      axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${key}`)
      .then(response => {
        setImages(response.data.photos);
      })
    }
    getImages();
  }, [])

  useEffect(() => {
    const getLikedImages = JSON.parse(localStorage.getItem('liked-images'))
    if (getLikedImages) {
      setLikedImages(getLikedImages);
    } else {
      setLikedImages([]);
    }
  }, [])

  const saveToLocalStorage = (likedImages) => {
    localStorage.setItem('liked-images', JSON.stringify(likedImages));
  }

  const handleLikeImage = (image) => {
    const updatedLikedImages = [...likedImages, image];
    setLikedImages(updatedLikedImages);
    saveToLocalStorage(updatedLikedImages);
  }

  const handleUnlikeImage = (image) => {
    const updatedLikedImages = likedImages.filter((likedImage) => likedImage.id !== image.id);
    setLikedImages(updatedLikedImages);
    saveToLocalStorage(updatedLikedImages);
  }

  return (
    <div className="App">
      <div class="container">
        <Header title="Spacestagram"/>
        {likedImages && <CardGrid images={images} handleLikeImage={handleLikeImage} handleUnlikeImage={handleUnlikeImage} likedImages={likedImages} />}
      </div>
    </div>
  );
}

export default App;
