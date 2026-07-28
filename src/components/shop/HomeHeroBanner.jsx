import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSchemes } from '../../hooks/useSchemes';
import { Tag, Sparkles, Copy, Check } from 'lucide-react';

const HomeHeroBanner = () => {
  const { schemes, fetchSchemes } = useSchemes();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  // Find active scheme with a poster image, or fallback to any active scheme
  const activePosterScheme = schemes.find((s) => s.isActive && s.bannerImage) || schemes.find((s) => s.isActive);

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bannerImg = activePosterScheme?.bannerImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80";

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 border border-slate-800/80 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={bannerImg} 
          alt={activePosterScheme?.title || "Hero Banner"} 
          className="w-full h-full object-cover opacity-35 transition-all duration-700 hover:scale-105"
        />
      </div>
      {/* Gradient overlay for high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-indigo-950/50 z-0"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-20 sm:px-8 lg:py-28 flex flex-col items-center text-center z-10">
        
        {/* Dynamic Scheme Badge */}
        {activePosterScheme && (
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/30 mb-6 shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span>{activePosterScheme.title}</span>
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {activePosterScheme.discountType === 'PERCENTAGE' 
                ? `${activePosterScheme.discountValue}% OFF` 
                : `₹${activePosterScheme.discountValue} OFF`}
            </span>
          </div>
        )}

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-3xl leading-tight">
          {activePosterScheme ? activePosterScheme.title : (
            <>
              Premium Electronics. <span className="bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">Smart Gear.</span>
            </>
          )}
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
          {activePosterScheme ? (
            <span>
              Use coupon code <strong className="text-amber-400 font-mono text-lg">{activePosterScheme.code}</strong> at checkout to claim your offer!
            </span>
          ) : (
            'Discover a handpicked selection of high-performance computer accessories, smart electrical gadgets, professional cameras, and unique lifestyle products.'
          )}
        </p>

        {/* Promo Code Copy Pill */}
        {activePosterScheme && (
          <div className="mt-6 inline-flex items-center gap-3 bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-2.5 px-4 shadow-xl backdrop-blur-md">
            <Tag className="h-4 w-4 text-indigo-400" />
            <span className="text-xs text-slate-400">Coupon Code:</span>
            <span className="font-mono font-bold text-amber-300 tracking-wider text-sm">{activePosterScheme.code}</span>
            <button
              onClick={() => handleCopyCode(activePosterScheme.code)}
              className="ml-2 flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all active:scale-95 shadow-md"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 transition-transform active:scale-95"
          >
            Shop Collection
          </Link>
          <a
            href="#categories"
            className="rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Browse Categories
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroBanner;
