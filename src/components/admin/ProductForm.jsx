import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, ListPlus, UploadCloud, Sparkles } from 'lucide-react';

const ProductForm = ({ categories = [], initialProduct = null, onSubmit, submitLabel = 'Submit', cancelUrl = '/admin/products' }) => {
  // Form States
  const [name, setName] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [featuresList, setFeaturesList] = useState(['']);

  // Prepopulate form fields once product is loaded
  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name || '');
      setOriginalPrice(initialProduct.originalPrice !== undefined ? initialProduct.originalPrice.toString() : (initialProduct.price || '').toString());
      setPrice(initialProduct.price !== undefined ? initialProduct.price.toString() : '');
      setStock(initialProduct.stock !== undefined ? initialProduct.stock.toString() : '');
      setCategory(initialProduct.category || categories?.[0]?.slug || 'computer-accessories-and-components');
      setDescription(initialProduct.description || '');
      setFeatured(!!initialProduct.featured);
      setImagesList(initialProduct.images || (initialProduct.image ? [initialProduct.image] : []));
      setFeaturesList(initialProduct.features && initialProduct.features.length > 0 ? initialProduct.features : ['']);
    } else {
      setCategory(categories?.[0]?.slug || 'computer-accessories-and-components');
      setFeatured(false);
    }
  }, [initialProduct, categories]);

  // Auto calculate discount metrics
  const mrpVal = parseFloat(originalPrice) || 0;
  const sellVal = parseFloat(price) || 0;
  const discountAmount = mrpVal > sellVal ? mrpVal - sellVal : 0;
  const discountPercent = mrpVal > 0 ? Math.round((discountAmount / mrpVal) * 100) : 0;

  // Local File Upload Handler
  const handleLocalImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesList((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImagesList((prev) => prev.filter((_, i) => i !== index));
  };

  // Feature helpers
  const handleAddFeatureInput = () => {
    setFeaturesList((prev) => [...prev, '']);
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...featuresList];
    updated[index] = value;
    setFeaturesList(updated);
  };

  const handleRemoveFeatureInput = (index) => {
    if (featuresList.length === 1) {
      setFeaturesList(['']);
      return;
    }
    setFeaturesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Filter out empty features
    const cleanedFeatures = featuresList.map((feat) => feat.trim()).filter(Boolean);

    // Fallback if no images are present
    const defaultImage = imagesList[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

    const productPayload = {
      name: name.trim(),
      originalPrice: mrpVal || sellVal,
      price: sellVal,
      description: description.trim() || 'No description provided.',
      category,
      image: defaultImage,
      images: imagesList.length > 0 ? imagesList : [defaultImage],
      features: cleanedFeatures,
      stock: parseInt(stock) || 0,
      featured,
    };

    onSubmit(productPayload);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      
      {/* Core Product Info card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          1. Core Details
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500">Product Title / Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Likesszon RGB Mechanical Keyboard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          {/* Actual Price MRP */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Actual Price / MRP (₹)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="MRP ₹0.00"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            />
          </div>

          {/* Selling Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Selling Price (₹)</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="Sell ₹0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Stock Quantity</label>
            <input
              type="number"
              required
              placeholder="e.g. 50"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Product Type Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Auto calculated Discount preview */}
        {discountPercent > 0 && (
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 p-3.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold animate-fadeIn">
            ✓ Auto Discount Applied: {discountPercent}% off (₹{discountAmount.toFixed(2)} off MRP)
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500">Full Description</label>
          <textarea
            rows="4"
            placeholder="Provide a general summary detailing the model, usage, and dimensions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
          />
          <label htmlFor="featured" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Mark as Featured Exclusive Product (Displays in "Featured Exclusives" section on Home Page)
          </label>
        </div>
      </div>

      {/* Local Device Images Upload */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4 text-indigo-500" />
          2. Product Image Gallery (Upload from Local Device)
        </h3>

        <div className="space-y-4">
          
          {/* Drag & Drop Local Upload box */}
          <div className="flex justify-center items-center w-full">
            <label 
              htmlFor="local-image-file" 
              className="flex flex-col justify-center items-center w-full h-32 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800/80 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer transition-colors"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6 text-center px-4">
                <UploadCloud className="h-8 w-8 text-indigo-500 mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-350">Click to upload new images from local device</p>
                <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP (Multiple images allowed)</p>
              </div>
              <input 
                id="local-image-file" 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleLocalImageUpload}
                className="hidden" 
              />
            </label>
          </div>

          {/* Grid display of uploaded images previews */}
          {imagesList.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">Gallery Previews ({imagesList.length})</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {imagesList.map((imgData, idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-square border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden group bg-slate-50 flex items-center justify-center p-1"
                  >
                    <img src={imgData} alt="" className="w-full h-full object-contain" />
                    <div className="absolute top-1 left-1 bg-slate-900/70 text-[9px] text-white px-1.5 py-0.5 rounded-full font-mono font-bold">
                      {idx === 0 ? 'Cover' : `#${idx + 1}`}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-650 hover:bg-red-750 text-white rounded-lg shadow-sm"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Feature bullets details */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ListPlus className="h-4 w-4 text-indigo-500" />
            3. Bullet Features ("About this item")
          </h3>
          <button
            type="button"
            onClick={handleAddFeatureInput}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Feature Box
          </button>
        </div>

        <div className="space-y-3">
          {featuresList.map((feat, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <span className="text-xs font-bold text-slate-400 w-6">#{idx + 1}</span>
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="e.g. Backlit RGB double-shot keys"
                  value={feat}
                  onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                />
              </div>
              
              <button
                type="button"
                onClick={() => handleRemoveFeatureInput(idx)}
                className="p-2.5 rounded-xl border border-slate-200 hover:text-red-500 dark:border-slate-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3">
        <Link
          to={cancelUrl}
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-850"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none"
        >
          {submitLabel}
        </button>
      </div>

    </form>
  );
};

export default ProductForm;
