import React, { useState } from 'react';
import { SecurityEngine } from '../../../utils/securityEngine';
import {
  TornScrap,
  WashiTape,
  BlackTape,
  TornEdgeTop,
  TornEdgeBottom,
  EditorialButton,
  CircleArrowButton,
} from '../TornPaper';

const DEFAULT_LETTER = `Every moment since the day we met has felt like finding a rare constellation in a quiet sky. 

You bring warmth into ordinary days, and in your laugh, I've found my favorite melody. I built this little capsule so that whenever the world feels loud, you can return here and remember how deeply, endlessly, and tenderly you are cherished.

Thank you for being my peace, my adventure, and my love.`;

export function LoveLetterPage({ onPrev, onNext, recipientName = "My Love" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [letterText, setLetterText] = useState(DEFAULT_LETTER);

  return (
    <div 
      className="love-letter-page"
      style={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 34px',
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: "'Cormorant Garamond', serif",
        color: '#121212',
      }}
    >
      {/* Top Editorial Header */}
      <div 
        className="love-letter-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #121212',
          paddingBottom: '10px',
          fontSize: '11px',
          fontFamily: "'Montserrat', sans-serif",
          color: '#121212',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        <TornScrap rotate={-1} style={{ padding: '3px 10px', backgroundColor: '#fffdfa' }}>
          <span>TRUE LOVE</span>
        </TornScrap>

        <span style={{
          textTransform: 'none',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '16px',
          fontStyle: 'italic',
          letterSpacing: '0.5px',
        }}>
          words that stay forever
        </span>

        <TornScrap rotate={1} style={{ padding: '3px 10px', backgroundColor: '#fffdfa' }}>
          <span>OUR MEMORIES</span>
        </TornScrap>
      </div>

      {/* Middle Section: Ribbon Banner & Torn Paper Love Letter */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto 0',
        position: 'relative',
        width: '100%',
      }}>
        {/* Ribbon Banner + Calligraphy Heading on subtle torn backing */}
        <div style={{
          position: 'relative',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '380px',
          boxSizing: 'border-box',
        }}>
          <svg
            viewBox="0 0 380 110"
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '380px',
              height: 'auto',
              pointerEvents: 'none',
              stroke: '#85101c',
              strokeWidth: '1.2',
              fill: 'none',
              opacity: 0.65,
            }}
          >
            <path d="M 30,55 C 50,30 90,20 190,20 C 290,20 330,30 350,55 C 330,80 290,95 190,95 C 90,95 50,80 30,55 Z" strokeDasharray="3,2" />
            <path d="M 30,55 C 10,65 5,80 20,95 C 35,90 40,75 35,60" />
            <path d="M 350,55 C 370,65 375,80 360,95 C 345,90 340,75 345,60" />
            <path d="M 80,24 C 60,10 40,15 35,30" />
            <path d="M 300,24 C 320,10 340,15 345,30" />
          </svg>

          <div style={{
            position: 'relative',
            zIndex: 2,
            fontFamily: "'Pinyon Script', cursive",
            fontSize: 'clamp(26px, 7vw, 42px)',
            color: '#85101c',
            lineHeight: 1.15,
            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
          }}>
            Girl, I'm so in love with <span style={{ fontSize: 'clamp(30px, 8.5vw, 48px)', textDecoration: 'underline wavy #c8102e 1.5px' }}>You</span>
          </div>
        </div>

        {/* The Letter on an Authentic Torn Paper Parchment Sheet */}
        <div 
          className="love-letter-sheet"
          style={{
            position: 'relative',
            maxWidth: '560px',
            width: '100%',
            marginTop: '10px',
            backgroundColor: '#fffdf9',
            padding: '24px 30px',
            boxShadow: '0 14px 32px rgba(0, 0, 0, 0.14), 0 2px 6px rgba(0,0,0,0.06)',
            borderLeft: '1.5px solid #121212',
            borderRight: '1.5px solid #121212',
            transform: 'rotate(-0.4deg)',
            boxSizing: 'border-box',
          }}
        >
          {/* Top & Bottom Ripped Edges on Letter Sheet */}
          <TornEdgeTop color="#fffdf9" fiberColor="#ffffff" height={14} />
          <TornEdgeBottom color="#fffdf9" fiberColor="#ffffff" height={14} />

          {/* Tape holding the letter: Black tape + Washi tape */}
          <BlackTape top="-10px" left="25px" width="60px" rotate={-3} />
          <WashiTape top="-10px" left="calc(100% - 85px)" rotate={3} width="70px" color="rgba(255, 235, 205, 0.85)" />

          {/* Watermark Monogram */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            opacity: 0.1,
            fontSize: '60px',
            userSelect: 'none',
            pointerEvents: 'none',
            color: '#121212',
          }}>
            ❦
          </div>

          <p style={{
            margin: '0 0 10px',
            fontSize: '17px',
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            color: '#121212',
          }}>
            Dearest {recipientName},
          </p>

          {isEditing ? (
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(SecurityEngine.sanitizeText(e.target.value, 1500))}
              rows={6}
              style={{
                width: '100%',
                padding: '8px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '17px',
                lineHeight: 1.6,
                color: '#121212',
                border: '1.5px dashed #121212',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '0px',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          ) : (
            <div style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: '#222222',
              whiteSpace: 'pre-line',
              fontStyle: 'italic',
            }}>
              {letterText}
            </div>
          )}

          {/* Customize Letter Button (Minimalist Stamp Style) */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: '#121212',
                color: '#fff',
                border: 'none',
                fontSize: '10px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                letterSpacing: '1px',
                padding: '4px 10px',
                cursor: 'pointer',
                clipPath: 'polygon(0% 2px, 3% 0%, 97% 0%, 100% 2px, 98% 98%, 100% 100%, 2% 100%, 0% 98%)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              {isEditing ? '✓ SAVE LETTER' : '✎ CUSTOMIZE MESSAGE'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div 
        className="love-letter-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1.5px solid #121212',
          paddingTop: '12px',
        }}
      >
        {/* Left: Circular Arrow Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CircleArrowButton
            direction="prev"
            onClick={onPrev}
            size={28}
          />
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '2px',
          }}>
            BACK
          </span>
        </div>

        {/* Center: Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#121212',
          }}>
            02 / 03
          </span>
          <span 
            className="love-letter-chapter-sub"
            style={{
              fontSize: '10px',
              color: '#666',
              fontFamily: "'Montserrat', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            • CHAPTER TWO
          </span>
        </div>

        {/* Right: Next Chapter Button */}
        <EditorialButton
          variant="black"
          onClick={onNext}
          arrow
        >
          OUR PLAYLIST
        </EditorialButton>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .love-letter-page {
            padding: 16px 14px 24px 14px !important;
          }
          .love-letter-header {
            padding-bottom: 8px !important;
          }
          .love-letter-header span {
            font-size: 10px !important;
          }
          .love-letter-sheet {
            padding: 16px 14px !important;
            margin-top: 6px !important;
          }
          .love-letter-sheet p {
            font-size: 15px !important;
            margin-bottom: 6px !important;
          }
          .love-letter-sheet div {
            font-size: 15px !important;
            line-height: 1.6 !important;
          }
          .love-letter-chapter-sub {
            display: none !important;
          }
          .love-letter-footer {
            padding-top: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
