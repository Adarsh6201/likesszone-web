import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ImageGallery from '../../components/shop/ImageGallery';
import ProductCard from '../../components/shop/ProductCard';
import ProductInfoSection from '../../components/shop/ProductInfoSection';
import ProductBuyBox from '../../components/shop/ProductBuyBox';
import ProductBreadcrumbs from '../../components/shop/ProductBreadcrumbs';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-slate-500">The product you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate('/shop')} 
          className="inline-block rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white cursor-pointer"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Category Breadcrumbs */}
      <ProductBreadcrumbs product={product} />

      {/* Primary Layout (Left: Images, Middle: Description, Right: Buy Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
        
        {/* --- Left Column: Image Gallery Component --- */}
        <ImageGallery 
          images={product.images}
          defaultImage={product.image}
          productName={product.name}
        />

        {/* --- Middle Column: Product Details & Features --- */}
        <ProductInfoSection product={product} />

        {/* --- Right Column: Buy Box --- */}
        <ProductBuyBox 
          product={product}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

      </div>

      {/* Related Products Section */}
      <section className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Other Products in Store</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard 
              key={p.id}
              product={p}
              onAddToCart={addToCart}
              showDesc={true}
              btnLabel="ADD"
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProductDetail;
