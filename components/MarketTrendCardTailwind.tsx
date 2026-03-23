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
    
    // Create smooth bezier curve path
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      path += ` Q ${prev.x + (curr.x - prev.x) * 0.5} ${prev.y}, ${cpx} ${(prev.y + curr.y) / 2}`;
    }
    
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

  return (
    <div className="group relative w-full min-w-[220px] max-w-[280px]">
      {/* Card Container */}
      <div 
        className={`
          relative overflow-hidden
          bg-[rgba(30,35,41,0.85)] backdrop-blur-xl
          border border-white/[0.08] rounded-[20px]
          p-5
          shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]
          transition-all duration-300 ease-out
          transform translate-y-0
          group-hover:translate-y-[-6px]
          group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(20,184,166,0.15)]
          group-hover:border-teal-500/30
        `}
      >
        {/* Top Section - Coin Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Coin Icon */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: iconBgColor }}
            >
              {iconUrl ? (
                <img src={iconUrl} alt={coinName} className="w-6 h-6 object-contain" />
              ) : (
                <span className="text-white font-bold text-lg">{symbol.charAt(0)}</span>
              )}
            </div>
            
            {/* Coin Details */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wide">{symbol}</span>
              <span className="px-2 py-0.5 bg-teal-500/15 rounded-md text-[0.6rem] font-semibold text-teal-400 uppercase tracking-wider">
                {coinName.toUpperCase()}
              </span>
            </div>
          </div>
          
          {/* Arrow Icon */}
          {isPositive && (
            <div className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-lg transition-all group-hover:border-teal-500/40 group-hover:bg-teal-500/10">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white/60">
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
        <div className="py-2">
          <div 
            className={`
              h-0.5 rounded-sm transition-all duration-300
              w-[60%] group-hover:w-[80%]
              opacity-70 group-hover:opacity-100
              ${isPositive 
                ? 'bg-gradient-to-r from-teal-400 via-teal-400/50 to-transparent shadow-[0_0_8px_rgba(20,184,166,0.4)] group-hover:shadow-[0_0_15px_rgba(20,184,166,0.6)]' 
                : 'bg-gradient-to-r from-red-500 via-red-500/50 to-transparent shadow-[0_0_8px_rgba(239,68,68,0.4)] group-hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]'
              }
            `}
          />
        </div>

        {/* Bottom Section - Price & Sparkline */}
        <div className="flex items-end justify-between gap-4">
          {/* Price Info */}
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-bold text-white tracking-tight">
              {formatPrice(price)}
            </span>
            <span className={`text-sm font-semibold ${isPositive ? 'text-teal-400' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
            </span>
          </div>

          {/* Sparkline Chart */}
          <div className="flex-1 max-w-[100px] h-[45px] flex items-end">
            <svg 
              viewBox="0 0 100 40" 
              className="w-full h-full"
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
                stroke={isPositive ? '#14b8a6' : '#ef4444'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#glow-${symbol})`}
                className="transition-all duration-300 group-hover:[stroke-width:3]"
              />
            </svg>
          </div>
        </div>

        {/* Bottom Neon Line */}
        <div 
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2
            h-0.5 rounded-t transition-all duration-300
            w-[60%] group-hover:w-[80%]
            opacity-60 group-hover:opacity-100
            ${isPositive 
              ? 'bg-teal-400 shadow-[0_0_10px_#14b8a6] group-hover:shadow-[0_0_20px_#14b8a6,0_0_30px_#14b8a6]' 
              : 'bg-red-500 shadow-[0_0_10px_#ef4444] group-hover:shadow-[0_0_20px_#ef4444,0_0_30px_#ef4444]'
            }
          `}
        />
      </div>
    </div>
  );
};

export default MarketTrendCard;

// Example usage with sample data
export const MarketTrendCardGrid: React.FC = () => {
  const coins = [
    {
      coinName: 'Bitcoin',
      symbol: 'BTC',
      price: 56623.54,
      percentChange: 1.41,
      trendData: [30, 28, 32, 25, 28, 22, 20, 18, 22, 15, 18, 12],
      isPositive: true,
      iconBgColor: '#F7931A',
    },
    {
      coinName: 'Ethereum',
      symbol: 'ETH',
      price: 4267.90,
      percentChange: 2.22,
      trendData: [25, 28, 22, 30, 25, 20, 22, 18, 15, 20, 12, 8],
      isPositive: true,
      iconBgColor: '#627EEA',
    },
    {
      coinName: 'Binance',
      symbol: 'BNB',
      price: 587.74,
      percentChange: 0.82,
      trendData: [28, 25, 30, 22, 26, 20, 24, 18, 22, 15, 18, 14],
      isPositive: true,
      iconBgColor: '#F3BA2F',
    },
    {
      coinName: 'Tether',
      symbol: 'USDT',
      price: 0.9998,
      percentChange: -0.03,
      trendData: [22, 21, 23, 22, 21, 22, 21, 22, 20, 21, 22, 23],
      isPositive: false,
      iconBgColor: '#26A17B',
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 p-8 bg-[#0f1419] min-h-screen">
      {coins.map((coin) => (
        <MarketTrendCard key={coin.symbol} {...coin} />
      ))}
    </div>
  );
};
