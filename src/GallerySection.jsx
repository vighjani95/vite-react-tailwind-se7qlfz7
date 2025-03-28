import React, { useState, useEffect } from 'react';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // FONTOS: Cseréld le a saját Google Apps Script URL-edre!
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-lninQPSVBj4ahsLtOUG4SLAiXvVFh0Kx7V5XVBom-ZvoRcvh2NHGEnDb9fs3AgNJ-A/exec';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?cache=${Date.now()}`);
        const data = await response.json();
        
        if (!data.success) throw new Error(data.error || 'Ismeretlen hiba');
        if (!data.images || data.images.length === 0) throw new Error('Nincsenek képek a galériában');
        
        setImages(data.images);
      } catch (err) {
        console.error('Hiba a képek betöltésekor:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentIndex + 1) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
  };

  const getImageUrl = (image) => {
    return `https://lh3.googleusercontent.com/d/${image.id}=w1200`;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      <span className="ml-4">Képek betöltése...</span>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-2xl mx-auto">
      <p className="font-bold">Hiba történt</p>
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Újrapróbálkozás
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Csak a Galéria cím marad */}
      <h2 className="text-3xl md:text-4xl font-serif text-gray-800 text-center mb-8">Galéria</h2>
      
      {/* Képgaléria */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={`https://lh3.googleusercontent.com/d/${image.id}=w500`}
              alt={image.name || 'Esküvői kép'}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://drive.google.com/thumbnail?id=${image.id}&sz=w500`;
              }}
            />
          </div>
        ))}
      </div>

      {/* Teljes képernyős nézet */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={getImageUrl(selectedImage)}
              alt={selectedImage.name}
              className="max-h-[90vh] max-w-full object-contain mx-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://drive.google.com/uc?export=view&id=${selectedImage.id}`;
              }}
            />
            
            {/* Navigációs gombok */}
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
            >
              ❮
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
            >
              ❯
            </button>
            
            {/* Bezárás gomb */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;


