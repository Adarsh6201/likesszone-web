import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import ImageGallery from '../../components/shop/ImageGallery';
import ProductCard from '../../components/shop/ProductCard';
import ProductInfoSection from '../../components/shop/ProductInfoSection';
import ProductBuyBox from '../../components/shop/ProductBuyBox';
import ProductBreadcrumbs from '../../components/shop/ProductBreadcrumbs';
import { getYouTubeEmbedUrl, getYouTubeVideoId, YoutubeIcon } from '../../utils/youtube';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  
  const product = products.find(p => String(p.id) === String(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Product Not Found</h2>
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
    navigate('/checkout');
  };

  const relatedProducts = products.filter(p => String(p.id) !== String(product.id)).slice(0, 6);

  const youtubeVideoId = getYouTubeVideoId(product.videoUrl);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(product.videoUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Category Breadcrumbs */}
      <ProductBreadcrumbs product={product} />

      {/* Primary Layout Card (Left: Images, Middle: Description, Right: Buy Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
        
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

      {/* --- Dedicated YouTube Product Video Showcase (Just below the card) --- */}
      {youtubeVideoId && (
        <section id="product-video-section" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <YoutubeIcon className="h-6 w-6" />
              Product Video Showcase
            </h3>
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 px-3 py-1 rounded-full">
              HD Video Demo
            </span>
          </div>

          <div className="flex justify-center w-full py-2">
            <div className="aspect-video w-full max-w-4xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-xl">
              <iframe
                src={youtubeEmbedUrl}
                title={`${product.name} Official Video Showcase`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

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
