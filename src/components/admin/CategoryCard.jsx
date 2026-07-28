import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const CategoryCard = ({ cat, productCount, onDelete, onEdit }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col justify-between shadow-sm relative group hover:shadow-md transition-shadow">
      
      {/* Category Title (Amazon Style at the top) */}
      <div className="space-y-1 mb-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight line-clamp-1">
          {cat.name}
        </h3>
        <p className="text-slate-400 text-xs truncate font-mono">
          slug: {cat.slug}
        </p>
      </div>

      {/* Central Category Image Showcase */}
      <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-100 dark:border-slate-800 mb-4">
        <img 
          src={cat.image || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'} 
          alt={cat.name} 
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
      </div>

      {/* Bottom description / Link */}
      <div className="space-y-4 flex-grow flex flex-col justify-between">
        <p className="text-slate-505 text-xs line-clamp-2 leading-relaxed">
          {cat.description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3">
          {/* Shop now indicator showing count */}
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            Explore {productCount} products
          </span>
          
          {/* Action Controls */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onEdit(cat)}
              className="p-1 rounded text-slate-405 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Edit Product Type"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => onDelete(cat.slug)}
              className="p-1 rounded text-slate-405 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
              title="Delete Product Type"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CategoryCard;
