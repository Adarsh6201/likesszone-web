import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CheckoutSuccess from '../../components/shop/CheckoutSuccess';
import CheckoutForm from '../../components/shop/CheckoutForm';
import CheckoutSidebar from '../../components/shop/CheckoutSidebar';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: 'card',
    upiId: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">No items to checkout</h2>
        <Link to="/shop" className="inline-block rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      date: new Date().toISOString(),
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: cartTotal,
      status: 'Pending',
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'Paid',
      shippingDetails: {
        address: formData.address,
        city: formData.city,
        zip: formData.zip
      }
    };
    addOrder(newOrder);
    setPlacedOrderId(orderId);
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <CheckoutSuccess 
        placedOrderId={placedOrderId}
        email={formData.email}
        name={`${formData.firstName} ${formData.lastName}`}
        address={formData.address}
        city={formData.city}
        paymentMethod={formData.paymentMethod}
        onTrack={() => navigate(`/orders?id=${placedOrderId}`)}
        onGoHome={() => navigate('/')}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Secure Checkout</h1>
        <Link to="/cart" className="flex items-center gap-1.5 text-sm font-semibold text-slate-505 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" />
          Review Cart
        </Link>
      </div>

      <CheckoutForm 
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <CheckoutSidebar 
          cart={cart}
          cartTotal={cartTotal}
        />
      </CheckoutForm>
    </div>
  );
};

export default Checkout;
