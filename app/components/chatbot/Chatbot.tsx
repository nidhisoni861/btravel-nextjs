'use client';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import ChatbotButton from './ChatbotButton';
import ChatbotPanel from './ChatbotPanel';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && <ChatbotPanel onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
      <ChatbotButton isOpen={isOpen} onClick={() => setIsOpen(v => !v)} />
    </>
  );
}
