import React from 'react';
import { Truck, Calendar, Lock, CreditCard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProductBuyBox = ({ product, quantity, onQuantityChange, onAddToCart, onBuyNow }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      onAddToCart();
    }
  };

  const handleBuyNowClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      onBuyNow();
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl p-5 space-y-5 shadow-sm sticky top-24">
        
        {/* Price indicator */}
        <div className="space-y-1">
          <div className="text-2xl font-black text-slate-950 dark:text-white">
            ₹{product.price.toFixed(2)}
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            Free delivery available.
          </p>
        </div>

        {/* Delivery Dates details */}
        <div className="space-y-3 text-xs text-slate-655 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <Truck className="h-4.5 w-4.5 shrink-0 text-slate-400" />
            <div>
              <p>Arrives: <span className="font-semibold text-slate-900 dark:text-white">Tuesday, July 28</span></p>
              <p className="text-[10px] text-slate-400">Fulfillment processed within 24 hours.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Calendar className="h-4.5 w-4.5 shrink-0 text-slate-400" />
            <div>
              <p>Fastest Delivery: <span className="font-semibold text-slate-900 dark:text-white">Tomorrow, July 25</span></p>
              <p className="text-[10px] text-slate-400">Order within 4 hrs 12 mins.</p>
            </div>
          </div>
        </div>

        {/* Stock status indicator */}
        <div className="text-xs">
          {product.stock > 0 ? (
            product.stock < 10 ? (
              <span className="text-red-600 font-bold">
                Only {product.stock} left in stock - order soon.
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                In Stock
              </span>
            )
          ) : (
            <span className="text-red-600 font-bold">Temporarily Out of Stock</span>
          )}
        </div>

        {/* Quantity Selector dropdown */}
        {product.stock > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-500">Qty:</span>
            <select
              value={quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white py-1 px-2.5 outline-none dark:border-slate-800 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold"
            >
              {[...Array(Math.min(10, product.stock))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Form CTA Actions */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCartClick}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-3 shadow-md shadow-amber-100 dark:shadow-none transition-transform active:scale-97 disabled:bg-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 cursor-pointer"
          >
            Add to Cart
          </button>
          
          <button
            onClick={handleBuyNowClick}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 shadow-md shadow-orange-100 dark:shadow-none transition-transform active:scale-97 disabled:bg-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 cursor-pointer"
          >
            Buy Now
          </button>
        </div>

        {/* Secure Transaction badge */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-[10px] text-slate-405">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <span>Secure Transaction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5 text-slate-400" />
            <span>Returns: Eligible for refund in 7 days</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductBuyBox;
export { ProductBuyBox };
