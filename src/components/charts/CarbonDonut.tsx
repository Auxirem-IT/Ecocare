import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CarbonDonutProps {
  breakdown: { transport: number; food: number; energy: number; shopping: number; travel: number };
}

const CATEGORIES = [
  { key: 'transport', label: 'Transport', color: 'hsl(153, 40%, 30%)' },
  { key: 'food', label: 'Food', color: 'hsl(83, 78%, 55%)' },
  { key: 'energy', label: 'Energy', color: 'hsl(32, 46%, 45%)' },
  { key: 'shopping', label: 'Shopping', color: 'hsl(150, 40%, 17%)' },
  { key: 'travel', label: 'Travel', color: 'hsl(37, 52%, 70%)' },
];

export function CarbonDonut({ breakdown }: CarbonDonutProps) {
  const data = CATEGORIES.map(c => ({
    name: c.label,
    value: breakdown[c.key as keyof typeof breakdown],
    color: c.color,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontSize: '12px',
          }}
          formatter={(value: number) => [`${value} kg CO₂`, '']}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
