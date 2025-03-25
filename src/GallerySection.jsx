
import React, { useState, useEffect } from 'react';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchImages = async () => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzMXsY_6SfXKJUNY13kWj-zbfxfupI3uDkrcaSPWED8Jkjeegj-eT3YPrJp7QFLNpmN/exec");
      const urls = await response.json();
      setImages(urls);
    } catch (err) {
      console.error("Képbetöltési hiba:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setError('');
    setMessage('');

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbzMXsY_6SfXKJUNY13kWj-zbfxfupI3uDkrcaSPWED8Jkjeegj-eT3YPrJp7QFLNpmN/exec", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setMessage("Nagyon hálásak vagyunk, hogy megosztottad ezt a fantasztikus emlék-képet velünk 😊");
        fetchImages();
      } else {
        setError("Hiba történt a feltöltés során.");
      }
    } catch (err) {
      setError("Hiba történt a feltöltés során.");
      console.error(err);
    }
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full md:w-1/2 flex flex-col items-center bg-[#FFF0F5] p-10 overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic text-center text-[#5e503f] mb-6">Galéria 📸</h2>

      {images.length > 0 ? (
        <div className="relative w-full max-w-xl h-[400px] flex items-center justify-center border rounded-md bg-white shadow-lg mb-4">
          <img src={images[currentIndex]} alt="Galéria kép" className="max-h-full max-w-full object-contain" />
          <button onClick={prevImage} className="absolute left-2 text-3xl font-bold">{'❮'}</button>
          <button onClick={nextImage} className="absolute right-2 text-3xl font-bold">{'❯'}</button>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">Még nincsenek képek a galériában.</p>
      )}

      {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <div className="flex flex-col md:flex-row gap-4">
        <label className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md cursor-pointer hover:bg-blue-700">
          📤 Képfeltöltés
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <a
          href="https://drive.google.com/drive/u/2/folders/14Xotll1Dr-VPOK-9xNiv1u3Dx1Wl91ZV"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-600"
        >
          📁 Megnyitás a Drive-ban
        </a>
      </div>
    </div>
  );
};

export default GallerySection;
