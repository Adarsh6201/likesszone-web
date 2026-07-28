import React, { useState, useEffect } from 'react';

const CategoryCreatorForm = ({ categories = [], onAddCategory, onUpdateCategory, initialCategory = null, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Prepopulate form if editing a category
  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name || '');
      setDescription(initialCategory.description || '');
    } else {
      setName('');
      setDescription('');
    }
    setImageFile(null);
  }, [initialCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (initialCategory) {
      onUpdateCategory(initialCategory.id, {
        name: name.trim(),
        description: description.trim(),
        imageFile,
      });
    } else {
      const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Check if duplicate slug
      const exists = categories.find(c => c.slug === slug);
      if (exists) {
        alert('This product type already exists!');
        return;
      }

      onAddCategory({
        name: name.trim(),
        description: description.trim(),
        imageFile
      });
    }
    
    // Reset Form
    setName('');
    setDescription('');
    setImageFile(null);
    onClose();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4 animate-fadeIn"
    >
      <h3 className="text-base font-bold text-slate-950 dark:text-white">
        {initialCategory ? 'Edit Product Type / Category' : 'New Classification Info'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500">Type Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Computer Accessories, Electrical Supplies"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500">
            {initialCategory ? 'New Banner Image File (Optional)' : 'Banner Image File'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500">Description</label>
        <textarea
          rows="3"
          placeholder="Describe what items go into this product category..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
        />
      </div>

      <div className="flex gap-3 justify-end pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none"
        >
          {initialCategory ? 'Save Changes' : 'Save Product Type'}
        </button>
      </div>
    </form>
  );
};

export default CategoryCreatorForm;
