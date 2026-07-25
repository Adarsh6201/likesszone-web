import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Plus } from 'lucide-react';
import CategoryCreatorForm from '../../components/admin/CategoryCreatorForm';
import CategoryCard from '../../components/admin/CategoryCard';

const ProductTypeManager = () => {
  const { categories, products, addCategory, deleteCategory } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getProductCount = (categorySlug) => {
    return products.filter(p => p.category === categorySlug).length;
  };

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Types & Categories</h2>
          <p className="text-sm text-slate-500 mt-1">Add or classify items catalog using an Amazon-style visual structure.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none transition-all"
        >
          <Plus className="h-4.5 w-4.5" />
          {isFormOpen ? 'Collapse Creator' : 'Add Product Type'}
        </button>
      </div>

      {/* Collapsible Category Creator Form */}
      {isFormOpen && (
        <CategoryCreatorForm 
          categories={categories}
          onAddCategory={addCategory}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* Amazon-Style Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard 
            key={cat.id}
            cat={cat}
            productCount={getProductCount(cat.slug)}
            onDelete={deleteCategory}
          />
        ))}
      </div>

    </div>
  );
};

export default ProductTypeManager;
