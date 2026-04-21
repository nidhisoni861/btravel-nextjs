'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Video, Phone, Mail, MessageCircle } from 'lucide-react';

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
const consultationTypes = [
  { id: 'video', label: 'Google Meet', icon: Video },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'email', label: 'Email', icon: Mail },
];

export default function TerminBuchenPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Appointment booked! We will be in touch shortly.');
  };

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-[900px] mx-auto px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="font-serif text-5xl text-[var(--navy)] mb-4">Book Consultation</h1>
          <p className="text-[var(--navy)]/70 text-lg">Let our travel experts advise you personally</p>
        </motion.div>
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit} className="bg-white border-2 border-[var(--sand)] p-10">
          <div className="mb-10">
            <label className="block text-[var(--navy)] font-medium mb-4">How would you like to be consulted?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {consultationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button key={type.id} type="button" onClick={() => setConsultationType(type.id)}
                    className={`p-6 border-2 transition-all ${consultationType === type.id ? 'border-[var(--champagne)] bg-[var(--champagne)]/10' : 'border-[var(--sand)] hover:border-[var(--champagne)]'}`}>
                    <Icon className="w-8 h-8 mx-auto mb-3 text-[var(--champagne)]" />
                    <span className="text-sm text-[var(--navy)]">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-[var(--navy)] font-medium mb-4"><Calendar className="w-5 h-5 inline mr-2" />Preferred Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none" required />
          </div>
          <div className="mb-8">
            <label className="block text-[var(--navy)] font-medium mb-4"><Clock className="w-5 h-5 inline mr-2" />Preferred Time</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {timeSlots.map((time) => (
                <button key={time} type="button" onClick={() => setSelectedTime(time)}
                  className={`p-3 border-2 transition-all ${selectedTime === time ? 'border-[var(--champagne)] bg-[var(--champagne)] text-white' : 'border-[var(--sand)] hover:border-[var(--champagne)]'}`}>
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-[var(--navy)] font-medium mb-2">Your Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none" required />
            </div>
            <div>
              <label className="block text-[var(--navy)] font-medium mb-2">Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none" required />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-[var(--navy)] font-medium mb-2">Phone Number</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none" />
          </div>
          <div className="mb-8">
            <label className="block text-[var(--navy)] font-medium mb-2">Your Message</label>
            <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4}
              className="w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none resize-none"
              placeholder="Tell us what you're interested in..." />
          </div>
          <button type="submit" className="w-full py-4 bg-[var(--champagne)] text-white text-lg hover:bg-[var(--champagne)]/90 transition-colors">
            Confirm Appointment
          </button>
        </motion.form>
      </div>
    </div>
  );
}
