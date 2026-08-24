import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

const ProductInfoSection = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice ? Math.round((discountAmount / product.originalPrice) * 100) : 0;

  const features = Array.isArray(product.features) ? product.features : [];
  const INITIAL_VISIBLE_COUNT = 3;
  const visibleFeatures = isExpanded ? features : features.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMoreFeatures = features.length > INITIAL_VISIBLE_COUNT;

  return (
    <div className="lg:col-span-4 space-y-4">
      
      {/* Brand/Heading */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide capitalize">
          Visit the {product.category?.replace('-', ' ') || 'Store'}
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
              className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-slate-300'}`} 
            />
          ))}
          <span className="text-sm font-semibold ml-1.5 text-slate-850 dark:text-white">{product.rating || 0}</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
          {product.reviewsCount || 0} customer ratings
        </span>
      </div>

      {/* Price details & discounts (Amazon style) */}
      <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        {product.originalPrice && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>List Price:</span>
            <span className="line-through">₹{Number(product.originalPrice).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            ₹{Number(product.price || 0).toFixed(2)}
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
      {features.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">About this item</h3>
            {hasMoreFeatures && (
              <span className="text-[11px] font-medium text-slate-400">
                {isExpanded ? `Showing all ${features.length} points` : `Showing 3 of ${features.length}`}
              </span>
            )}
          </div>

          <ul className="list-disc pl-4 space-y-2 text-xs text-slate-600 dark:text-slate-300 transition-all duration-300">
            {visibleFeatures.map((feat, idx) => (
              <li key={idx} className="leading-relaxed">
                {feat}
              </li>
            ))}
          </ul>

          {hasMoreFeatures && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 py-1 transition-colors cursor-pointer group"
            >
              <span>{isExpanded ? 'Show less' : `Show more (+${features.length - INITIAL_VISIBLE_COUNT} more details)`}</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default ProductInfoSection;
