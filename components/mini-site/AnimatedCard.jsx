import React from 'react';
import { motion } from 'motion/react';

export default function AnimatedCard({ 
  title, 
  subtitle, 
  icon: Icon, 
  cols = 4, 
  onClick, 
  badge,
  href 
}) {
  const validCols = cols === 1 ? 1 : cols === 2 ? 2 : 4;
  const colSpanClass = `ms-col-${validCols}`;

  const cardContent = (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      style={{
        backgroundColor: 'rgba(17, 24, 39, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        cursor: 'pointer',
        height: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        {Icon && (
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '10px', 
            backgroundColor: 'rgba(4, 74, 179, 0.2)', 
            display: 'flex', 
            alignItems: 'center', 
            justify: 'center',
            color: '#60a5fa'
          }}>
            <Icon size={20} strokeWidth={1.75} />
          </div>
        )}
        {badge && (
          <span style={{ 
            fontSize: '10px', 
            fontWeight: 600, 
            padding: '2px 8px', 
            borderRadius: '999px', 
            backgroundColor: '#044ab3', 
            color: '#ffffff' 
          }}>
            {badge}
          </span>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: '0 0 4px', lineHeight: 1.3 }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0, lineHeight: 1.35 }}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className={colSpanClass}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}
