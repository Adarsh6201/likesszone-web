import { createSlice } from '@reduxjs/toolkit';

const DARK_MODE_KEY = 'likesszon_dark_mode';

const getInitialDarkMode = () => {
  try {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    if (saved !== null) return JSON.parse(saved);
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDarkMode: getInitialDarkMode(),
    isCartOpen: false,
  },
  reducers: {
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
      // Sync to DOM and localStorage
      try {
        const root = window.document.documentElement;
        if (action.payload) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        localStorage.setItem(DARK_MODE_KEY, JSON.stringify(action.payload));
      } catch {}
    },
    toggleDarkMode(state) {
      const next = !state.isDarkMode;
      state.isDarkMode = next;
      try {
        const root = window.document.documentElement;
        if (next) root.classList.add('dark');
        else root.classList.remove('dark');
        localStorage.setItem(DARK_MODE_KEY, JSON.stringify(next));
      } catch {}
    },
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { setDarkMode, toggleDarkMode, openCart, closeCart, toggleCart } = uiSlice.actions;
export default uiSlice.reducer;
