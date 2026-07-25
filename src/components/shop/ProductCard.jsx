import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product, onAddToCart, showDesc = false, btnLabel = 'Add to Cart' }) => {
  const mrp = product.originalPrice || product.price;
  const discount = mrp > product.price ? Math.round(((mrp - product.price) / mrp) * 100) : 0;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      onAddToCart(product, 1);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group relative">
      
      {/* Product Image Canvas */}
      <Link 
        to={`/product/${product.id}`} 
        className="block aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 mb-4 flex items-center justify-center p-2"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300"
        />
      </Link>
 
      {/* Info Content Block */}
      <div className="flex-grow flex flex-col justify-between space-y-3">
        <div>
          {/* Discount Tag */}
          {discount > 0 && (
            <span className="inline-block bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded mb-2 animate-fadeIn">
              {discount}% OFF
            </span>
          )}
 
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 leading-snug">
              <Link to={`/product/${product.id}`} className="hover:text-indigo-600">
                {product.name}
              </Link>
            </h3>
            <button
              onClick={handleAddClick}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-[11px] font-bold text-slate-850 dark:text-slate-200 hover:bg-slate-50 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              {btnLabel}
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-indigo-400">
              ₹{product.price.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-slate-400 line-through text-xs">
                ₹{mrp.toFixed(2)}
              </span>
            )}
          </div>

          {/* Optional description snippet */}
          {showDesc && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
              {product.description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-xs text-amber-500 font-semibold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{product.rating || 0}</span>
            <span className="text-slate-400 text-[10px] font-normal">
              ({product.reviewsCount || 0})
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
