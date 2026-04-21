'use client';
import { Lock } from 'lucide-react';

const inputCls = 'w-full p-4 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none';

export default function PasswordTab({ onSave }: { onSave: () => void }) {
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(); };

  return (
    <div className="bg-white border-2 border-[var(--sand)] p-10">
      <h2 className="font-serif text-2xl text-[var(--navy)] mb-8">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div>
          <label className="block text-[var(--navy)] font-medium mb-2">Current Password</label>
          <input type="password" className={inputCls} required />
        </div>
        <div>
          <label className="block text-[var(--navy)] font-medium mb-2">New Password</label>
          <input type="password" className={inputCls} required minLength={8} />
          <p className="text-sm text-[var(--navy)]/60 mt-2">At least 8 characters</p>
        </div>
        <div>
          <label className="block text-[var(--navy)] font-medium mb-2">Confirm New Password</label>
          <input type="password" className={inputCls} required minLength={8} />
        </div>
        <button type="submit" className="flex items-center gap-3 px-8 py-4 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors">
          <Lock className="w-5 h-5" /><span>Change Password</span>
        </button>
      </form>
    </div>
  );
}
