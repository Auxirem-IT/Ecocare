import { useEffect, useState, useRef } from 'react';
import { Users, Leaf, Trophy, MapPin } from 'lucide-react';

const stats = [
  { icon: Users, value: 12400, suffix: '+', label: 'Active Users' },
  { icon: Leaf, value: 850, suffix: ' Tons', label: 'CO₂ Saved' },
  { icon: Trophy, value: 3200, suffix: '+', label: 'Challenges Completed' },
  { icon: MapPin, value: 48, suffix: '', label: 'Cities Active' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [started, target]);

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <stat.icon className="w-6 h-6 mx-auto opacity-80" />
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm opacity-80 font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
