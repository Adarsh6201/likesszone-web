import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const ProductFiltersSidebar = ({ categoryFilter, categories = [], onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Filters</h2>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-350">Categories</h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              categoryFilter === 'all' 
                ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
            }`}
          >
            All Products
          </button>
          {([...categories].sort((a, b) => (a.name || '').localeCompare(b.name || ''))).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                categoryFilter === cat.slug 
                  ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProductFiltersSidebar;
