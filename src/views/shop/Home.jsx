'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { 
  ArrowRight, Truck, ShieldCheck, RefreshCw, CreditCard, 
  ChevronLeft, ChevronRight, Zap, Sparkles, ShoppingBag, Check
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../../components/shop/ProductCard';
import { getImageUrl } from '../../services/api';

const promoSlides = [
  {
    badge: 'MEGA HARDWARE SALE',
    title: 'High-Performance PC Hardware & Components',
    description: 'Upgrade your workstation with enterprise-grade hard drives, AM4/AM5 coolers, and 550W power supplies.',
    discount: 'UP TO 45% OFF',
    category: 'computer-accessories-and-components',
    bgGradient: 'from-slate-950 via-[#3d0812] to-[#bd1f35]',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&auto=format&fit=crop&q=80',
  },
  {
    badge: 'STUDIO & CREATOR GEAR',
    title: 'Cinema Cameras & Studio Equipment',
    description: 'Blackmagic cinema cameras, studio lighting, audio monitors, and rugged camera travel gear.',
    discount: 'CREATOR SPECIALS',
    category: 'camera',
    bgGradient: 'from-slate-950 via-slate-900 to-[#8a0025]',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80',
  },
  {
    badge: 'COMMERCIAL & RESIDENTIAL',
    title: 'Smart Electricals & Industrial Supplies',
    description: 'Certified distribution panels, industrial switches, high-lumen floodlights, and wiring solutions.',
    discount: '100% GENUINE CERTIFIED',
    category: 'electrical',
    bgGradient: 'from-slate-950 via-[#2d050c] to-[#a31528]',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const { products, categories, fetchProducts, fetchCategories } = useProducts();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Auto-advance banner slides every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const productList = Array.isArray(products) ? products : [];
  const categoryList = Array.isArray(categories) ? categories : [];

  // Sorted categories A-Z
  const sortedCategories = [...categoryList].sort((a, b) => 
    (a?.name || '').localeCompare(b?.name || '')
  );

  // Filter products by active tab
  const filteredProducts = activeTab === 'all'
    ? productList
    : productList.filter((p) => {
        const cat = (p.category || p.categorySlug || '').toLowerCase();
        return cat.includes(activeTab.toLowerCase());
      });

  // Dedicated PC hardware items
  const pcProducts = productList.filter((p) => {
    const c = (p.category || p.categorySlug || '').toLowerCase();
    return c.includes('computer') || c.includes('hardware') || c.includes('component');
  });

  return (
    <div className="w-full max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 py-4 sm:py-6">

      {/* --- 1. Modern E-Commerce Hero Promo Banner Slider --- */}
      <section className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-900">
        <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 w-full">
          {promoSlides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.title}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background image & gradient overlay */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-overlay"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95`} />

                {/* Content Overlay */}
                <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 flex flex-col justify-center max-w-2xl text-white space-y-2.5 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] sm:text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/30">
                      {slide.badge}
                    </span>
                    <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                      {slide.discount}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-lg leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="pt-1">
                    <button
                      onClick={() => navigate(`/shop?category=${slide.category}`)}
                      className="bg-white hover:bg-slate-100 text-[#bd1f35] px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
                    >
                      Shop Collection
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
          {promoSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs transition-colors hidden sm:flex cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % promoSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs transition-colors hidden sm:flex cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* --- 2. Trust & Guarantee Badges Strip (Amazon / Flipkart standard) --- */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            icon: Truck,
            title: 'Express 24h Shipping',
            desc: 'Fast door-to-door delivery across India',
            color: 'text-[#bd1f35]',
            bg: 'bg-[#bd1f35]/10',
          },
          {
            icon: ShieldCheck,
            title: '100% Genuine Hardware',
            desc: 'Verified parts & manufacturer warranty',
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          },
          {
            icon: RefreshCw,
            title: '7-Day Easy Returns',
            desc: 'Hassle-free replacement policy',
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-950/40',
          },
          {
            icon: CreditCard,
            title: 'Secure Payment & COD',
            desc: 'Cards, UPI, Netbanking & Cash on Delivery',
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-950/40',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#bd1f35]/30 transition-colors"
            >
              <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} shrink-0`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* --- 3. Shop by Category Grid (Modern High-Density Cards) --- */}
      <section id="categories" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Shop by Category</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Explore specialized electronic hardware, optics, and industrial components
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#bd1f35] dark:text-[#f17081] hover:underline flex items-center gap-1 shrink-0"
          >
            All Categories <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {sortedCategories.map((cat, idx) => (
            <div
              key={cat?.id || cat?.slug || idx}
              onClick={() => {
                if (cat?.slug) navigate(`/shop?category=${cat.slug}`);
              }}
              className="group relative h-32 sm:h-36 rounded-2xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-800 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <img
                src={getImageUrl(cat?.image)}
                alt={cat?.name || 'Category'}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80';
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Category
                </span>
                <h3 className="font-extrabold text-xs sm:text-sm tracking-tight capitalize leading-tight mt-0.5 text-white">
                  {cat?.name ? cat.name.replace(/-/g, ' ') : ''}
                </h3>
                <p className="text-[10px] text-white/75 line-clamp-1 mt-0.5">
                  {cat?.description || 'Browse high-performance products'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. Today's Deals & Trending Products Catalog --- */}
      <section className="space-y-4">
        {/* Section Header with Live Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span>Trending Products & Deals</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Handpicked hardware pieces and exclusive catalog offers
            </p>
          </div>

          {/* Category Filter Pills (Instant Switcher) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'computer', label: 'Computers' },
              { id: 'camera', label: 'Camera' },
              { id: 'electrical', label: 'Electrical' },
              { id: 'accessories', label: 'Accessories' },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#bd1f35] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* High-Density Product Grid (5 to 6 Columns on Desktop) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product?.id || idx}
                product={product}
                onAddToCart={addToCart}
                btnLabel="Add"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <ShoppingBag className="h-10 w-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No products found in this category
            </p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-3 text-xs font-bold text-[#bd1f35] hover:underline cursor-pointer"
            >
              View all products
            </button>
          </div>
        )}
      </section>

      {/* --- 5. Dedicated Shelf: Computer Hardware & Storage --- */}
      {pcProducts.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Computer Components & Storage
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Top processors, cooling units, power supplies, and enterprise hard drives
              </p>
            </div>
            <Link
              to="/shop?category=computer-accessories-and-components"
              className="text-xs font-bold text-[#bd1f35] dark:text-[#f17081] hover:underline flex items-center gap-1 shrink-0"
            >
              See All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
            {pcProducts.map((product, idx) => (
              <ProductCard
                key={product?.id || idx}
                product={product}
                onAddToCart={addToCart}
                btnLabel="Add"
              />
            ))}
          </div>
        </section>
      )}

      {/* --- 6. Likesszon Business Advantage Banner --- */}
      <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-[#bd1f35]/90 border border-slate-800 p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            LIKESSZON BUSINESS
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Need Bulk Hardware or Commercial Electrical Orders?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Get GST invoices, corporate tier pricing, and direct distributor fulfillment for your enterprise or retail store.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/about"
            className="px-5 py-2.5 rounded-xl bg-white text-[#bd1f35] font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
          >
            Learn More
          </Link>
          <Link
            to="/shop"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;