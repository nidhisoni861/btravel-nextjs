'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Step1Occasion from './form-steps/Step1Occasion';
import Step2Vibe from './form-steps/Step2Vibe';
import Step3Logistics from './form-steps/Step3Logistics';
import Step4Perfection from './form-steps/Step4Perfection';
import Step5Final from './form-steps/Step5Final';
import SubmitSuccess from './SubmitSuccess';
import { FormData } from '@/app/types/index';

const initialFormData: FormData = {
  occasion: '',
  vibe: [],
  dateRange: { from: undefined, to: undefined },
  flexibility: '',
  travelParty: '',
  adults: 2,
  children: 0,
  childrenAges: [],
  destination: '',
  luxuryToggles: {
    conciergeService: false, personalGuide: false, michelinRestaurants: false,
    privateDinner: false, wineTrips: false, exclusiveAccess: false,
    closedEvents: false, inaccessiblePlaces: false, luxuryResort: false,
    boutiqueHotels: false, privateVilla: false, privateBoatTours: false,
    privateTransfers: false, yachtPrivateJet: false, helicopter: false,
  },
  specialRequests: '',
  firstName: '',
  lastName: '',
  address: '',
  phoneNumber: '',
  email: '',
};

export default function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const updateFormData = (data: Partial<FormData>) => setFormData((prev) => ({ ...prev, ...data }));
  const handleSubmit = () => setIsSubmitted(true);

  if (isSubmitted) return <SubmitSuccess />;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/95 backdrop-blur-sm p-5 sm:p-8 md:p-12 shadow-lg sm:shadow-2xl ui-panel">
      <div className="flex items-center justify-between mb-6 sm:mb-12">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center flex-1 min-w-0">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm sm:text-base transition-all ${currentStep >= step ? 'bg-[var(--champagne)] text-[var(--navy)]' : 'bg-[var(--sand)] text-[var(--navy)]/40'}`}>
              {step}
            </div>
            {step < 5 && <div className={`flex-1 h-0.5 mx-1 sm:mx-2 transition-all ${currentStep > step ? 'bg-[var(--champagne)]' : 'bg-[var(--sand)]'}`} />}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {currentStep === 1 && <Step1Occasion key="step1" formData={formData} updateFormData={updateFormData} nextStep={nextStep} />}
        {currentStep === 2 && <Step2Vibe key="step2" formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
        {currentStep === 3 && <Step3Logistics key="step3" formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
        {currentStep === 4 && <Step4Perfection key="step4" formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
        {currentStep === 5 && <Step5Final key="step5" formData={formData} updateFormData={updateFormData} prevStep={prevStep} handleSubmit={handleSubmit} />}
      </AnimatePresence>
    </motion.div>
  );
}
