import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import ProductCard from '../../components/shop/ProductCard';
import ProductFiltersSidebar from '../../components/shop/ProductFiltersSidebar';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { products, categories, fetchProducts, fetchCategories } = useProducts();

  const categoryFilter = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    let result = products || [];

    if (categoryFilter !== 'all') {
      const catLower = categoryFilter.toLowerCase();
      result = result.filter(p =>
        (p.category && p.category.toLowerCase() === catLower) ||
        (p.categorySlug && p.categorySlug.toLowerCase() === catLower)
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, sortBy, products]);

  return (
    <div className="w-full max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-6">

        <ProductFiltersSidebar
          categoryFilter={categoryFilter}
          categories={categories}
          onSelectCategory={(slug) => setSearchParams({ category: slug })}
        />

        {/* Products Grid Canvas */}
        <div className="flex-1 space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-xs">
            <div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> products
                {searchQuery && <span> for "{searchQuery}"</span>}
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-slate-500 font-medium shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 outline-none dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs cursor-pointer focus:border-[#bd1f35]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products List Grid (Space-Efficient 4-5 Columns) */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-base font-bold text-slate-800 dark:text-white">No products found</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting your filters or search query.</p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 rounded-xl bg-[#bd1f35] hover:bg-[#8a0025] px-5 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  btnLabel="Add"
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductList;
