import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, FileText, RefreshCw, Truck, ChevronRight } from 'lucide-react';
import PolicyContents from '../../components/shop/PolicyContents';

const Policies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'terms';
  const [activeTab, setActiveTab] = useState(tabParam);

  // Sync tab with URL query parameter
  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  const tabs = [
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'returns', label: 'Return & Refund Policy', icon: RefreshCw },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'shipping', label: 'Shipping & Payment Policy', icon: Truck },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb path */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-505 capitalize">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Store Policies</span>
      </nav>

      {/* Tabs navigation panel */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Sidebar Tabs triggers */}
        <div className="lg:w-1/4 shrink-0 space-y-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Store Info</h2>
            <div className="flex flex-col gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-left transition-all ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Tab content detail view */}
        <div className="flex-grow bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm min-h-[500px]">
          <PolicyContents activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Policies;
