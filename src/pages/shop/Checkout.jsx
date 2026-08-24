import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CheckoutSuccess from '../../components/shop/CheckoutSuccess';
import CheckoutForm from '../../components/shop/CheckoutForm';
import CheckoutSidebar from '../../components/shop/CheckoutSidebar';
import AddressSelectModal from '../../components/shop/AddressSelectModal';
import AddAddressBottomModal from '../../components/shop/AddAddressBottomModal';
import { openRazorpayCheckout } from '../../utils/razorpay';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Addresses Management State
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const stored = localStorage.getItem('likesszon_saved_addresses');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Error reading saved addresses:", e);
    }
    return [
      {
        id: 'addr-1',
        name: user?.name || 'Adarsh Kumar',
        phone: user?.phone || '+91 9304264241',
        address: user?.address || 'New Area 1St Gali Okni near Joda shiv temple ward 20',
        city: user?.city || 'Hazaribagh',
        state: user?.state || 'Jharkhand',
        zip: user?.zipCode || '825301',
        type: 'Home'
      },
      {
        id: 'addr-2',
        name: user?.name || 'Adarsh Kumar',
        phone: user?.phone || '+91 9304264241',
        address: 'Tech Park Tower 3, Whitefield Main Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560066',
        type: 'Work'
      }
    ];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => savedAddresses[0]?.id || 'addr-1');

  // Modals Visibility
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync saved addresses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('likesszon_saved_addresses', JSON.stringify(savedAddresses));
    } catch (e) {
      console.error("Error saving addresses:", e);
    }
  }, [savedAddresses]);

  const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

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
    paymentMethod: 'razorpay',
    upiId: ''
  });

  // Keep form data in sync with selected address & user
  useEffect(() => {
    if (selectedAddress) {
      const nameParts = (selectedAddress.name || user?.name || '').split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: prev.email || user?.email || '',
        address: selectedAddress.address,
        city: selectedAddress.city,
        zip: selectedAddress.zip,
      }));
    }
  }, [selectedAddress, user]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [lastOrder, setLastOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSaveNewAddress = (newAddress) => {
    setSavedAddresses(prev => [newAddress, ...prev]);
    setSelectedAddressId(newAddress.id);
  };

  const handleDeleteAddress = (idToDelete) => {
    setSavedAddresses(prev => {
      const updated = prev.filter(a => a.id !== idToDelete);
      if (selectedAddressId === idToDelete && updated.length > 0) {
        setSelectedAddressId(updated[0].id);
      }
      return updated;
    });
  };

  const finalizeOrder = async (payMethodLabel = 'Card', paymentId = null) => {
    const customerName = `${formData.firstName} ${formData.lastName}`.trim() || user?.name || 'Customer';
    const customerEmail = formData.email || user?.email || 'customer@likesszon.com';

    const orderPayload = {
      customerName,
      customerEmail,
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      total: cartTotal,
      paymentMethod: payMethodLabel,
      paymentStatus: 'Paid',
      shippingDetails: {
        address: formData.address,
        city: formData.city,
        zip: formData.zip
      }
    };

    const createdOrder = await addOrder(orderPayload);
    const realOrderId = createdOrder?.id || `ORD-${Date.now()}`;

    setLastOrder({
      ...orderPayload,
      id: realOrderId,
      date: new Date().toISOString()
    });
    setPlacedOrderId(realOrderId);
    setIsSubmitted(true);
    clearCart();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const customerName = `${formData.firstName} ${formData.lastName}`.trim() || user?.name || 'Customer';
    const customerEmail = formData.email || user?.email || 'customer@likesszon.com';
    const phone = selectedAddress?.phone || '+91 9304264241';

    try {
      if (formData.paymentMethod === 'razorpay' || formData.paymentMethod === 'upi') {
        // Attempt to create backend Razorpay order
        let razorpayOrderId = null;
        let keyId = null;

        try {
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
          const response = await fetch(`${apiBaseUrl}/payments/create-razorpay-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: cartTotal, receiptId: `rcpt_${Date.now()}` }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              razorpayOrderId = data.data.razorpayOrderId;
              keyId = data.data.keyId;
            }
          }
        } catch (apiErr) {
          console.warn("Backend payment order endpoint unavailable, launching client checkout:", apiErr);
        }

        // Trigger Razorpay Checkout Modal
        openRazorpayCheckout({
          razorpayOrderId,
          amount: cartTotal,
          keyId,
          customerName,
          customerEmail,
          phone,
          onSuccess: async (payResponse) => {
            try {
              // Attempt to verify payment via backend API
              const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
              await fetch(`${apiBaseUrl}/payments/verify-razorpay-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...payResponse,
                  orderData: {
                    customerName,
                    customerEmail,
                    items: cart.map(item => ({
                      productId: item.id,
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price,
                      image: item.image
                    })),
                    total: cartTotal,
                    shippingDetails: {
                      address: formData.address,
                      city: formData.city,
                      zip: formData.zip
                    }
                  }
                }),
              });
            } catch (verifyErr) {
              console.warn("Verification API offline, finalizing order locally:", verifyErr);
            }

            await finalizeOrder('Razorpay / UPI Online', payResponse.razorpayPaymentId);
            setLoading(false);
          },
          onError: (errMessage) => {
            setErrorMsg(errMessage || 'Razorpay checkout cancelled or failed.');
            setLoading(false);
          }
        });
      } else {
        // Standard Direct Card Checkout
        await finalizeOrder('Credit/Debit Card');
        setLoading(false);
      }
    } catch (err) {
      console.error("Order submission error:", err);
      setErrorMsg(err.message || 'Failed to place order. Please try again.');
      setLoading(false);
    }
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
        order={lastOrder}
        onTrack={() => navigate(`/orders?id=${placedOrderId}`)}
        onGoHome={() => navigate('/')}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Secure Checkout</h1>
        <Link to="/cart" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" />
          Review Cart
        </Link>
      </div>

      {errorMsg && (
        <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center justify-between">
          <span>⚠️ {errorMsg}</span>
          <button onClick={() => setErrorMsg('')} className="text-red-500 hover:underline">Dismiss</button>
        </div>
      )}

      <CheckoutForm 
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        selectedAddress={selectedAddress}
        savedAddresses={savedAddresses}
        onOpenSelectModal={() => setIsSelectModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        loading={loading}
      >
        <CheckoutSidebar 
          cart={cart}
          cartTotal={cartTotal}
          loading={loading}
        />
      </CheckoutForm>

      {/* Address Selection Modal */}
      <AddressSelectModal 
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        addresses={savedAddresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={(addr) => setSelectedAddressId(addr.id)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onDeleteAddress={handleDeleteAddress}
      />

      {/* Add New Address Bottom Sheet Modal */}
      <AddAddressBottomModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveAddress={handleSaveNewAddress}
      />
    </div>
  );
};

export default Checkout;
