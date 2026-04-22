'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import PersonalDataTab from '../components/profile/PersonalDataTab';
import NotificationsTab from '../components/profile/NotificationsTab';
import PasswordTab from '../components/profile/PasswordTab';

type Tab = 'personal' | 'notifications' | 'password';
type ProfileData = { firstName: string; lastName: string; email: string; phone: string; street: string; city: string; postalCode: string; country: string };

const initProfile: ProfileData = { firstName: 'Max', lastName: 'Mustermann', email: 'max.mustermann@example.com', phone: '+49 123 456789', street: 'Musterstraße 123', city: 'Stuttgart', postalCode: '70173', country: 'Germany' };

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [formData, setFormData] = useState<ProfileData>(initProfile);
  const [notifications, setNotifications] = useState({ newsletter: true, bookingUpdates: true, promotions: false });

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--champagne)]" />
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--navy)]">My Profile</h1>
          </div>
          <p className="text-[var(--navy)]/70 text-base sm:text-lg">Manage your personal information and settings</p>
        </motion.div>
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-1">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} firstName={formData.firstName} lastName={formData.lastName} email={formData.email} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3">
            {activeTab === 'personal' && <PersonalDataTab formData={formData} setFormData={setFormData} onSave={() => alert('Profile successfully updated!')} />}
            {activeTab === 'notifications' && <NotificationsTab notifications={notifications} setNotifications={setNotifications} onSave={() => alert('Profile successfully updated!')} />}
            {activeTab === 'password' && <PasswordTab onSave={() => alert('Password successfully changed!')} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
