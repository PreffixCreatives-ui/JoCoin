import React from 'react';

interface MarketTrendCardProps {
  coinName: string;
  symbol: string;
  price: number;
  percentChange: number;
  trendData: number[];
  isPositive: boolean;
  iconUrl?: string;
  iconBgColor?: string;
}

const MarketTrendCard: React.FC<MarketTrendCardProps> = ({
  coinName,
  symbol,
  price,
  percentChange,
  trendData,
  isPositive,
  iconUrl,
  iconBgColor = '#F7931A',
}) => {
  // Generate sparkline path from trend data
  const generateSparklinePath = (data: number[]): string => {
    if (data.length < 2) return '';
    
    const width = 100;
    const height = 40;
    const padding = 2;
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return { x, y };
    });
    
    // Create smooth bezier curve
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      path += ` Q ${prev.x + (curr.x - prev.x) * 0.5} ${prev.y}, ${cpx} ${(prev.y + curr.y) / 2}`;
    }
    
    // Finish with last point
    const last = points[points.length - 1];
    path += ` L ${last.x} ${last.y}`;
    
    return path;
  };

  const formatPrice = (value: number): string => {
    if (value >= 1000) {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${value.toFixed(4)}`;
  };

  const sparklinePath = generateSparklinePath(trendData);
  const accentColor = isPositive ? '#14b8a6' : '#ef4444';

  return (
    <div className="market-trend-card group">
      {/* Card Container */}
      <div className="card-inner">
        {/* Top Section - Coin Info */}
        <div className="coin-info">
          <div className="coin-left">
            {/* Coin Icon */}
            <div 
              className="coin-icon"
              style={{ backgroundColor: iconBgColor }}
            >
              {iconUrl ? (
                <img src={iconUrl} alt={coinName} className="icon-image" />
              ) : (
                <span className="icon-fallback">{symbol.charAt(0)}</span>
              )}
            </div>
            
            {/* Coin Details */}
            <div className="coin-details">
              <span className="coin-symbol">{symbol}</span>
              <span className="coin-badge">{coinName.toUpperCase()}</span>
            </div>
          </div>
          
          {/* Arrow Icon */}
          {isPositive && (
            <div className="trend-arrow">
              <svg viewBox="0 0 24 24" fill="none" className="arrow-icon">
                <path 
                  d="M7 17L17 7M17 7H7M17 7V17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Divider Line */}
        <div className="divider-container">
          <div 
            className="divider-line"
            style={{ 
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80, transparent)` 
            }}
          />
        </div>

        {/* Bottom Section - Price & Sparkline */}
        <div className="price-section">
          {/* Price Info */}
          <div className="price-info">
            <span className="price-value">{formatPrice(price)}</span>
            <span 
              className="percent-change"
              style={{ color: accentColor }}
            >
              {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
            </span>
          </div>

          {/* Sparkline Chart */}
          <div className="sparkline-container">
            <svg 
              viewBox="0 0 100 40" 
              className="sparkline-svg"
              preserveAspectRatio="none"
            >
              {/* Glow filter */}
              <defs>
                <filter id={`glow-${symbol}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Sparkline path */}
              <path
                d={sparklinePath}
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#glow-${symbol})`}
                className="sparkline-path"
              />
            </svg>
          </div>
        </div>

        {/* Bottom Neon Line */}
        <div 
          className="bottom-glow"
          style={{ background: accentColor }}
        />
      </div>

      <style jsx>{`
        .market-trend-card {
          position: relative;
          width: 100%;
          min-width: 220px;
          max-width: 280px;
        }

        .card-inner {
          position: relative;
          background: rgba(30, 35, 41, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 1.25rem;
          overflow: hidden;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
        }

        .group:hover .card-inner {
          transform: translateY(-6px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(20, 184, 166, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border-color: rgba(20, 184, 166, 0.3);
        }

        /* Coin Info Section */
        .coin-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .coin-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .coin-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .icon-image {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .icon-fallback {
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .coin-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .coin-symbol {
          font-weight: 700;
          font-size: 1rem;
          color: #ffffff;
          letter-spacing: 0.02em;
        }

        .coin-badge {
          padding: 0.2rem 0.5rem;
          background: rgba(20, 184, 166, 0.15);
          border-radius: 6px;
          font-size: 0.6rem;
          font-weight: 600;
          color: #14b8a6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .trend-arrow {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          transition: all 0.3s;
        }

        .group:hover .trend-arrow {
          border-color: rgba(20, 184, 166, 0.4);
          background: rgba(20, 184, 166, 0.1);
        }

        .arrow-icon {
          width: 14px;
          height: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Divider Line */
        .divider-container {
          padding: 0.5rem 0;
        }

        .divider-line {
          height: 2px;
          width: 60%;
          border-radius: 1px;
          opacity: 0.7;
          transition: all 0.3s;
          box-shadow: 0 0 8px rgba(20, 184, 166, 0.4);
        }

        .group:hover .divider-line {
          opacity: 1;
          width: 80%;
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.6);
        }

        /* Price Section */
        .price-section {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
        }

        .price-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .price-value {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .percent-change {
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Sparkline */
        .sparkline-container {
          flex: 1;
          max-width: 100px;
          height: 45px;
          display: flex;
          align-items: flex-end;
        }

        .sparkline-svg {
          width: 100%;
          height: 100%;
        }

        .sparkline-path {
          transition: all 0.3s;
        }

        .group:hover .sparkline-path {
          stroke-width: 3;
          filter: drop-shadow(0 0 8px currentColor);
        }

        /* Bottom Glow Line */
        .bottom-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 2px;
          border-radius: 2px 2px 0 0;
          opacity: 0.6;
          transition: all 0.3s;
          box-shadow: 0 0 10px currentColor;
        }

        .group:hover .bottom-glow {
          width: 80%;
          opacity: 1;
          box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .market-trend-card {
            max-width: 100%;
          }
          
          .price-value {
            font-size: 1.2rem;
          }
          
          .sparkline-container {
            max-width: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketTrendCard;

// Example usage component
export const MarketTrendCardExample: React.FC = () => {
  const sampleData = {
    bitcoin: {
      coinName: 'Bitcoin',
      symbol: 'BTC',
      price: 56623.54,
      percentChange: 1.41,
      trendData: [30, 28, 32, 25, 28, 22, 20, 18, 22, 15, 18, 12],
      isPositive: true,
      iconBgColor: '#F7931A',
    },
    ethereum: {
      coinName: 'Ethereum',
      symbol: 'ETH',
      price: 4267.90,
      percentChange: 2.22,
      trendData: [25, 28, 22, 30, 25, 20, 22, 18, 15, 20, 12, 8],
      isPositive: true,
      iconBgColor: '#627EEA',
    },
    bnb: {
      coinName: 'Binance',
      symbol: 'BNB',
      price: 587.74,
      percentChange: 0.82,
      trendData: [28, 25, 30, 22, 26, 20, 24, 18, 22, 15, 18, 14],
      isPositive: true,
      iconBgColor: '#F3BA2F',
    },
    usdt: {
      coinName: 'Tether',
      symbol: 'USDT',
      price: 0.9998,
      percentChange: 0.03,
      trendData: [22, 21, 23, 22, 21, 22, 21, 22, 20, 21, 19, 20],
      isPositive: true,
      iconBgColor: '#26A17B',
    },
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '1.5rem', 
      flexWrap: 'wrap',
      padding: '2rem',
      background: '#0f1419',
      minHeight: '100vh',
    }}>
      {Object.values(sampleData).map((coin) => (
        <MarketTrendCard key={coin.symbol} {...coin} />
      ))}
    </div>
  );
};
