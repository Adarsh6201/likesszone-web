import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import schemeReducer from './slices/schemeSlice';
import dashboardReducer from './slices/dashboardSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    schemes: schemeReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
