import React from 'react';

const QuickLoginPanel = ({ onQuickLogin }) => {
  return (
    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-2">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Quick One-Click Login</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onQuickLogin('admin@likesszon.com', 'Admin@123')}
          className="flex flex-col items-center justify-center p-2 rounded-xl border border-indigo-200 bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-800/40 text-left hover:bg-indigo-100/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">👑 Admin Account</span>
          <span className="text-[10px] text-slate-500">admin@likesszon.com</span>
          <span className="text-[9px] font-mono text-indigo-700 dark:text-indigo-300">Pass: Admin@123</span>
        </button>
        <button
          type="button"
          onClick={() => onQuickLogin('user@likesszon.com', 'user123')}
          className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">👤 Customer Account</span>
          <span className="text-[10px] text-slate-500">user@likesszon.com</span>
          <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400">Pass: user123</span>
        </button>
      </div>
    </div>
  );
};

export default QuickLoginPanel;
export { QuickLoginPanel };
