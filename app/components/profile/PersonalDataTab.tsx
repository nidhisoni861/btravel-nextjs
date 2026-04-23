'use client';
import { User, MapPin, Save } from 'lucide-react';

type ProfileData = { firstName: string; lastName: string; email: string; phone: string; street: string; city: string; postalCode: string; country: string };
type Props = { formData: ProfileData; setFormData: (d: ProfileData) => void; onSave: () => void };

const inputCls = 'w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none ui-control';

export default function PersonalDataTab({ formData, setFormData, onSave }: Props) {
  const up = (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [field]: e.target.value });

  return (
    <div className="bg-white border-2 border-[var(--sand)] p-10 ui-panel">
      <h2 className="font-serif text-2xl text-[var(--navy)] mb-8">Personal Information</h2>
      <div className="space-y-8">
        <div>
          <h3 className="flex items-center gap-3 text-lg text-[var(--navy)] font-medium mb-4">
            <User className="w-5 h-5 text-[var(--champagne)]" />Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div><label className="block text-[var(--navy)] font-medium mb-2">First Name</label><input type="text" value={formData.firstName} onChange={up('firstName')} className={inputCls} /></div>
            <div><label className="block text-[var(--navy)] font-medium mb-2">Last Name</label><input type="text" value={formData.lastName} onChange={up('lastName')} className={inputCls} /></div>
            <div><label className="block text-[var(--navy)] font-medium mb-2">Email</label><input type="email" value={formData.email} onChange={up('email')} className={inputCls} /></div>
            <div><label className="block text-[var(--navy)] font-medium mb-2">Phone</label><input type="tel" value={formData.phone} onChange={up('phone')} className={inputCls} /></div>
          </div>
        </div>
        <div className="pt-8 border-t-2 border-[var(--sand)]">
          <h3 className="flex items-center gap-3 text-lg text-[var(--navy)] font-medium mb-4">
            <MapPin className="w-5 h-5 text-[var(--champagne)]" />Address
          </h3>
          <div className="space-y-6">
            <div><label className="block text-[var(--navy)] font-medium mb-2">Street and Number</label><input type="text" value={formData.street} onChange={up('street')} className={inputCls} /></div>
            <div className="grid md:grid-cols-3 gap-6">
              <div><label className="block text-[var(--navy)] font-medium mb-2">Postal Code</label><input type="text" value={formData.postalCode} onChange={up('postalCode')} className={inputCls} /></div>
              <div className="md:col-span-2"><label className="block text-[var(--navy)] font-medium mb-2">City</label><input type="text" value={formData.city} onChange={up('city')} className={inputCls} /></div>
            </div>
            <div><label className="block text-[var(--navy)] font-medium mb-2">Country</label><input type="text" value={formData.country} onChange={up('country')} className={inputCls} /></div>
          </div>
        </div>
        <button onClick={onSave} className="flex items-center gap-3 px-8 py-4 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors ui-control">
          <Save className="w-5 h-5" /><span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
