import React from 'react';
import { Star } from 'lucide-react';

const ProductInfoSection = ({ product }) => {
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice ? Math.round((discountAmount / product.originalPrice) * 100) : 0;

  return (
    <div className="lg:col-span-4 space-y-4">
      
      {/* Brand/Heading */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide capitalize">
          Visit the {product.category.replace('-', ' ')} Store
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Ratings & Reviews */}
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} 
            />
          ))}
          <span className="text-sm font-semibold ml-1.5 text-slate-850 dark:text-white">{product.rating}</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
          {product.reviewsCount} customer ratings
        </span>
      </div>

      {/* Price details & discounts (Amazon style) */}
      <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        {product.originalPrice && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>List Price:</span>
            <span className="line-through">₹{product.originalPrice.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            ₹{product.price.toFixed(2)}
          </span>
          {discountPercent > 0 && (
            <span className="text-sm font-bold text-red-600">
              Save ₹{discountAmount.toFixed(2)} ({discountPercent}% off)
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-400">Prices include import fees deposit & taxes.</p>
      </div>

      {/* "About this item" bullet items */}
      {product.features && (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">About this item</h3>
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {product.features.map((feat, idx) => (
              <li key={idx} className="leading-relaxed">
                {feat}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default ProductInfoSection;
