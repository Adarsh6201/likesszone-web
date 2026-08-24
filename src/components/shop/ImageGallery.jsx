import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images = [], defaultImage, productName }) => {
  const [activeImage, setActiveImage] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Safely parse images array if passed as stringified JSON
  const imageList = Array.isArray(images)
    ? images
    : typeof images === 'string'
    ? (() => {
        try {
          const parsed = JSON.parse(images);
          return Array.isArray(parsed) ? parsed : [images];
        } catch {
          return [images];
        }
      })()
    : [];

  const validImages = imageList.length > 0 ? imageList : (defaultImage ? [defaultImage] : []);

  // Sync active image on load
  useEffect(() => {
    setActiveImage(validImages[0] || defaultImage);
  }, [images, defaultImage]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="lg:col-span-5 flex flex-col md:flex-row gap-3 self-start w-full min-w-0">
      {/* Vertical/Horizontal Thumbnails list */}
      {validImages.length > 1 && (
        <div className="flex md:flex-col gap-2.5 order-2 md:order-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto max-h-[440px] p-1.5 shrink-0 scrollbar-thin">
          {validImages.map((img, idx) => {
            const isActive = activeImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-xl overflow-hidden border-2 bg-white dark:bg-slate-800 transition-all cursor-pointer relative p-1 flex items-center justify-center ${
                  isActive 
                    ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/25 shadow-md shadow-indigo-100 dark:shadow-none' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 opacity-75 hover:opacity-100'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${productName || 'Product'} thumbnail ${idx + 1}`} 
                  className="w-full h-full object-contain" 
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Showcase Area with 1:1 Aspect Ratio (Responsive & Column-bounded) */}
      <div 
        className="flex-1 min-w-0 aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 order-1 md:order-2 flex items-center justify-center p-3 relative cursor-zoom-in shadow-inner"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={activeImage || defaultImage} 
          alt={productName || 'Product Image'} 
          className="w-full h-full object-contain transition-transform duration-100 ease-out z-0" 
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
