import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { MapPin, Trash2, Users, BarChart3, Trophy } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { mockChallenges } from '@/data/mockData';

const wasteData = [
  { name: 'Recyclable', value: 35, color: 'hsl(153, 40%, 30%)' },
  { name: 'Organic', value: 28, color: 'hsl(83, 78%, 55%)' },
  { name: 'Landfill', value: 22, color: 'hsl(32, 46%, 45%)' },
  { name: 'Hazardous', value: 15, color: 'hsl(0, 84%, 60%)' },
];

const zones = [
  { name: 'North Zone', score: 82, co2: 1200, population: '45K' },
  { name: 'South Zone', score: 76, co2: 1450, population: '52K' },
  { name: 'East Zone', score: 71, co2: 1680, population: '38K' },
  { name: 'West Zone', score: 88, co2: 980, population: '41K' },
  { name: 'Central', score: 65, co2: 2100, population: '68K' },
];

const chartStyle = { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' };

export default function CityDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">City Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Community-wide sustainability metrics and management.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'City Score', value: '76', icon: MapPin },
            { label: 'Total Citizens', value: '244K', icon: Users },
            { label: 'Waste Processed', value: '1.2K tons', icon: Trash2 },
            { label: 'Active Challenges', value: '8', icon: Trophy },
          ].map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-card border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
                <card.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="font-display text-2xl font-bold">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Waste Distribution */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Waste Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={wasteData} cx="50%" cy="50%" outerRadius={90} dataKey="value" strokeWidth={0}>
                  {wasteData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={chartStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Zone Rankings */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Zone Rankings</h3>
            <div className="space-y-2">
              {zones.sort((a, b) => b.score - a.score).map((zone, i) => (
                <div key={zone.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{zone.name}</p>
                    <p className="text-xs text-muted-foreground">Pop: {zone.population}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{zone.score}/100</p>
                    <p className="text-xs text-muted-foreground">{zone.co2} kg CO₂</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
