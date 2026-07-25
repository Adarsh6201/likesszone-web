import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';

const AddProduct = () => {
  const { categories, addProduct } = useProducts();
  const navigate = useNavigate();

  const handleFormSubmit = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      featured: false
    };
    addProduct(newProduct);
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Link 
          to="/admin/products"
          className="p-2 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Product (INR)</h2>
          <p className="text-xs text-slate-500">Create a new item listing with local image uploads and auto-calculated discounts.</p>
        </div>
      </div>

      <ProductForm 
        categories={categories}
        onSubmit={handleFormSubmit}
        submitLabel="Create Product"
      />

    </div>
  );
};

export default AddProduct;
