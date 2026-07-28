import React, { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../../components/shop/ProductCard';
import HomeHeroBanner from '../../components/shop/HomeHeroBanner';

const Home = () => {
  const { addToCart } = useCart();
  const { products, categories, fetchProducts, fetchCategories } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Explicitly featured products marked by admin
  const explicitFeatured = products.filter((p) => p.featured);
  
  // Show explicitly featured products. If admin has marked none, fallback to top products.
  const featuredProducts = explicitFeatured.length > 0 
    ? explicitFeatured 
    : products.slice(0, 4);

  // Sorted categories A-Z
  const sortedCategories = [...categories].sort((a, b) => (a.name || '').localeCompare(b.name || ''));

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
          {sortedCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                navigate(`/shop?category=${cat.slug}`);
              }}
              className="group relative h-40 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-sm tracking-tight capitalize leading-tight">{cat.name.replace('-', ' ')}</h3>
                <p className="text-[10px] text-slate-350 line-clamp-1 mt-0.5">{cat.description}</p>
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
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id}
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
