import React from 'react';

// Reusable SVG Torn Paper Edges, Mixed-Media Collage Doodles, Tape & Editorial Buttons

export function TornEdgeTop({ color = '#faf7f2', height = 18, fiberColor = '#ffffff' }) {
  return (
    <div style={{
      position: 'absolute',
      top: -height + 1,
      left: 0,
      right: 0,
      height: `${height}px`,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 2,
    }}>
      {/* Torn Fiber Base (White Ragged Core) */}
      <svg
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: -2,
          width: '100%',
          height: '100%',
          fill: fiberColor,
          filter: 'drop-shadow(0 -2px 3px rgba(0,0,0,0.12))',
        }}
      >
        <path d="M 0,30 L 0,12 Q 30,18 65,8 Q 110,22 155,10 Q 200,24 245,11 Q 290,26 340,9 Q 390,23 440,11 Q 490,25 540,8 Q 590,24 640,10 Q 690,26 740,9 Q 790,25 840,12 Q 890,27 940,8 Q 990,24 1040,11 Q 1090,26 1140,9 Q 1175,20 1200,12 L 1200,30 Z" />
      </svg>
      {/* Main Torn Paper Layer */}
      <svg
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 2,
          width: '100%',
          height: '100%',
          fill: color,
        }}
      >
        <path d="M 0,30 L 0,16 Q 30,22 65,12 Q 110,25 155,14 Q 200,28 245,15 Q 290,29 340,13 Q 390,27 440,15 Q 490,28 540,12 Q 590,27 640,14 Q 690,29 740,13 Q 790,28 840,16 Q 890,30 940,12 Q 990,27 1040,15 Q 1090,30 1140,13 Q 1175,23 1200,16 L 1200,30 Z" />
      </svg>
    </div>
  );
}

export function TornEdgeBottom({ color = '#faf7f2', height = 18, fiberColor = '#ffffff' }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: -height + 1,
      left: 0,
      right: 0,
      height: `${height}px`,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 2,
    }}>
      {/* Torn Fiber Base */}
      <svg
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: -2,
          width: '100%',
          height: '100%',
          fill: fiberColor,
          filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.2))',
        }}
      >
        <path d="M 0,0 L 0,18 Q 35,6 70,20 Q 115,5 160,19 Q 210,4 260,18 Q 310,3 360,20 Q 410,5 460,18 Q 510,4 560,21 Q 610,6 660,19 Q 710,3 760,20 Q 810,5 860,18 Q 910,2 960,21 Q 1010,4 1060,18 Q 1110,5 1160,20 Q 1180,8 1200,18 L 1200,0 Z" />
      </svg>
      {/* Main Torn Paper Layer */}
      <svg
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 2,
          width: '100%',
          height: '100%',
          fill: color,
        }}
      >
        <path d="M 0,0 L 0,14 Q 35,2 70,16 Q 115,1 160,15 Q 210,0 260,14 Q 310,0 360,16 Q 410,1 460,14 Q 510,0 560,17 Q 610,2 660,15 Q 710,0 760,16 Q 810,1 860,14 Q 910,0 960,17 Q 1010,0 1060,14 Q 1110,1 1160,16 Q 1180,4 1200,14 L 1200,0 Z" />
      </svg>
    </div>
  );
}

// Translucent Washi Tape Strip
export function WashiTape({ rotate = -3, top = '-14px', left = '20px', width = '90px', color = 'rgba(255, 235, 205, 0.75)' }) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height: '22px',
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
        backdropFilter: 'blur(2px)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        zIndex: 25,
        pointerEvents: 'none',
        clipPath: 'polygon(0% 12%, 4% 0%, 96% 0%, 100% 14%, 97% 50%, 100% 86%, 96% 100%, 4% 100%, 0% 86%, 3% 50%)',
        borderLeft: '1px dashed rgba(255,255,255,0.6)',
        borderRight: '1px dashed rgba(255,255,255,0.6)',
      }}
    />
  );
}

// Black Gaffer / Masking Tape Strip (As seen in the mixed-media collage reference!)
export function BlackTape({ rotate = 4, top = '-10px', left = 'auto', right = 'auto', width = '70px', height = '20px' }) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        width,
        height,
        backgroundColor: '#181818',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 3px 8px rgba(0,0,0,0.4)',
        zIndex: 30,
        pointerEvents: 'none',
        clipPath: 'polygon(0% 8%, 5% 0%, 95% 0%, 100% 10%, 97% 50%, 100% 90%, 95% 100%, 5% 100%, 0% 90%, 3% 50%)',
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.06) 75%, transparent 75%, transparent)',
        backgroundSize: '4px 4px',
      }}
    />
  );
}

// Hand-Drawn Crown Doodle (from Inception style)
export function DoodleCrown({ size = 26, color = '#c8102e', rotate = -8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{
        transform: `rotate(${rotate}deg)`,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <path
        d="M 6,32 L 8,14 L 16,24 L 20,8 L 24,24 L 32,14 L 34,32 Z"
        fill="none"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="11" r="2" fill={color} />
      <circle cx="20" cy="5" r="2.2" fill={color} />
      <circle cx="32" cy="11" r="2" fill={color} />
    </svg>
  );
}

// Red Marker Brush Slash Accent (under words)
export function BrushSlash({ width = '100%', height = '6px', color = '#c8102e', rotate = -1 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: '2px',
        transform: `rotate(${rotate}deg)`,
        clipPath: 'polygon(0% 40%, 15% 10%, 85% 0%, 100% 30%, 92% 90%, 10% 100%)',
        marginTop: '2px',
      }}
    />
  );
}

