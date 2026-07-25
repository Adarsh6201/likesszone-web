import React from 'react';

const QuickLoginPanel = ({ onQuickLogin }) => {
  return (
    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-2">
      <p className="text-[10px] font-bold text-slate-505 uppercase tracking-wider text-center">Developer Quick Login</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onQuickLogin('admin@likesszon.com', 'admin123')}
          className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-850 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Admin Account</span>
          <span className="text-[9px] text-slate-400">admin@likesszon.com</span>
        </button>
        <button
          onClick={() => onQuickLogin('user@likesszon.com', 'user123')}
          className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-850 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Customer Account</span>
          <span className="text-[9px] text-slate-400">user@likesszon.com</span>
        </button>
      </div>
    </div>
  );
};

export default QuickLoginPanel;
export { QuickLoginPanel };
