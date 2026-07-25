import React from 'react';
import { Link } from 'react-router-dom';

const HomeHeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80" 
          alt="" 
          className="w-full h-full object-cover opacity-25 dark:opacity-20"
        />
      </div>
      {/* Gradient overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/70 to-indigo-950/40 z-0"></div>
      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:px-8 lg:py-32 flex flex-col items-center text-center z-10">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/20 mb-4 animate-bounce">
          SUMMER SALE CODES AVAILABLE
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-3xl leading-tight">
          Premium Electronics. <span className="bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">Smart Gear.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-xl">
          Discover a handpicked selection of high-performance computer accessories, smart electrical gadgets, professional cameras, and unique lifestyle products.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            to="/shop"
            className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-transform active:scale-95"
          >
            Shop Collection
          </Link>
          <a
            href="#categories"
            className="rounded-xl border border-slate-700 bg-slate-800/40 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Browse Categories
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroBanner;
