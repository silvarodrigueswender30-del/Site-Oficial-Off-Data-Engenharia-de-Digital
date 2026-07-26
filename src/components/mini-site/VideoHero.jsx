import React from 'react';

export default function VideoHero({ 
  videoSrc = "/videos/hero-bg.mp4", 
  posterSrc = "/imagens/home-pagina-venda01-mobile.avif",
  title = "Off-Data Engenharia Digital",
  subtitle = "Presença online de alto padrão & páginas High Ticket para empresas no Triângulo Mineiro."
}) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '28px', paddingBottom: '20px', textAlign: 'center' }}>
      {/* Video / Poster Background Banner */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '140px', 
        borderRadius: '20px', 
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        marginBottom: '-40px',
        backgroundColor: '#0a0f1d'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(3, 7, 18, 0.2) 0%, rgba(3, 7, 18, 0.8) 100%)' 
        }} />
      </div>

      {/* Profile Avatar */}
      <div style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          border: '3px solid #044ab3', 
          boxShadow: '0 8px 24px rgba(4, 74, 179, 0.4)',
          overflow: 'hidden',
          backgroundColor: '#000000',
          margin: '0 auto'
        }}>
          <img 
            src="/isologoazul.svg" 
            alt="Off-Data Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }}
          />
        </div>
      </div>

      {/* Profile Info */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px', 
          padding: '4px 12px', 
          borderRadius: '999px', 
          backgroundColor: 'rgba(4, 74, 179, 0.15)',
          border: '1px solid rgba(4, 74, 179, 0.3)',
          color: '#60a5fa',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '8px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
          Engenharia Digital High Ticket
        </div>

        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '4px 0 6px', letterSpacing: '-0.02em' }}>
          {title}
        </h1>

        <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.4, margin: '0 auto', maxWidth: '320px' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
