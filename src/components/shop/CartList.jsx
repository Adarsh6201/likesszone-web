import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartList = ({ cart = [], onUpdateQuantity, onRemove, onClear }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
        <span className="font-bold text-slate-700 dark:text-slate-300">Items ({cart.length})</span>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700 font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex py-4 first:pt-0 last:pb-0">
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-2xl object-cover border border-slate-200 dark:border-slate-800"
            />
            <div className="ml-6 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400 capitalize mt-1">{item.category.replace('-', ' ')}</p>
                </div>
                <span className="text-base font-extrabold text-slate-900 dark:text-indigo-400">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs mt-4">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-55 dark:bg-slate-800">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-slate-500 hover:text-indigo-600"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3.5 font-bold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-slate-505 hover:text-indigo-600"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 font-semibold"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;
