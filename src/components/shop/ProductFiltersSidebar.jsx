import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const ProductFiltersSidebar = ({ categoryFilter, categories = [], onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <SlidersHorizontal className="h-5 w-5 text-[#bd1f35]" />
        <h2 className="font-bold text-base text-slate-900 dark:text-white">Filters</h2>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Categories</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === 'all' 
                ? 'bg-[#bd1f35]/10 text-[#bd1f35] dark:text-[#f17081]' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
            }`}
          >
            All Products
          </button>
          {([...categories].sort((a, b) => (a.name || '').localeCompare(b.name || ''))).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === cat.slug 
                  ? 'bg-[#bd1f35]/10 text-[#bd1f35] dark:text-[#f17081] font-bold' 
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
