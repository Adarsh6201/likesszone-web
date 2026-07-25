import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ProductBreadcrumbs = ({ product }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 capitalize">
      <Link to="/" className="hover:text-indigo-600">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to={`/shop?category=${product.category}`} className="hover:text-indigo-600">
        {product.category.replace('-', ' ')}
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span className="truncate text-slate-800 dark:text-slate-200 font-semibold">{product.name}</span>
    </nav>
  );
};

export default ProductBreadcrumbs;
