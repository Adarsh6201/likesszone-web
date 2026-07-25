import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Star, Tag } from 'lucide-react';

const ProductCatalogTable = ({ items = [], onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 font-semibold">
            <th className="py-3 px-4">Item Name</th>
            <th className="py-3 px-4">Category / Type</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-center">Stock</th>
            <th className="py-3 px-4 text-center">Rating</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {items?.map((prod) => (
            <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
              <td className="py-3.5 px-4 flex items-center gap-3">
                <img
                  src={prod.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
                  alt={prod.name || 'Product'}
                  className="h-10 w-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                />
                <div>
                  <p className="font-semibold text-slate-850 dark:text-white line-clamp-1">{prod.name || 'Unnamed Product'}</p>
                  <p className="text-[10px] text-slate-400">ID: {prod.id}</p>
                </div>
              </td>
              <td className="py-3.5 px-4 capitalize text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Tag className="h-3 w-3 text-indigo-500" />
                  {(prod.category || '').replace('-', ' ')}
                </span>
              </td>
              <td className="py-3.5 px-4 text-right font-semibold text-slate-800 dark:text-slate-100">
                ₹{(prod.price || 0).toFixed(2)}
              </td>
              <td className="py-3.5 px-4 text-center">
                <span className={`inline-block font-semibold px-2 py-0.5 rounded text-xs ${
                  (prod.stock || 0) < 10 
                    ? 'text-red-600 bg-red-50 dark:bg-red-950/20' 
                    : 'text-slate-700 dark:text-slate-350'
                }`}>
                  {prod.stock || 0} units
                </span>
              </td>
              <td className="py-3.5 px-4 text-center">
                <span className="inline-flex items-center gap-0.5 font-medium text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {prod.rating || 0}
                </span>
              </td>
              <td className="py-3.5 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Link 
                    to={`/admin/products/edit/${prod.id}`}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(prod.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCatalogTable;
