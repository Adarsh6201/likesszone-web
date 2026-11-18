'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { useSchemes } from '../../hooks/useSchemes';
import { 
  ArrowRight, Zap, ShoppingBag, Check, Copy, Tag, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../../components/shop/ProductCard';
import { getImageUrl } from '../../services/api';

const Home = () => {
  const { addToCart } = useCart();
  const { products, categories, fetchProducts, fetchCategories } = useProducts();
  const { schemes, fetchSchemes } = useSchemes();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSchemes();
  }, [fetchProducts, fetchCategories, fetchSchemes]);

  // Filter only valid, active promotional schemes & coupons
  const now = new Date();
  const activeOffers = (Array.isArray(schemes) ? schemes : []).filter((s) => {
    if (!s || !s.isActive) return false;
    if (s.startDate && new Date(s.startDate) > now) return false;
    if (s.endDate && new Date(s.endDate) < now) return false;
    return true;
  });

  // Auto-advance only if multiple active offers exist
  useEffect(() => {
    if (activeOffers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % activeOffers.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeOffers.length]);

  const currentOffer = activeOffers[currentOfferIndex] || activeOffers[0];

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

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

      {/* --- Offer & Coupon Banner (ONLY displays when active offers/coupons exist) --- */}
      {activeOffers.length > 0 && currentOffer && (
        <section className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-red-200 dark:border-red-900/50 bg-gradient-to-r from-slate-950 via-[#3d0812] to-[#bd1f35] text-white">
          <div className="relative min-h-[140px] sm:min-h-[180px] w-full p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-1.5 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Tag className="h-3 w-3" />
                <span>ACTIVE PROMOTIONAL OFFER</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                {currentOffer.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/85">
                {currentOffer.discountType === 'PERCENTAGE'
                  ? `Get ${currentOffer.discountValue}% OFF on your purchase`
                  : `Get FLAT ₹${currentOffer.discountValue} OFF on your order`}
                {currentOffer.minCartAmount > 0 && ` (Min Cart: ₹${currentOffer.minCartAmount})`}
                {currentOffer.endDate && (
                  <span className="text-amber-300 ml-2">
                    • Valid till {new Date(currentOffer.endDate).toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>

            {/* Coupon Code Pill & Copy Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-2 sm:p-2.5 flex items-center gap-3">
                <div className="text-left pl-2">
                  <span className="block text-[9px] uppercase tracking-wider text-white/70 font-semibold">
                    Coupon Code
                  </span>
                  <span className="text-sm sm:text-base font-black tracking-widest text-amber-300 font-mono">
                    {currentOffer.code}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleCopyCode(currentOffer.code, e)}
                  className="bg-white hover:bg-slate-100 text-[#bd1f35] px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  {copiedCode === currentOffer.code ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
                      <span className="text-emerald-600 font-extrabold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <Link
                to="/shop"
                className="bg-[#bd1f35] hover:bg-[#8a0025] text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Shop Deals</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Controls if multiple active offers exist */}
          {activeOffers.length > 1 && (
            <div className="absolute bottom-2 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10">
              {activeOffers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentOfferIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentOfferIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                  aria-label={`Go to offer ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* --- 1. Shop by Category Grid (Modern High-Density Cards) --- */}
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

      {/* --- 2. Today's Deals & Trending Products Catalog --- */}
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

      {/* --- 3. Dedicated Shelf: Computer Hardware & Storage --- */}
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

      {/* --- 4. Likesszon Business Advantage Banner --- */}
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