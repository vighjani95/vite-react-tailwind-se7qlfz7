import React, { useState, useEffect } from 'react';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMXsY_6SfXKJUNY13kWj-zbfxfupI3uDkrcaSPWED8Jkjeegj-eT3YPrJp7QFLNpmN/exec';
  
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setError('');
      const response = await fetch(`${SCRIPT_URL}?cache=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      
      // Ensure each image has valid URLs
      const validatedImages = data.map(img => ({
        ...img,
        thumbnail: img.thumbnail || `https://drive.google.com/thumbnail?id=${img.id}&sz=w400-h300`,
        fullsize: img.fullsize || `https://drive.google.com/uc?export=view&id=${img.id}`
      }));
      
      setImages(validatedImages.sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Nem sikerült betölteni a képeket. Próbáld újra később.');
      setImages([]);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    
    setIsUploading(true);
    setMessage('');
    setError('');
    
    try {
      const uploadPromises = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const uploadPromise = new Promise((resolve) => {
          reader.onload = async (event) => {
            const base64 = event.target.result.split(',')[1];
            const payload = {
              filename: file.name,
              mimeType: file.type,
              contents: base64
            };
            
            const response = await fetch(SCRIPT_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload)
            });
            
            const result = await response.json();
            resolve(result);
          };
        });
        
        reader.readAsDataURL(file);
        uploadPromises.push(uploadPromise);
      }
      
      await Promise.all(uploadPromises);
      setMessage('Köszönjük a képet! Frissül a galéria...');
      setTimeout(fetchImages, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Hiba történt a feltöltés során.');
    } finally {
      setIsUploading(false);
    }
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full md:w-2/3 flex flex-col items-center bg-[#FFF0F5] p-10 overflow-y-auto">
      <h2 className="text-5xl font-serif italic text-center text-[#000] mb-6">Galéria</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
      
      {images.length > 0 ? (
        <div className={`relative w-full max-w-3xl ${isFullscreen ? 'h-screen fixed inset-0 z-50 bg-black' : 'h-[400px] border border-black rounded-md bg-white shadow-lg mb-4'}`}>
          <img 
            src={images[currentIndex]?.fullsize} 
            alt={images[currentIndex]?.name || 'Galéria kép'} 
            className={`${isFullscreen ? 'w-full h-full object-contain' : 'max-h-full max-w-full object-contain'}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = images[currentIndex]?.thumbnail || 'https://via.placeholder.com/400x300?text=Kép+nem+található';
            }}
          />
          
          <button 
            onClick={prevImage} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl font-bold bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
          >
            {'❮'}
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl font-bold bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
          >
            {'❯'}
          </button>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)} 
            className={`absolute ${isFullscreen ? 'top-4 right-4' : 'top-2 right-2'} text-xl bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition`}
          >
            {isFullscreen ? '✕' : '⛶'}
          </button>
        </div>
      ) : (
        !error && <p className="text-gray-500 mb-4">Még nincsenek képek a galériában.</p>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <label className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md cursor-pointer hover:bg-blue-700 transition">
          {isUploading ? 'Feltöltés...' : '📤 Képfeltöltés'}
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            className="hidden" 
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </label>
        <a
          href="https://drive.google.com/drive/u/2/folders/14Xotll1Dr-VPOK-9xNiv1u3Dx1Wl91ZV"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-600 transition text-center"
        >
          Megnyitás a Drive-ban 📁
        </a>
      </div>
    </div>
  );
};

export default GallerySection;