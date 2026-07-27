import React from 'react';
import { motion } from 'motion/react';

export default function VideoHero({ 
  videoMp4 = "/assets/mini-site/hero-video.mp4", 
  videoWebm = "/assets/mini-site/hero-video.webm",
  posterSrc = "/assets/mini-site/hero-video-poster.jpg",
  title = "Off-Data Engenharia Digital",
  subtitle = "Presença online de alto padrão & páginas High Ticket para empresas no Triângulo Mineiro."
}) {
  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100dvh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '24px 0 32px', 
      boxSizing: 'border-box', 
      overflow: 'hidden' 
    }}>
      
      {/* Background Video Banner with Gradient Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', backgroundColor: '#0a0f1d' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          {videoMp4 && <source src={videoMp4} type="video/mp4" />}
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(3, 7, 18, 0.4) 0%, rgba(3, 7, 18, 0.85) 60%, rgba(3, 7, 18, 1) 100%)' }} />
      </div>

      {/* Top Header Tag & Title */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', textAlign: 'center', paddingTop: '16px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px', 
          padding: '4px 12px', 
          borderRadius: '999px', 
          backgroundColor: 'rgba(4, 74, 179, 0.25)',
          border: '1px solid rgba(4, 74, 179, 0.5)',
          color: '#60a5fa',
          fontSize: '10px',
          fontWeight: 600,
          fontFamily: "'Fragment Mono', monospace",
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '12px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
          Engenharia Digital High Ticket
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 6px', letterSpacing: '-0.02em', fontFamily: "'PP Neue Montreal', sans-serif" }}>
          {title}
        </h1>

        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.4, margin: '0 auto', maxWidth: '310px', fontFamily: "'PP Neue Montreal', sans-serif" }}>
          {subtitle}
        </p>
      </div>

      {/* SELO CIRCULAR ROTATIVO (Elemento Gráfico Principal da Hero) */}
      <div style={{ position: 'relative', zIndex: 20, margin: 'auto 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Anel de Texto Rotativo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ width: '110px', height: '110px', position: 'absolute', inset: 0 }}
          >
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }}>
              <path
                id="offdata-curve"
                fill="transparent"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
              <text style={{ fill: '#ffffff', fontSize: '9.2px', fontWeight: 500, fontFamily: "'Fragment Mono', monospace", letterSpacing: '0.14em' }}>
                <textPath href="#offdata-curve" startOffset="0%">
                  OFF DATA • OFF DATA • OFF DATA •
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Isotipo Estático Centralizado (não gira) */}
          <img
            src="/assets/mini-site/logo-off.svg"
            alt="Off Data"
            style={{
              position: 'absolute',
              inset: 0,
              margin: 'auto',
              width: '40px',
              height: 'auto',
              filter: 'drop-shadow(0 0 10px rgba(4, 74, 179, 0.6))'
            }}
          />
        </div>
      </div>

    </section>
  );
}
