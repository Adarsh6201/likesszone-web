'use client';

import React, { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../../components/shop/ProductCard';
import HomeHeroBanner from '../../components/shop/HomeHeroBanner';
import { getImageUrl } from '../../services/api';

const Home = () => {
  const { addToCart } = useCart();
  const { products, categories, fetchProducts, fetchCategories } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Explicitly featured products marked by admin
  const productList = Array.isArray(products) ? products : [];
  const categoryList = Array.isArray(categories) ? categories : [];

  const explicitFeatured = productList.filter((p) => p?.featured);

  // Show explicitly featured products. If admin has marked none, fallback to top products.
  const featuredProducts = explicitFeatured.length > 0
    ? explicitFeatured
    : productList.slice(0, 4);

  // Sorted categories A-Z
  const sortedCategories = [...categoryList].sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));

  return (
    <div className="space-y-12 pb-16">

      {/* Hero Banner Section */}
      <HomeHeroBanner />

      {/* Categories Horizontal Selector */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedCategories.map((cat, idx) => (
            <div
              key={cat?.id || cat?.slug || idx}
              onClick={() => {
                if (cat?.slug) navigate(`/shop?category=${cat.slug}`);
              }}
              className="group relative h-40 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={getImageUrl(cat?.image)}
                alt={cat?.name || 'Category'}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80';
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-sm tracking-tight capitalize leading-tight">{cat?.name ? cat.name.replace('-', ' ') : ''}</h3>
                <p className="text-[10px] text-slate-350 line-clamp-1 mt-0.5">{cat?.description || ''}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Featured Exclusives</h2>
            <p className="text-sm text-slate-500 mt-1">Our top recommended pieces for this week.</p>
          </div>
          <Link to="/shop" className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard
              key={product?.id || idx}
              product={product}
              onAddToCart={addToCart}
              btnLabel="Add"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
