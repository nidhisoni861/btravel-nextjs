'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, User, MapPin, Lock } from 'lucide-react';

const inputCls = 'w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none ui-control';
type FormData = { firstName: string; lastName: string; email: string; phone: string; street: string; city: string; postalCode: string; password: string; confirmPassword: string; newsletter: boolean; terms: boolean };
const init: FormData = { firstName: '', lastName: '', email: '', phone: '', street: '', city: '', postalCode: '', password: '', confirmPassword: '', newsletter: false, terms: false };

const socialReg = [
  { label: 'Google', cls: 'hover:border-[var(--champagne)]', fn: () => alert('Google Registration (Demo)'), icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
  { label: 'LinkedIn', cls: 'hover:border-[#0A66C2]', fn: () => alert('LinkedIn Registration (Demo)'), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Apple', cls: 'hover:border-black', fn: () => alert('Apple Registration (Demo)'), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> },
  { label: 'Facebook', cls: 'hover:border-[#1877F2]', fn: () => alert('Facebook Registration (Demo)'), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
];

export default function RegistrierungPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(init);
  const up = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [field]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { alert('Passwords do not match!'); return; }
    if (!formData.terms) { alert('Please accept the Terms and Privacy Policy'); return; }
    alert('Registration successful! Welcome to BeTravel.');
    router.push('/profil');
  };

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8 sm:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4"><UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--champagne)]" /><h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--navy)]">Registration</h1></div>
          <p className="text-[var(--navy)]/70 text-base sm:text-lg">Create your BeTravel customer account</p>
        </motion.div>
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} onSubmit={handleSubmit} className="bg-white border-2 border-[var(--sand)] p-5 sm:p-8 md:p-10 ui-panel">
          <div className="mb-8 sm:mb-10 pb-8 sm:pb-10 border-b-2 border-[var(--sand)]">
            <div className="flex items-center gap-3 mb-5 sm:mb-6"><User className="w-6 h-6 text-[var(--champagne)]" /><h2 className="font-serif text-xl sm:text-2xl text-[var(--navy)]">Personal Information</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div><label className="block text-[var(--navy)] font-medium mb-2">First Name *</label><input type="text" value={formData.firstName} onChange={up('firstName')} className={inputCls} required /></div>
              <div><label className="block text-[var(--navy)] font-medium mb-2">Last Name *</label><input type="text" value={formData.lastName} onChange={up('lastName')} className={inputCls} required /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div><label className="block text-[var(--navy)] font-medium mb-2">Email *</label><input type="email" value={formData.email} onChange={up('email')} className={inputCls} required /></div>
              <div><label className="block text-[var(--navy)] font-medium mb-2">Phone</label><input type="tel" value={formData.phone} onChange={up('phone')} className={inputCls} /></div>
            </div>
          </div>
          <div className="mb-8 sm:mb-10 pb-8 sm:pb-10 border-b-2 border-[var(--sand)]">
            <div className="flex items-center gap-3 mb-5 sm:mb-6"><MapPin className="w-6 h-6 text-[var(--champagne)]" /><h2 className="font-serif text-xl sm:text-2xl text-[var(--navy)]">Address</h2></div>
            <div className="space-y-4 sm:space-y-6">
              <div><label className="block text-[var(--navy)] font-medium mb-2">Street and Number</label><input type="text" value={formData.street} onChange={up('street')} className={inputCls} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div><label className="block text-[var(--navy)] font-medium mb-2">Postal Code</label><input type="text" value={formData.postalCode} onChange={up('postalCode')} className={inputCls} /></div>
                <div className="sm:col-span-2"><label className="block text-[var(--navy)] font-medium mb-2">City</label><input type="text" value={formData.city} onChange={up('city')} className={inputCls} /></div>
              </div>
            </div>
          </div>
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-5 sm:mb-6"><Lock className="w-6 h-6 text-[var(--champagne)]" /><h2 className="font-serif text-xl sm:text-2xl text-[var(--navy)]">Set Password</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[var(--navy)] font-medium mb-2">Password *</label>
                <input type="password" value={formData.password} onChange={up('password')} className={inputCls} required minLength={8} />
                <p className="text-sm text-[var(--navy)]/60 mt-2">At least 8 characters</p>
              </div>
              <div><label className="block text-[var(--navy)] font-medium mb-2">Confirm Password *</label><input type="password" value={formData.confirmPassword} onChange={up('confirmPassword')} className={inputCls} required minLength={8} /></div>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={formData.newsletter} onChange={up('newsletter')} className="mt-1 w-5 h-5" />
              <span className="text-[var(--navy)]/70">Yes, I want to receive the newsletter with exclusive travel offers</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={formData.terms} onChange={up('terms')} className="mt-1 w-5 h-5" required />
              <span className="text-[var(--navy)]/70">I accept the <a href="#" className="text-[var(--champagne)] underline">Terms</a> and <a href="#" className="text-[var(--champagne)] underline">Privacy Policy</a> *</span>
            </label>
          </div>
          <button type="submit" className="w-full py-4 bg-[var(--champagne)] text-white text-lg hover:bg-[var(--champagne)]/90 transition-colors mb-8 ui-control">Sign Up Now</button>
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-[var(--sand)]" /></div>
            <div className="relative flex justify-center"><span className="px-4 bg-white text-[var(--navy)]/60 text-sm">OR</span></div>
          </div>
          <div className="mb-8">
            <p className="text-center text-[var(--navy)] font-medium mb-6">Or sign up with</p>
            <div className="grid grid-cols-2 gap-4">
              {socialReg.map((btn) => (
                <button key={btn.label} type="button" onClick={btn.fn} className={`flex items-center justify-center gap-3 px-4 py-3 border-2 border-[var(--sand)] ${btn.cls} transition-all ui-control`}>
                  {btn.icon}<span className="text-[var(--navy)] text-sm hidden sm:inline">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-[var(--navy)]/70">Already a customer? <Link href="/login" className="text-[var(--champagne)] hover:underline font-medium">Sign in here</Link></p>
        </motion.form>
      </div>
    </div>
  );
}
