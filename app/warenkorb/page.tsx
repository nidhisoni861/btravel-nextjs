'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

interface CartItem { id: number; title: string; destination: string; duration: string; price: number; image: string; quantity: number; }

const initialItems: CartItem[] = [
  { id: 1, title: 'Mediterranean Cruise: 7 Days Luxury', destination: 'Barcelona → Venice', duration: '7 Days / 6 Nights', price: 3299, image: 'https://images.unsplash.com/photo-1722914873924-cf64eafb6175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', quantity: 2 },
  { id: 2, title: 'Alaska Cruise: Glaciers & Wilderness', destination: 'Vancouver → Seward', duration: '7 Days / 6 Nights', price: 5385, image: 'https://images.unsplash.com/photo-1605978221138-0be1cae9204b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', quantity: 1 },
];

export default function WarenkorbPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const updateQuantity = (id: number, delta: number) => setCartItems((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeItem = (id: number) => setCartItems((items) => items.filter((item) => item.id !== id));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.19;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-[var(--sand)]" />
          <h2 className="font-serif text-3xl text-[var(--navy)] mb-4">Your cart is empty</h2>
          <p className="text-[var(--navy)]/70 mb-8">Discover our exclusive travel offers</p>
          <Link href="/kreuzfahrten" className="inline-block px-8 py-4 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors">Explore Cruises</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--champagne)]" />
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--navy)]">Cart</h1>
          </div>
          <p className="text-[var(--navy)]/70 text-base sm:text-lg">{cartItems.length} {cartItems.length === 1 ? 'trip' : 'trips'} in your cart</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border-2 border-[var(--sand)] p-4 sm:p-6 hover:border-[var(--champagne)] transition-all">
                <img src={item.image} alt={item.title} className="w-full sm:w-48 h-48 sm:h-32 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg sm:text-xl text-[var(--navy)] mb-2">{item.title}</h3>
                  <p className="text-[var(--navy)]/70 text-sm mb-1">{item.destination}</p>
                  <p className="text-[var(--navy)]/70 text-sm mb-4">{item.duration}</p>
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <div className="flex items-center gap-3 border-2 border-[var(--sand)]">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-[var(--sand)] transition-colors"><Minus className="w-4 h-4 text-[var(--navy)]" /></button>
                      <span className="text-[var(--navy)] font-medium min-w-[2rem] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-[var(--sand)] transition-colors"><Plus className="w-4 h-4 text-[var(--navy)]" /></button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="sm:hidden text-right">
                        <p className="font-serif text-xl text-[var(--navy)]">€ {(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-xs text-[var(--navy)]/60">€ {item.price.toLocaleString()} × {item.quantity}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block text-right flex-shrink-0">
                  <p className="font-serif text-2xl text-[var(--navy)]">€ {(item.price * item.quantity).toLocaleString()}</p>
                  <p className="text-sm text-[var(--navy)]/60">€ {item.price.toLocaleString()} × {item.quantity}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1">
            <div className="bg-[var(--sand-light)] border-2 border-[var(--sand)] p-5 sm:p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-[var(--navy)] mb-6">Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[var(--navy)]"><span>Subtotal</span><span>€ {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-[var(--navy)]"><span>VAT (19%)</span><span>€ {tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                <div className="border-t-2 border-[var(--sand)] pt-4">
                  <div className="flex justify-between font-serif text-2xl text-[var(--navy)]"><span>Total</span><span>€ {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                </div>
              </div>
              <Link href="/checkout" className="block w-full py-4 bg-[var(--champagne)] text-white text-center text-lg hover:bg-[var(--champagne)]/90 transition-colors mb-4">Proceed to Checkout</Link>
              <Link href="/kreuzfahrten" className="block w-full py-4 border-2 border-[var(--sand)] text-[var(--navy)] text-center hover:border-[var(--champagne)] transition-colors">Continue Shopping</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
