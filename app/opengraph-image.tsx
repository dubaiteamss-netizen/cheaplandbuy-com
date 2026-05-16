import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CheapLandBuy.com – Affordable Land For Sale Across America';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #052654 0%, #083670 50%, #0C4A8F 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative mountains */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 220,
            background: 'rgba(255,209,102,0.06)',
            clipPath: 'polygon(0% 100%, 15% 40%, 30% 70%, 50% 20%, 70% 60%, 85% 30%, 100% 55%, 100% 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
            background: 'rgba(255,209,102,0.04)',
            clipPath: 'polygon(0% 100%, 20% 50%, 40% 75%, 60% 35%, 80% 65%, 100% 45%, 100% 100%)',
          }}
        />

        {/* Gold accent line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#FFD166' }} />
        {/* Gold accent line bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: '#FFD166' }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          {/* Icon */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: '#0C4A8F',
              border: '3px solid rgba(255,209,102,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 28,
              boxShadow: '0 0 60px rgba(255,209,102,0.2)',
            }}
          >
            {/* SVG Mountain icon inline */}
            <svg width="60" height="60" viewBox="0 0 36 36">
              <polygon points="26,15 33,27 19,27" fill="#FFD166" opacity="0.35" />
              <polygon points="18,7 30,27 6,27" fill="#FFD166" />
              <rect x="4" y="27" width="28" height="5" rx="1" fill="#FFD166" opacity="0.18" />
              <circle cx="18" cy="7" r="2.8" fill="white" opacity="0.92" />
            </svg>
          </div>

          {/* Logo text */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span style={{ fontSize: 72, fontWeight: 900, color: '#ffffff', letterSpacing: '-2px', fontFamily: 'Arial Black, Arial, sans-serif' }}>
              CheapLandBuy
            </span>
            <span style={{ fontSize: 72, fontWeight: 900, color: '#FFD166', letterSpacing: '-2px', fontFamily: 'Arial Black, Arial, sans-serif' }}>
              .com
            </span>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.72)', marginTop: 16, fontFamily: 'Arial, sans-serif', letterSpacing: '0.5px' }}>
            Affordable Land For Sale Across America
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
            {['All 50 States', 'Owner Financing', 'Ranch · Farm · Hunting · Waterfront'].map(label => (
              <div
                key={label}
                style={{
                  padding: '8px 20px',
                  background: 'rgba(255,209,102,0.15)',
                  border: '1px solid rgba(255,209,102,0.35)',
                  borderRadius: 100,
                  color: '#FFD166',
                  fontSize: 18,
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
