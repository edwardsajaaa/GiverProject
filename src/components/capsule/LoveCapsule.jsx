import React, { useState } from 'react';
import { CapsuleJournal } from './CapsuleJournal';

export function LoveCapsule({ children }) {
  // Views: 'capsule' (seamless continuous envelope + journal) | 'world3d' (the surprise 3D diorama)
  const [activeView, setActiveView] = useState('capsule');

  return (
    <>
      {/* 1 & 2. Continuous Seamless Envelope & Editorial Paper Journal Phase */}
      {activeView === 'capsule' && (
        <CapsuleJournal
          onEnter3DWorld={() => setActiveView('world3d')}
        />
      )}

      {/* 3. The 3D Sandbox Surprise (GIVERSOURCE Island) */}
      {activeView === 'world3d' && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Floating Back to Capsule Button (Torn Editorial Style) */}
          <div 
            className="return-capsule-wrapper"
            style={{
              position: 'absolute',
              top: '18px',
              left: '20px',
              zIndex: 9000,
            }}
          >
            <button
              onClick={() => setActiveView('capsule')}
              className="return-capsule-btn"
              style={{
                backgroundColor: '#121212',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '0px',
                padding: '9px 18px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                clipPath: 'polygon(0% 2px, 3% 0%, 97% 0%, 100% 2px, 98% 98%, 100% 100%, 2% 100%, 0% 98%)',
                transition: 'transform 0.2s, background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#a61324';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#121212';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <span>⟵ RETURN TO LOVE CAPSULE</span>
            </button>
          </div>

          <style>{`
            @media (max-width: 600px) {
              .return-capsule-wrapper {
                top: 8px !important;
                left: 8px !important;
              }
              .return-capsule-btn {
                padding: 5px 9px !important;
                font-size: 9px !important;
                letter-spacing: 1px !important;
              }
            }
          `}</style>

          {/* Children is the 3D Sandbox app */}
          {children}
        </div>
      )}
    </>
  );
}
