'use client'

import { useState } from 'react';
import { Header, Footer } from '@/components';
import { useCart } from '@/contexts/CartContext';
import { navigationItems, footerSections } from '@/data';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState({
    type: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentMethod((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted', { shippingAddress, paymentMethod, items });
  };

  const shippingCost = 10.0;
  const taxRate = 0.08;
  const subtotal = totalPrice;
  const taxes = subtotal * taxRate;
  const total = subtotal + shippingCost + taxes;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navigationItems={navigationItems} />

      {/* Breadcrumbs */}
      <div className="px-6 py-4 lg:px-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="px-6 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading mb-8 text-white">CHECKOUT</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Billing & Shipping Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-heading mb-4 text-white">Billing & Shipping Information</h2>
                <div className="space-y-4">
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={shippingAddress.firstName}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={shippingAddress.lastName}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="address"
                    type="text"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="state"
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="zipCode"
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-8">
                <h2 className="text-xl font-heading mb-4 text-white">Payment Information</h2>
                <div className="space-y-4">
                  <select
                    className="w-full p-4 bg-gray-800 border border-gray-700 text-white"
                    name="type"
                    value={paymentMethod.type}
                    onChange={handlePaymentChange}
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="apple-pay">Apple Pay</option>
                  </select>
                  {paymentMethod.type !== 'paypal' && paymentMethod.type !== 'apple-pay' && (
                    <>
                      <input
                        className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                        name="cardNumber"
                        type="text"
                        placeholder="Card Number"
                        value={paymentMethod.cardNumber}
                        onChange={handlePaymentChange}
                        required
                      />
                      <input
                        className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                        name="expiryDate"
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        value={paymentMethod.expiryDate}
                        onChange={handlePaymentChange}
                        required
                      />
                      <input
                        className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                        name="cvv"
                        type="text"
                        placeholder="CVV"
                        value={paymentMethod.cvv}
                        onChange={handlePaymentChange}
                        required
                      />
                      <input
                        className="w-full p-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                        name="cardholderName"
                        type="text"
                        placeholder="Cardholder Name"
                        value={paymentMethod.cardholderName}
                        onChange={handlePaymentChange}
                        required
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gray-900 border border-gray-800 p-6 sticky top-6">
                <h2 className="text-xl font-heading text-white mb-6">Order Summary</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="text-white font-medium">
                        ${(parseFloat(item.product.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 mt-4 pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full bg-red-500 text-white py-3 font-medium hover:bg-red-600 transition-colors"
                >
                  CONFIRM ORDER
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer footerSections={footerSections} />
    </div>
  );
}

