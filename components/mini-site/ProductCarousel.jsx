import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ExternalLink } from 'lucide-react';

export default function ProductCarousel({ items = [] }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false
  });

  if (!items || items.length === 0) return null;

  return (
    <div style={{ width: '100%', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
          Casos & Portfólio
        </h3>
        <span style={{ fontSize: '11px', color: '#6b7280' }}>Arraste &rarr;</span>
      </div>

      <div ref={emblaRef} style={{ overflow: 'hidden', width: '100%', borderRadius: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', touchAction: 'pan-y pinch-zoom' }}>
          {items.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                flex: '0 0 240px',
                minWidth: 0,
                backgroundColor: 'rgba(17, 24, 39, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {item.image && (
                <div style={{ width: '100%', height: '120px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(17, 24, 39, 0.9) 100%)' }} />
                </div>
              )}
              <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', margin: '0 0 4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, lineHeight: 1.3 }}>
                    {item.subtitle}
                  </p>
                </div>
                {item.href && (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '11px', 
                      color: '#60a5fa', 
                      fontWeight: 600,
                      marginTop: '10px',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Ver Projeto</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
