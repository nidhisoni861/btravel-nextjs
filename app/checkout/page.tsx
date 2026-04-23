'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const inputCls = 'w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none ui-control';

type FormData = { firstName: string; lastName: string; email: string; phone: string; street: string; city: string; postalCode: string; country: string; cardNumber: string; cardName: string; expiryDate: string; cvv: string };
const init: FormData = { firstName: '', lastName: '', email: '', phone: '', street: '', city: '', postalCode: '', country: 'Germany', cardNumber: '', cardName: '', expiryDate: '', cvv: '' };

const paymentMethods = [
  { id: 'paypal', label: 'PayPal', emoji: '💳' },
  { id: 'stripe', label: 'Stripe', emoji: '💰' },
  { id: 'card', label: 'Credit Card', icon: true },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState<FormData>(init);
  const up = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [field]: e.target.value });
  const cartTotal = 14368.83;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('Booking successful! You will receive a confirmation via email.'); router.push('/dokumente'); };

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-4"><Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--champagne)]" /><h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--navy)]">Checkout</h1></div>
          <p className="text-[var(--navy)]/70 text-base sm:text-lg">Secure payment with SSL encryption</p>
        </motion.div>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-12">
            <div className="lg:col-span-2 space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="font-serif text-2xl text-[var(--navy)] mb-6">Select Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {paymentMethods.map((pm) => (
                    <button key={pm.id} type="button" onClick={() => setPaymentMethod(pm.id)}
                      className={`p-6 border-2 transition-all ui-card ${paymentMethod === pm.id ? 'border-[var(--champagne)] bg-[var(--champagne)]/10' : 'border-[var(--sand)] hover:border-[var(--champagne)]'}`}>
                      <div className="text-center">
                        {pm.icon ? <CreditCard className="w-8 h-8 mx-auto mb-2 text-[var(--champagne)]" /> : <div className="text-3xl mb-2">{pm.emoji}</div>}
                        <span className="text-[var(--navy)] font-medium">{pm.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <h2 className="font-serif text-2xl text-[var(--navy)] mb-6">Billing Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div><label className="block text-[var(--navy)] font-medium mb-2">First Name *</label><input type="text" value={formData.firstName} onChange={up('firstName')} className={inputCls} required /></div>
                    <div><label className="block text-[var(--navy)] font-medium mb-2">Last Name *</label><input type="text" value={formData.lastName} onChange={up('lastName')} className={inputCls} required /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div><label className="block text-[var(--navy)] font-medium mb-2">Email *</label><input type="email" value={formData.email} onChange={up('email')} className={inputCls} required /></div>
                    <div><label className="block text-[var(--navy)] font-medium mb-2">Phone *</label><input type="tel" value={formData.phone} onChange={up('phone')} className={inputCls} required /></div>
                  </div>
                  <div><label className="block text-[var(--navy)] font-medium mb-2">Street and Number *</label><input type="text" value={formData.street} onChange={up('street')} className={inputCls} required /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div><label className="block text-[var(--navy)] font-medium mb-2">Postal Code *</label><input type="text" value={formData.postalCode} onChange={up('postalCode')} className={inputCls} required /></div>
                    <div className="md:col-span-2"><label className="block text-[var(--navy)] font-medium mb-2">City *</label><input type="text" value={formData.city} onChange={up('city')} className={inputCls} required /></div>
                  </div>
                  <div><label className="block text-[var(--navy)] font-medium mb-2">Country *</label><input type="text" value={formData.country} onChange={up('country')} className={inputCls} required /></div>
                </div>
              </motion.div>
              {paymentMethod === 'card' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <h2 className="font-serif text-2xl text-[var(--navy)] mb-6">Credit Card Details</h2>
                  <div className="space-y-6">
                    <div><label className="block text-[var(--navy)] font-medium mb-2">Cardholder *</label><input type="text" value={formData.cardName} onChange={up('cardName')} className={inputCls} required /></div>
                    <div><label className="block text-[var(--navy)] font-medium mb-2">Card Number *</label><input type="text" value={formData.cardNumber} onChange={up('cardNumber')} placeholder="1234 5678 9012 3456" className={inputCls} required /></div>
                    <div className="grid grid-cols-2 gap-6">
                      <div><label className="block text-[var(--navy)] font-medium mb-2">Expiry Date *</label><input type="text" value={formData.expiryDate} onChange={up('expiryDate')} placeholder="MM/YY" className={inputCls} required /></div>
                      <div><label className="block text-[var(--navy)] font-medium mb-2">CVV *</label><input type="text" value={formData.cvv} onChange={up('cvv')} placeholder="123" className={inputCls} required /></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1">
              <div className="bg-[var(--sand-light)] border-2 border-[var(--sand)] p-5 sm:p-8 sticky top-32 ui-panel">
                <h2 className="font-serif text-2xl text-[var(--navy)] mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="pb-4 border-b-2 border-[var(--sand)]">
                    <p className="text-sm text-[var(--navy)]/70 mb-2">Mediterranean Cruise × 2</p>
                    <p className="text-sm text-[var(--navy)]/70">Alaska Cruise × 1</p>
                  </div>
                  <div className="flex justify-between text-[var(--navy)]"><span>Subtotal</span><span>€ 11,983.00</span></div>
                  <div className="flex justify-between text-[var(--navy)]"><span>VAT (19%)</span><span>€ 2,385.83</span></div>
                  <div className="border-t-2 border-[var(--sand)] pt-4">
                    <div className="flex justify-between font-serif text-2xl text-[var(--navy)]"><span>Total</span><span>€ {cartTotal.toLocaleString()}</span></div>
                  </div>
                </div>
                <div className="bg-white border-2 border-[var(--champagne)]/30 p-4 mb-6 ui-card">
                  <div className="flex items-start gap-3"><Lock className="w-5 h-5 text-[var(--champagne)] flex-shrink-0 mt-0.5" /><p className="text-sm text-[var(--navy)]/70">Your payment is processed securely via SSL encryption</p></div>
                </div>
                <button type="submit" disabled={!paymentMethod} className={`w-full py-4 text-white text-lg transition-colors ui-control ${paymentMethod ? 'bg-[var(--champagne)] hover:bg-[var(--champagne)]/90' : 'bg-gray-400 cursor-not-allowed'}`}>Pay Now</button>
                <p className="text-xs text-[var(--navy)]/60 text-center mt-4">By submitting you confirm our Terms and Privacy Policy</p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
