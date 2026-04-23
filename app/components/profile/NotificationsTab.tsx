'use client';
import { Save } from 'lucide-react';

type Notifications = { newsletter: boolean; bookingUpdates: boolean; promotions: boolean };
type Props = { notifications: Notifications; setNotifications: (n: Notifications) => void; onSave: () => void };

const items = [
  { key: 'newsletter' as const, title: 'Newsletter', desc: 'Receive exclusive travel offers and inspiration' },
  { key: 'bookingUpdates' as const, title: 'Booking Updates', desc: 'Important information about your bookings and trips' },
  { key: 'promotions' as const, title: 'Special Offers', desc: 'Last-minute deals and limited offers' },
];

export default function NotificationsTab({ notifications, setNotifications, onSave }: Props) {
  return (
    <div className="bg-white border-2 border-[var(--sand)] p-10 ui-panel">
      <h2 className="font-serif text-2xl text-[var(--navy)] mb-8">Notification Settings</h2>
      <div className="space-y-6">
        {items.map(({ key, title, desc }) => (
          <label key={key} className="flex items-start gap-4 p-6 border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-all cursor-pointer ui-card">
            <input
              type="checkbox"
              checked={notifications[key]}
              onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
              className="mt-1 w-5 h-5 border-2 border-[var(--sand)] text-[var(--champagne)] focus:ring-[var(--champagne)]"
            />
            <div>
              <h4 className="text-[var(--navy)] font-medium mb-1">{title}</h4>
              <p className="text-sm text-[var(--navy)]/70">{desc}</p>
            </div>
          </label>
        ))}
        <button onClick={onSave} className="flex items-center gap-3 px-8 py-4 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors ui-control">
          <Save className="w-5 h-5" /><span>Save Settings</span>
        </button>
      </div>
    </div>
  );
}
