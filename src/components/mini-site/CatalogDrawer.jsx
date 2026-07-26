import React from 'react';
import { Drawer } from 'vaul';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CatalogDrawer({ 
  open, 
  onOpenChange, 
  title = "Detalhes do Serviço High Ticket",
  description = "Soluções completas de engenharia web criadas sob medida.",
  features = [],
  ctaUrl = "https://wa.me/5534992362596"
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 999
        }} />
        <Drawer.Content style={{
          backgroundColor: '#0c1322',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          height: '80vh',
          maxHeight: '600px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '390px',
          margin: '0 auto',
          zIndex: 1000,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff'
        }}>
          {/* Handle bar */}
          <div style={{ paddingTop: '12px', paddingBottom: '8px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '48px', height: '5px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          </div>

          <div style={{ padding: '16px 24px', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Drawer.Title style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                {title}
              </Drawer.Title>
              <button 
                onClick={() => onOpenChange(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <Drawer.Description style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.4, marginBottom: '20px' }}>
              {description}
            </Drawer.Description>

            {features.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  O que está incluído
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {features.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#d1d5db', lineHeight: 1.35 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA Footer inside drawer */}
          <div style={{ padding: '16px 24px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#090d17' }}>
            <a 
              href={ctaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '8px',
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: '#044ab3',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(4, 74, 179, 0.4)'
              }}
            >
              <span>Solicitar Orçamento no WhatsApp</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
