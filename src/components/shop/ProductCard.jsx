'use client';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getImageUrl } from '../../services/api';

const ProductCard = ({ product, onAddToCart, showDesc = false, btnLabel = 'Add' }) => {
  if (!product) return null;
  const price = Number(product.price || 0);
  const mrp = Number(product.originalPrice || price);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const isOutOfStock = product.stock !== undefined && product.stock !== null
    ? Number(product.stock) <= 0
    : false;

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, 1);
  };

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, 1);
    navigate('/checkout');
  };

  const imageSrc = getImageUrl(product.image);
  const categoryName = product.category || product.categorySlug || 'Electronics';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-[#bd1f35]/40 transition-all duration-200 group relative">

      {/* Product Image Canvas */}
      <Link
        to={`/product/${product.id || ''}`}
        className="block aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 mb-2.5 relative flex items-center justify-center p-2 group"
      >
        <img
          src={imageSrc}
          alt={product.name || 'Product'}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
          }}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
            isOutOfStock ? 'opacity-70 grayscale-30' : 'group-hover:scale-105'
          }`}
        />

        {/* Discount Ribbon Tag */}
        {discount > 0 && !isOutOfStock && (
          <span className="absolute top-2 left-2 bg-[#bd1f35] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
            {discount}% OFF
          </span>
        )}

        {/* Out of Stock Corner Ribbon (Bold diagonal ribbon on top-right) */}
        {isOutOfStock ? (
          <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none z-10">
            <div className="absolute top-6 -right-9 w-40 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider py-1.5 text-center shadow-lg transform rotate-45 border-y border-white/25 select-none">
              OUT OF STOCK
            </div>
          </div>
        ) : (
          <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">
            Fast Delivery
          </span>
        )}
      </Link>

      {/* Info Content Block */}
      <div className="flex-grow flex flex-col justify-between space-y-2">
        <div>
          {/* Category Tag */}
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate mb-1">
            {categoryName.replace(/-/g, ' ')}
          </p>

          {/* Product Title */}
          <h3 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-[#bd1f35] transition-colors">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-amber-500 font-semibold">
            <Star className="h-3 w-3 fill-current" />
            <span>{product.rating || '4.5'}</span>
            <span className="text-slate-400 text-[10px] font-normal">
              ({product.reviewsCount || 18})
            </span>
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              ₹{Number(product.price || 0).toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-slate-400 line-through text-[11px]">
                ₹{Number(mrp || 0).toFixed(2)}
              </span>
            )}
          </div>

          {/* Optional description snippet */}
          {showDesc && product.description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
              {product.description}
            </p>
          )}

          {/* Action Buttons: Add to Cart and Buy Now side-by-side */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {/* Add Button */}
            <button
              type="button"
              onClick={handleAddClick}
              disabled={isOutOfStock}
              className={`flex-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                isOutOfStock
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-900 border border-[#bd1f35] text-[#bd1f35] hover:bg-[#bd1f35]/10 active:scale-95 shadow-2xs cursor-pointer'
              }`}
              title={isOutOfStock ? 'Item is out of stock' : 'Add to cart'}
            >
              <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{isOutOfStock ? 'Out' : btnLabel}</span>
            </button>

            {/* Buy Now Button */}
            <button
              type="button"
              onClick={handleBuyNowClick}
              disabled={isOutOfStock}
              className={`flex-1 py-1.5 px-1.5 sm:px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                isOutOfStock
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                  : 'bg-gradient-to-r from-[#bd1f35] to-[#8a0025] hover:opacity-95 text-white active:scale-95 shadow-xs cursor-pointer'
              }`}
              title={isOutOfStock ? 'Item is out of stock' : 'Buy Now'}
            >
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Buy Now</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
