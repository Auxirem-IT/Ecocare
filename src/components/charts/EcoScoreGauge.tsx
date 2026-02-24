import { useEffect, useState } from 'react';

interface EcoScoreGaugeProps {
  score: number;
  size?: number;
}

export function EcoScoreGauge({ score, size = 180 }: EcoScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [score]);

  const band = animatedScore <= 30 ? 'Critical' : animatedScore <= 55 ? 'Average' : animatedScore <= 75 ? 'Good' : 'Excellent';
  const bandEmoji = animatedScore <= 30 ? '🔴' : animatedScore <= 55 ? '🟡' : animatedScore <= 75 ? '🟢' : '🌟';

  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius;
  const strokeOffset = circumference - (animatedScore / 100) * circumference;
  const gradientId = `gauge-gradient-${size}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--destructive))" />
            <stop offset="33%" stopColor="hsl(var(--secondary))" />
            <stop offset="66%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className="transition-all duration-300"
        />
        <text x={size / 2} y={size / 2} textAnchor="middle" className="fill-foreground text-3xl font-bold font-display">
          {animatedScore}
        </text>
        <text x={size / 2} y={size / 2 + 18} textAnchor="middle" className="fill-muted-foreground text-xs font-body">
          out of 100
        </text>
      </svg>
      <div className="text-center">
        <span className="text-sm font-semibold">{bandEmoji} {band}</span>
      </div>
    </div>
  );
}
