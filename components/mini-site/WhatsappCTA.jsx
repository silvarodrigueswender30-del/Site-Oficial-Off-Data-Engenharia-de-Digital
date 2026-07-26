import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

export default function WhatsappCTA({ 
  phone = "5534992362596", 
  message = "Olá! Vim pelo Link da Bio do Instagram e gostaria de solicitar um orçamento de Engenharia Digital.",
  label = "Falar Direto no WhatsApp"
}) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <motion.div 
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ width: '100%', margin: '20px 0 28px' }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '16px 20px',
          borderRadius: '16px',
          backgroundColor: '#25D366',
          color: '#000000',
          fontWeight: 700,
          fontSize: '15px',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MessageCircle size={24} fill="#000000" color="#25D366" />
          <span>{label}</span>
        </div>
        <ArrowUpRight size={20} />
      </a>
    </motion.div>
  );
}
