import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, ListPlus, UploadCloud, Sparkles, ChevronLeft, ChevronRight, Star, Link as LinkIcon, Play, Video } from 'lucide-react';
import { getYouTubeEmbedUrl, getYouTubeVideoId, YoutubeIcon } from '../../utils/youtube';

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
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [featuresList, setFeaturesList] = useState(['']);
  const [isDragging, setIsDragging] = useState(false);

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
      setVideoUrl(initialProduct.videoUrl || '');

      // Parse images list safely
      let initialImgs = [];
      if (Array.isArray(initialProduct.images)) {
        initialImgs = initialProduct.images;
      } else if (typeof initialProduct.images === 'string') {
        try {
          const parsed = JSON.parse(initialProduct.images);
          if (Array.isArray(parsed)) initialImgs = parsed;
        } catch {
          if (initialProduct.images) initialImgs = [initialProduct.images];
        }
      }
      if (initialImgs.length === 0 && initialProduct.image) {
        initialImgs = [initialProduct.image];
      }
      setImagesList(initialImgs);

      setFeaturesList(initialProduct.features && initialProduct.features.length > 0 ? initialProduct.features : ['']);
    } else {
      setCategory(categories?.[0]?.slug || 'computer-accessories-and-components');
      setFeatured(false);
      setVideoUrl('');
    }
  }, [initialProduct, categories]);

  // Auto calculate discount metrics
  const mrpVal = parseFloat(originalPrice) || 0;
  const sellVal = parseFloat(price) || 0;
  const discountAmount = mrpVal > sellVal ? mrpVal - sellVal : 0;
  const discountPercent = mrpVal > 0 ? Math.round((discountAmount / mrpVal) * 100) : 0;

  // Process files (Drag & Drop or File Selector)
  const processFiles = (files) => {
    const validImageFiles = files.filter(file => file.type.startsWith('image/'));
    if (validImageFiles.length === 0) return;

    validImageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagesList((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLocalImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    processFiles(files);
  };

  const handleAddImageUrl = (e) => {
    e.preventDefault();
    const url = imageUrlInput.trim();
    if (!url) return;
    setImagesList((prev) => [...prev, url]);
    setImageUrlInput('');
  };

  const handleSetCoverImage = (index) => {
    if (index === 0) return;
    setImagesList((prev) => {
      const updated = [...prev];
      const [selected] = updated.splice(index, 1);
      return [selected, ...updated];
    });
  };

  const handleMoveImage = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= imagesList.length) return;
    setImagesList((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[newIndex];
      updated[newIndex] = temp;
      return updated;
    });
  };

  const handleRemoveImage = (index) => {
    setImagesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllImages = () => {
    if (window.confirm('Are you sure you want to clear all images from the gallery?')) {
      setImagesList([]);
    }
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
      videoUrl: videoUrl.trim() || '',
    };

    onSubmit(productPayload);
  };

  const youtubeVideoId = getYouTubeVideoId(videoUrl);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);

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

      {/* Product Images Gallery (Unlimited Multi-Upload) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-indigo-500" />
            2. Product Image Gallery (Upload Any Number of Images)
          </h3>
          {imagesList.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllImages}
              className="text-[11px] font-semibold text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="h-3 w-3" /> Clear All ({imagesList.length})
            </button>
          )}
        </div>

        <div className="space-y-4">
          
          {/* Drag & Drop Local Upload box */}
          <div className="flex justify-center items-center w-full">
            <label 
              htmlFor="local-image-file" 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col justify-center items-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' 
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex flex-col justify-center items-center pt-4 pb-4 text-center px-4">
                <UploadCloud className={`h-9 w-9 mb-2 transition-transform ${isDragging ? 'scale-110 text-indigo-600' : 'text-indigo-500'}`} />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {isDragging ? 'Drop images here now' : 'Click or Drag & Drop images to upload'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Supports PNG, JPG, JPEG, WEBP • Upload 5, 10, 20 or any number of images
                </p>
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

          {/* Add image via URL input */}
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="url"
                placeholder="Or paste image web URL (e.g. https://images.unsplash.com/...)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddImageUrl(e)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors shrink-0 cursor-pointer"
            >
              Add URL
            </button>
          </div>

          {/* Grid display of uploaded images previews */}
          {imagesList.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-500">
                  Gallery Images ({imagesList.length}) - <span className="text-indigo-600 dark:text-indigo-400 font-bold">Image #1 is Main Cover</span>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {imagesList.map((imgData, idx) => (
                  <div 
                    key={idx} 
                    className={`relative aspect-square border rounded-xl overflow-hidden group bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-1 transition-all ${
                      idx === 0 
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <img src={imgData} alt="" className="w-full h-full object-contain" />
                    
                    {/* Badge */}
                    <div className={`absolute top-1 left-1 text-[9px] text-white px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-0.5 shadow-sm ${
                      idx === 0 ? 'bg-indigo-600' : 'bg-slate-900/80'
                    }`}>
                      {idx === 0 ? (
                        <>
                          <Star className="h-2.5 w-2.5 fill-current" /> Cover
                        </>
                      ) : (
                        `#${idx + 1}`
                      )}
                    </div>

                    {/* Action overlay controls */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                      
                      <div className="flex justify-between items-center w-full">
                        {idx !== 0 ? (
                          <button
                            type="button"
                            onClick={() => handleSetCoverImage(idx)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm cursor-pointer"
                            title="Set as Main Cover Image"
                          >
                            Set Cover
                          </button>
                        ) : (
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                            Primary
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm cursor-pointer"
                          title="Remove image"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Reorder Left/Right buttons */}
                      <div className="flex justify-between items-center w-full">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveImage(idx, -1)}
                          className={`p-1 rounded bg-slate-800 text-white shadow-sm ${idx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700 cursor-pointer'}`}
                          title="Move Left"
                        >
                          <ChevronLeft className="h-3 w-3" />
                        </button>

                        <button
                          type="button"
                          disabled={idx === imagesList.length - 1}
                          onClick={() => handleMoveImage(idx, 1)}
                          className={`p-1 rounded bg-slate-800 text-white shadow-sm ${idx === imagesList.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700 cursor-pointer'}`}
                          title="Move Right"
                        >
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* YouTube Video Link & Live Preview Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
          <YoutubeIcon className="h-5 w-5" />
          3. Product Video (YouTube Video Link to Play)
        </h3>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">YouTube Video URL</label>
            <div className="relative">
              <YoutubeIcon className="absolute left-3 top-2.5 h-4 w-4" />
              <input
                type="url"
                placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-red-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Paste any YouTube video or Shorts URL. Customers will be able to play this video inline in the product gallery!
            </p>
          </div>

          {/* Live Embedded YouTube Preview */}
          {youtubeVideoId ? (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Play className="h-3.5 w-3.5 fill-red-600 text-red-600" /> Live YouTube Video Preview
              </label>
              <div className="aspect-video w-full max-w-md rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-sm">
                <iframe
                  src={youtubeEmbedUrl}
                  title="YouTube video player preview"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : videoUrl.trim() ? (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 p-3 text-xs text-amber-700 dark:text-amber-400">
              ⚠️ Please check the YouTube link format. Valid example: <code className="font-mono text-indigo-600">https://www.youtube.com/watch?v=dQw4w9WgXcQ</code>
            </div>
          ) : null}
        </div>
      </div>

      {/* Feature bullets details */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ListPlus className="h-4 w-4 text-indigo-500" />
            4. Bullet Features ("About this item")
          </h3>
          <button
            type="button"
            onClick={handleAddFeatureInput}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
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
                className="p-2.5 rounded-xl border border-slate-200 hover:text-red-500 dark:border-slate-800 cursor-pointer"
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
          className="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
        >
          {submitLabel}
        </button>
      </div>

    </form>
  );
};

export default ProductForm;
