'use client';
import { motion } from 'motion/react';
import { FileText, Download, Calendar, CreditCard, Ship, Mail } from 'lucide-react';

const documents = [
  { id: 1, type: 'Booking Confirmation', tripName: 'Mediterranean Cruise: 7 Days Luxury', bookingNumber: 'BT-2027-001234', date: 'April 10, 2026', icon: FileText, status: 'Confirmed', statusColor: 'text-green-600' },
  { id: 2, type: 'Invoice', tripName: 'Mediterranean Cruise: 7 Days Luxury', bookingNumber: 'RE-2027-001234', date: 'April 10, 2026', amount: '€ 6,598.00', icon: CreditCard, status: 'Paid', statusColor: 'text-green-600' },
  { id: 3, type: 'Travel Documents', tripName: 'Alaska Cruise: Glaciers & Wilderness', bookingNumber: 'BT-2027-001456', date: 'March 15, 2026', icon: Ship, status: 'Processing', statusColor: 'text-yellow-600' },
  { id: 4, type: 'E-Ticket', tripName: 'Alaska Cruise: Glaciers & Wilderness', bookingNumber: 'TK-2027-001456', date: 'March 15, 2026', icon: Mail, status: 'Sent', statusColor: 'text-blue-600' },
];

const infoItems = [
  'All documents are automatically sent to your email address',
  'Travel documents will be sent at least 14 days before departure',
  'For questions about your documents, contact us at dokumente@betravel.de',
  'Keep your booking confirmation for embarkation',
];

export default function DokumentePage() {
  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--champagne)]" />
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--navy)]">My Documents</h1>
          </div>
          <p className="text-[var(--navy)]/70 text-base sm:text-lg">All your booking confirmations, invoices and travel documents</p>
        </motion.div>

        <div className="space-y-6">
          {documents.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-all p-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--sand-light)] flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--champagne)]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg sm:text-xl text-[var(--navy)] mb-1">{doc.type}</h3>
                        <p className="text-[var(--navy)]/70 mb-2 text-sm sm:text-base truncate">{doc.tripName}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-[var(--navy)]/60">
                          <span className="flex items-center gap-1 sm:gap-2"><FileText className="w-4 h-4 flex-shrink-0" /><span className="truncate">{doc.bookingNumber}</span></span>
                          <span className="flex items-center gap-1 sm:gap-2"><Calendar className="w-4 h-4 flex-shrink-0" />{doc.date}</span>
                          {(doc as typeof doc & { amount?: string }).amount && <span className="font-medium text-[var(--navy)]">{(doc as typeof doc & { amount?: string }).amount}</span>}
                        </div>
                      </div>
                      <span className={`self-start px-3 py-1 text-sm font-medium whitespace-nowrap ${doc.statusColor} bg-white border-2 border-current`}>{doc.status}</span>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-4">
                      <button onClick={() => alert(`Preparing download: ${doc.type} - ${doc.bookingNumber}`)}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors">
                        <Download className="w-4 h-4" /><span>Download PDF</span>
                      </button>
                      <button onClick={() => alert(`${doc.type} sent via email`)}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 border-2 border-[var(--sand)] text-[var(--navy)] hover:border-[var(--champagne)] transition-colors">
                        <Mail className="w-4 h-4" /><span>Send via Email</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-12 bg-[var(--sand-light)] border-2 border-[var(--sand)] p-5 sm:p-8">
          <h3 className="font-serif text-xl text-[var(--navy)] mb-4">Important Information</h3>
          <ul className="space-y-2 text-[var(--navy)]/70">
            {infoItems.map((item) => (
              <li key={item} className="flex items-start gap-3"><span className="text-[var(--champagne)] mt-1">•</span><span>{item}</span></li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
