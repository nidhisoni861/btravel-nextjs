'use client';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { FormData } from '@/app/types/index';

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  prevStep: () => void;
  handleSubmit: () => void;
};

export default function Step5Final({ formData, updateFormData, prevStep, handleSubmit }: Props) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--navy)] mb-3">Do you have any special requests?</h2>
      <p className="text-[var(--navy)]/60 mb-6 sm:mb-10">Share your wishes and how we can reach you</p>
      <div className="space-y-6">
        <div>
          <label htmlFor="specialRequests" className="block text-[var(--navy)] mb-3">Special Requests</label>
          <textarea id="specialRequests" value={formData.specialRequests} onChange={(e) => updateFormData({ specialRequests: e.target.value })}
            placeholder="Tell us about your dreams and expectations..." rows={6}
            className="w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors resize-none" />
        </div>
        <div className="border-t-2 border-[var(--sand)] pt-6">
          <h3 className="text-[var(--navy)] font-medium mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-[var(--navy)] mb-2">First Name</label>
              <input type="text" id="firstName" value={formData.firstName} onChange={(e) => updateFormData({ firstName: e.target.value })}
                className="w-full p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[var(--navy)] mb-2">Last Name</label>
              <input type="text" id="lastName" value={formData.lastName} onChange={(e) => updateFormData({ lastName: e.target.value })}
                className="w-full p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-[var(--navy)] mb-2">Address</label>
            <input type="text" id="address" value={formData.address} onChange={(e) => updateFormData({ address: e.target.value })}
              className="w-full p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-[var(--navy)] mb-2">Phone Number</label>
              <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                className="w-full p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block text-[var(--navy)] mb-2">Email</label>
              <input type="email" id="email" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })}
                className="w-full p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={prevStep} className="px-8 py-3 border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors">Back</button>
        <motion.button onClick={handleSubmit} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex-1 px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors flex items-center justify-center gap-2">
          <Send className="w-5 h-5" />Submit Request
        </motion.button>
      </div>
    </motion.div>
  );
}
