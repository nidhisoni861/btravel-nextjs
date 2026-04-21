'use client';
import { User, Bell, Lock } from 'lucide-react';

type Tab = 'personal' | 'notifications' | 'password';
type Props = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  firstName: string;
  lastName: string;
  email: string;
};

const tabs: { id: Tab; label: string; Icon: typeof User }[] = [
  { id: 'personal', label: 'Personal Information', Icon: User },
  { id: 'notifications', label: 'Notifications', Icon: Bell },
  { id: 'password', label: 'Change Password', Icon: Lock },
];

export default function ProfileSidebar({ activeTab, setActiveTab, firstName, lastName, email }: Props) {
  return (
    <div className="bg-white border-2 border-[var(--sand)] p-6">
      <nav className="space-y-2">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
              activeTab === id ? 'bg-[var(--champagne)] text-white' : 'text-[var(--navy)] hover:bg-[var(--sand-light)]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-8 pt-8 border-t-2 border-[var(--sand)]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 bg-[var(--sand-light)] rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-[var(--champagne)]" />
          </div>
          <h3 className="font-serif text-lg text-[var(--navy)]">{firstName} {lastName}</h3>
          <p className="text-sm text-[var(--navy)]/60">{email}</p>
        </div>
      </div>
    </div>
  );
}
