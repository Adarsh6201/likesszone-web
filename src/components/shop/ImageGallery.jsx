import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images = [], defaultImage, productName }) => {
  const [activeImage, setActiveImage] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Sync active image with defaults on load
  useEffect(() => {
    setActiveImage(images[0] || defaultImage);
  }, [images, defaultImage]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="lg:col-span-5 flex flex-col md:flex-row gap-4">
      
      {/* Vertical Thumbnails list */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`h-16 w-16 shrink-0 rounded-lg overflow-hidden border bg-slate-50 dark:bg-slate-800 transition-all ${
                activeImage === img 
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Large Main Showcase with Amazon Hover Zoom */}
      <div 
        className="flex-grow aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 order-1 md:order-2 flex items-center justify-center p-2 relative cursor-zoom-in"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={activeImage || defaultImage} 
          alt={productName} 
          className="w-full h-full object-contain max-h-[450px] transition-transform duration-100 ease-out z-0" 
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: isHovered ? 'scale(2.2)' : 'scale(1)'
          }}
        />
      </div>

    </div>
  );
};

export default ImageGallery;
