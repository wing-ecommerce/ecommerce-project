'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';
import ContactInformation from '@/components/checkout/ContactInformation';
import SavedAddresses from '@/components/checkout/SavedAddresses';
import NewAddressForm from '@/components/checkout/NewAddressForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentModal from '@/components/checkout/PaymentModal';
import EmptyCart from '@/components/checkout/EmptyCart';

interface Address {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, getSubtotal, getTax, getTotal } = useCartStore();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    address: '',
    city: '',
  });

  const [newAddressForm, setNewAddressForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    isDefault: false,
  });

  const shipping = 5.00;
  const subtotal = getSubtotal();
  const tax = getTax();
  const total = subtotal + shipping + tax;

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Fetch user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch('/api/user/addresses');
        if (response.ok) {
          const data = await response.json();
          setAddresses(data);

          const defaultAddress = data.find((addr: Address) => addr.isDefault);
          const addressToSelect = defaultAddress || data[0];

          if (addressToSelect) {
            setSelectedAddressId(addressToSelect.id);
            setFormData({
              email: addressToSelect.email,
              phone: addressToSelect.phone,
              fullName: addressToSelect.fullName,
              address: addressToSelect.address,
              city: addressToSelect.city,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, [session]);

  // Prefill form with user data if no addresses
  useEffect(() => {
    if (session?.user && addresses.length === 0 && !isLoadingAddresses) {
      setFormData({
        email: session.user.email || '',
        phone: '',
        fullName: `${session.user.firstName || ''} ${session.user.lastName || ''}`.trim(),
        address: '',
        city: '',
      });
      setNewAddressForm({
        fullName: `${session.user.firstName || ''} ${session.user.lastName || ''}`.trim(),
        email: session.user.email || '',
        phone: '',
        address: '',
        city: '',
        isDefault: true,
      });
    }
  }, [session, addresses, isLoadingAddresses]);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      setFormData({
        email: selectedAddress.email,
        phone: selectedAddress.phone,
        fullName: selectedAddress.fullName,
        address: selectedAddress.address,
        city: selectedAddress.city,
      });
    }
    setShowNewAddressForm(false);
  };

  const handleNewAddressInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewAddressForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setNewAddressForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveNewAddress = async () => {
    try {
      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddressForm),
      });

      if (response.ok) {
        const newAddress = await response.json();
        setAddresses([...addresses, newAddress]);
        setSelectedAddressId(newAddress.id);
        setFormData({
          email: newAddress.email,
          phone: newAddress.phone,
          fullName: newAddress.fullName,
          address: newAddress.address,
          city: newAddress.city,
        });
        setShowNewAddressForm(false);
        alert('Address saved successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  const handlePayNow = () => {
    if (!formData.fullName || !formData.address || !formData.city || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    console.log('Proceeding to payment:', formData);
    setShowPayment(true);
  };

  // Loading state
  if (status === 'loading' || isLoadingAddresses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return null;
  }

  // Empty cart
  if (items.length === 0) {
    return <EmptyCart />;
  }

  // Payment view
  if (showPayment) {
    return <PaymentModal total={total} onBack={() => setShowPayment(false)} />;
  }

  // Main checkout view
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <ContactInformation email={formData.email} />

            {/* Saved Addresses */}
            <SavedAddresses
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onAddressSelect={handleAddressSelect}
              onAddNewAddress={() => setShowNewAddressForm(true)}
            />

            {/* New Address Form */}
            {(showNewAddressForm || addresses.length === 0) && (
              <NewAddressForm
                formData={newAddressForm}
                onChange={handleNewAddressInputChange}
                onSave={handleSaveNewAddress}
                hasExistingAddresses={addresses.length > 0}
              />
            )}

            {/* Mobile Pay Button */}
            <button
              onClick={handlePayNow}
              className="lg:hidden w-full py-4 bg-green-500 text-white font-bold text-lg rounded-full hover:bg-green-600 transition-all shadow-lg"
            >
              Pay Now - ${total.toFixed(2)}
            </button>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={handlePayNow}
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}