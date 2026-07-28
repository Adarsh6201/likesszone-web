import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { Plus } from 'lucide-react';
import ProductCatalogTable from '../../components/admin/ProductCatalogTable';

const ProductManager = () => {
  const { products: items, deleteProduct, updateProduct } = useProducts();

  const handleToggleFeatured = async (product) => {
    try {
      await updateProduct(product.id, { featured: !product.featured });
    } catch (err) {
      alert('Failed to update featured status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Product Catalog</h2>
            <p className="text-xs text-slate-500">Edit prices, manage category logs and monitor item stocks.</p>
          </div>
          <Link 
            to="/admin/products/new"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none transition-transform active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        <ProductCatalogTable 
          items={items}
          onDelete={deleteProduct}
          onToggleFeatured={handleToggleFeatured}
        />
      </div>
    </div>
  );
};

export default ProductManager;
