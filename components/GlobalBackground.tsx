import React from 'react';

interface GlobalBackgroundProps {
  children?: React.ReactNode;
}

/**
 * GlobalBackground - Dark subtle vertical grid
 * 
 * Features:
 * - Base color: #1b1b1b
 * - 2px-wide lighter stripes repeated every 41px
 * - Very subtle column rhythm
 * - Optional top-right corner glow
 */
const GlobalBackground: React.FC<GlobalBackgroundProps> = ({ children }) => {
  return (
    <div className="global-background">
      {/* Top right corner glow */}
      <div className="bg-glow" />
      
      {/* Content wrapper */}
      <div className="bg-content">
        {children}
      </div>
      
      <style jsx>{`
        .global-background {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          
          /* Dark subtle vertical grid */
          --bg-base: #1b1b1b;
          --bg-stripe: rgba(255, 255, 255, 0.005);
          --stripe-width: 2px;
          --stripe-period: 41px;
          --stripe-offset: 2px;
          
          background-color: var(--bg-base);
          background-image:
            repeating-linear-gradient(
              90deg,
              transparent 0,
              transparent var(--stripe-offset),
              var(--bg-stripe) var(--stripe-offset),
              var(--bg-stripe) calc(var(--stripe-offset) + var(--stripe-width)),
              transparent calc(var(--stripe-offset) + var(--stripe-width)),
              transparent var(--stripe-period)
            );
          background-repeat: repeat;
        }

        /* Top right corner glow (below login button) */
        .bg-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(
            ellipse 50% 60% at 85% 8%,
            rgba(20, 184, 166, 0.12) 0%,
            rgba(20, 184, 166, 0.06) 25%,
            rgba(20, 184, 166, 0.02) 50%,
            transparent 70%
          );
          z-index: -1;
          pointer-events: none;
        }

        /* Content layer */
        .bg-content {
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default GlobalBackground;
