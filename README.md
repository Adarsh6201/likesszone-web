# ✨ Likesszon — Modern E-Commerce Storefront & Admin Dashboard

Likesszon is a full-featured, responsive, and performance-oriented e-commerce web application built on the modern web stack. It provides a premium client-side shopping experience alongside a robust administrator management panel, supported by a React 19 architecture with global state management via the Context API, routing protection, dynamic filtering, persistent checkout, and global dark mode.

---

## 🚀 Quick Login Credentials

For testing and demonstration purposes, the application includes pre-configured mock credentials:

| Role | Email | Password | Features Accessible |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@likesszon.com` | `admin123` | Full access to Admin Panel, Dashboard Stats, Product Catalog Management, Order Tracking and updates. |
| **Customer** | `user@likesszon.com` | `user123` | Standard Storefront, Cart, Checkout, Settings profile, Order History. |
| **Guest / Anonymous** | *None* | *None* | Browse catalog, view product details, add items to cart. Prompted to login during checkout. |

---

## 🛠️ Technology Stack & Architecture

- **Core Framework:** React 19 (Functional Components, Hooks)
- **Bundler & Dev Server:** Vite 8 (Ultra-fast Hot Module Replacement)
- **Styling & Theming:** Tailwind CSS v4 (Utilizing the new `@tailwindcss/vite` compiler plugin with a custom maroon/crimson theme)
- **Routing:** React Router DOM v7 (Modular layouts, Route guards)
- **Icons:** Lucide React (Clean, vector-based SVG graphics)
- **Linting & Code Quality:** Oxlint (Next-generation JavaScript linter)
- **State Management:**
  - `AuthContext`: Manages sign-in sessions, roles, quick login, and global light/dark mode theme preference.
  - `ProductContext`: Centralizes categories, catalog inventory, order processing, and administrative modifications.
  - `CartContext`: Controls item aggregation, subtotal/tax calculations, and side-drawers.
  - **Persistence:** LocalStorage integration ensures authentication, active shopping cart, and mock orders survive browser reloads.

---

## 🌟 Key Features

### 🛍️ Client Storefront
- **Dynamic Product Filtering:** Category-based navigation, sliding price ranges, instant search, sorting (low-to-high, high-to-low, popular, top rated), and featured badges.
- **Product Details & Gallery:** Multi-image carousel-like galleries, detail descriptions, specifications list, interactive rating breakdown, inventory status checks, and direct cart actions.
- **Interactive Cart Drawer:** Side-sliding cart drawer containing quantity adjustment counters, item removals, and real-time calculations.
- **Streamlined Checkout:** Custom validation billing forms, summary list, simulated payment gateways, and invoice receipts.
- **Order History & Real-Time Tracking:** User-centric order list with search filters. Click to open full progress timelines (Pending ➡️ Processing ➡️ Shipped ➡️ Delivered).
- **Settings & Profile Panel:** Real-time form updates for avatar previews, custom usernames, emails, passwords, and dark mode toggles.

### 🛡️ Admin Management Panel
- **Dashboard Overview:** Analytical overview statistics displaying Total Revenue, Number of Sales, Active Products, and Category Counts, plus custom transaction listings.
- **Product Catalog Manager:** Complete CRUD interface to list, edit, or create new products with customizable feature points, image arrays, prices, and stock inventory.
- **Order Manager:** View every customer order, verify payment status (Paid/Unpaid), and update logistics stage status.
- **Product Type Manager:** Interactive layout to introduce new categories into the store, complete with custom image covers and descriptions.

---

## 📂 Project Structure

```
likesszone-web/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Global media files & static assets
│   ├── components/
│   │   ├── admin/          # Admin UI components (StatsGrid, Tables, Forms, etc.)
│   │   ├── atoms/          # Reusable atomic elements (Button component)
│   │   ├── auth/           # Login/Registration forms
│   │   ├── guard/          # Route protection guards (AdminRoute)
│   │   ├── layout/         # Base layout templates (StoreLayout, AdminLayout)
│   │   └── shop/           # Shop specific features (Checkout, Filters, Galleries, etc.)
│   ├── context/            # Global React Context providers (Auth, Cart, Products)
│   ├── data/               # High-fidelity mock datasets (mockData.js)
│   ├── pages/
│   │   ├── admin/          # Admin dashboards and management pages
│   │   ├── auth/           # Standalone Login and Registration pages
│   │   └── shop/           # Customer pages (Home, ProductDetail, MyOrders, Settings, etc.)
│   ├── App.css             # Component custom styles
│   ├── App.jsx             # React Application routing & global contexts config
│   ├── index.css           # Custom theme parameters and Tailwind CSS directives
│   └── main.jsx            # Application entry mount point
├── .oxlintrc.json          # Oxlint static code analyzer config
├── index.html              # HTML shell template
├── package.json            # Scripts, metadata, and dependencies declaration
├── vite.config.js          # Vite config using React & Tailwind plugins
└── README.md               # Project documentation
```

---

## ⚙️ Setup and Installation

Follow these steps to run the project locally on your machine:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd likesszone-web
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the address shown in your console).

4. **Build for Production:**
   ```bash
   npm run build
   ```
   This will output optimized assets into the `dist` folder.

5. **Run the Linter (Oxlint):**
   ```bash
   npm run lint
   ```
   Ensures that clean formatting and structural standards are followed across the codebase.
