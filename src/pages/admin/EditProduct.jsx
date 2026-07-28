import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../../components/admin/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const { products, categories, updateProduct } = useProducts();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-12 text-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Product Not Found</h3>
        <p className="text-slate-500 text-xs mt-1">The catalog item you want to edit does not exist.</p>
        <Link 
          to="/admin/products"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (productData) => {
    const updatedProduct = {
      ...product,
      ...productData
    };
    updateProduct(product.id, updatedProduct);
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Product (INR)</h2>
          <p className="text-xs text-slate-500">Modify properties, upload local images, and update specs list.</p>
        </div>
      </div>

      <ProductForm 
        categories={categories}
        initialProduct={product}
        onSubmit={handleFormSubmit}
        submitLabel="Save Changes"
      />

    </div>
  );
};

export default EditProduct;
