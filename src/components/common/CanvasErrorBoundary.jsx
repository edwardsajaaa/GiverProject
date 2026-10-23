import React from 'react';

/**
 * CanvasErrorBoundary
 * Menangkap crash runtime pada level 3D Canvas (shader failure, invalid geometry, corrupt GLTF URL, Three.js exceptions).
 * Mencegah White Screen of Death (WSOD) dan memberikan kontrol pemulihan kepada user.
 */
export class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('⚠️ [3D Canvas ErrorBoundary caught an exception]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleResetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleClearCorruptedScene = () => {
    try {
      localStorage.removeItem('giver_sandbox_save_v3');
      localStorage.removeItem('giver_sandbox_central_hero_v3');
      window.location.reload();
    } catch (e) {
      console.error('Gagal menghapus localStorage:', e);
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const isNight = this.props.isNight ?? true;
      return (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: isNight ? 'rgba(10, 10, 15, 0.94)' : 'rgba(245, 245, 247, 0.94)',
          backdropFilter: 'blur(20px)',
          color: isNight ? '#F5F5F7' : '#1D1D1F',
          fontFamily: 'inherit'
        }}>
          <div style={{
            maxWidth: 480,
            width: '100%',
            background: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
            border: isNight ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 24,
            padding: 32,
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              💥
            </div>

            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#ef4444' }}>
              Grafis 3D Mengalami Masalah
            </h3>

            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, opacity: 0.8 }}>
              Terjadi kesalahan saat memproses model atau shader 3D. Seluruh antarmuka tetap aman dan data Anda tidak hilang.
            </p>

            {this.state.error && (
              <div style={{
                width: '100%',
                maxHeight: 100,
                overflowY: 'auto',
                fontSize: 11,
                fontFamily: 'monospace',
                background: isNight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
                padding: '8px 12px',
                borderRadius: 8,
                textAlign: 'left',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={this.handleResetError}
                style={{
                  flex: '1 1 140px',
                  padding: '12px 18px',
                  borderRadius: 14,
                  background: '#38bdf8',
                  border: 'none',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)'
                }}
              >
                🔄 Coba Pulihkan
              </button>

              <button
                onClick={this.handleClearCorruptedScene}
                style={{
                  flex: '1 1 140px',
                  padding: '12px 18px',
                  borderRadius: 14,
                  background: isNight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                  border: isNight ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.12)',
                  color: isNight ? '#fff' : '#111',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                🗑️ Reset Data Objek
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