// Torn Paper Scrap Note / Tag Component
export function TornScrap({ children, style = {}, rotate = 0, bgColor = '#fffdf9' }) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: bgColor,
        padding: '10px 16px',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 6px 16px rgba(50, 5, 12, 0.14), 0 1px 3px rgba(0,0,0,0.08)',
        clipPath: 'polygon(0% 4px, 3% 0px, 8% 3px, 14% 0px, 20% 4px, 28% 1px, 35% 4px, 45% 0px, 55% 4px, 65% 1px, 75% 4px, 85% 0px, 94% 3px, 100% 0px, 99% 15%, 100% 30%, 98% 45%, 100% 60%, 98% 75%, 100% 90%, 99% 100%, 92% 97%, 85% 100%, 75% 96%, 65% 100%, 55% 97%, 45% 100%, 35% 96%, 25% 100%, 15% 97%, 6% 100%, 0% 97%, 2% 80%, 0% 65%, 2% 50%, 0% 35%, 2% 20%)',
        borderTop: '1px solid rgba(255,255,255,0.9)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute',
        inset: '-2px',
        backgroundColor: '#ffffff',
        zIndex: -1,
        opacity: 0.9,
      }} />
      {children}
    </div>
  );
}

// Aesthetic Editorial Button (Black / Red block with arrow, inspired by SHOP NOW → in Image 2)
export function EditorialButton({
  children,
  onClick,
  variant = 'black', // 'black' | 'red' | 'paper'
  arrow = true,
  style = {},
  rotate = 0,
}) {
  const isBlack = variant === 'black';
  const isRed = variant === 'red';

  const bg = isBlack ? '#121212' : isRed ? '#a61324' : '#faf7f2';
  const color = isBlack || isRed ? '#ffffff' : '#121212';
  const border = isBlack || isRed ? '1px solid rgba(255,255,255,0.18)' : '1px solid #121212';

  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: bg,
        color: color,
        border: border,
        borderRadius: '0px',
        padding: '9px 18px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 10,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
        clipPath: 'polygon(0% 2px, 3% 0%, 97% 0%, 100% 3px, 99% 97%, 100% 100%, 3% 100%, 0% 97%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, box-shadow',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotate}deg) translateY(-3px) scale(1.035)`;
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.45)';
        if (isBlack) e.currentTarget.style.backgroundColor = '#a61324';
        if (isRed) e.currentTarget.style.backgroundColor = '#830e1b';
        const arrowEl = e.currentTarget.querySelector('.editorial-arrow');
        if (arrowEl) arrowEl.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotate}deg) translateY(0) scale(1)`;
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.3)';
        if (isBlack) e.currentTarget.style.backgroundColor = '#121212';
        if (isRed) e.currentTarget.style.backgroundColor = '#a61324';
        const arrowEl = e.currentTarget.querySelector('.editorial-arrow');
        if (arrowEl) arrowEl.style.transform = 'translateX(0)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = `rotate(${rotate}deg) translateY(0) scale(0.97)`;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = `rotate(${rotate}deg) translateY(-3px) scale(1.035)`;
      }}
    >
      <span>{children}</span>
      {arrow && (
        <span 
          className="editorial-arrow" 
          style={{ 
            fontSize: '13px', 
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'inline-block',
          }}
        >
          ⟶
        </span>
      )}
    </button>
  );
}

// Circular Editorial Arrow Button (The circle button ( ← ) / ( → ) from Image 2!)
export function CircleArrowButton({ direction = 'next', onClick, size = 32, dark = false }) {
  const isNext = direction === 'next';
  const color = dark ? '#ffffff' : '#121212';
  const borderColor = dark ? 'rgba(255,255,255,0.4)' : 'rgba(18,18,18,0.35)';

  return (
    <button
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: `1.5px solid ${borderColor}`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        padding: 0,
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = dark ? '#ffffff' : '#121212';
        e.currentTarget.style.color = dark ? '#121212' : '#ffffff';
        e.currentTarget.style.borderColor = dark ? '#ffffff' : '#121212';
        e.currentTarget.style.transform = isNext ? 'scale(1.12) translateX(2px)' : 'scale(1.12) translateX(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = color;
        e.currentTarget.style.borderColor = borderColor;
        e.currentTarget.style.transform = 'scale(1) translateX(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.92)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = isNext ? 'scale(1.12) translateX(2px)' : 'scale(1.12) translateX(-2px)';
      }}
      title={isNext ? 'Next Page' : 'Previous Page'}
    >
      <span style={{ fontSize: '14px', lineHeight: 1, fontWeight: 600 }}>
        {isNext ? '→' : '←'}
      </span>
    </button>
  );
}

// Vintage Postage Stamp Button
export function PostageStampButton({ children, onClick, active = false, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: active ? '#85101c' : '#faf7f2',
        color: active ? '#fff' : '#4a0812',
        border: '1.5px dashed #85101c',
        borderRadius: '2px',
        padding: '6px 14px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.06) translateY(-2px) rotate(-1.5deg)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.28)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.18)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95) rotate(0deg)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.06) translateY(-2px) rotate(-1.5deg)';
      }}
    >
      {children}
    </button>
  );
}
