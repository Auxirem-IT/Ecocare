import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingDown, Award } from 'lucide-react';

const deptData = [
  { dept: 'Engineering', co2: 120, participation: 78 },
  { dept: 'Marketing', co2: 85, participation: 92 },
  { dept: 'Sales', co2: 95, participation: 65 },
  { dept: 'Operations', co2: 150, participation: 55 },
  { dept: 'HR', co2: 40, participation: 88 },
];

const trendData = [
  { month: 'Sep', co2: 520 }, { month: 'Oct', co2: 490 }, { month: 'Nov', co2: 460 },
  { month: 'Dec', co2: 480 }, { month: 'Jan', co2: 430 }, { month: 'Feb', co2: 395 },
];

const chartStyle = { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' };

export default function CorporateDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Corporate Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Your company's environmental performance at a glance.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'ESG Score', value: '82/100', icon: Award },
            { label: 'Total Employees', value: '247', icon: Users },
            { label: 'Monthly CO₂', value: '395 kg', icon: TrendingDown },
            { label: 'Participation', value: '76%', icon: Building2 },
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
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Department Carbon Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dept" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={chartStyle} />
                <Bar dataKey="co2" fill="hsl(153, 40%, 30%)" radius={[4, 4, 0, 0]} name="CO₂ (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Monthly Carbon Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="corpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(83, 78%, 55%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(83, 78%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={chartStyle} />
                <Area type="monotone" dataKey="co2" stroke="hsl(83, 78%, 55%)" fill="url(#corpGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Green Initiatives Kanban */}
        <div className="p-6 rounded-xl bg-card border">
          <h3 className="font-display text-lg font-semibold mb-4">Green Initiatives</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { status: 'Planned', items: ['Solar panel installation', 'EV charging stations'], color: 'bg-muted' },
              { status: 'In Progress', items: ['Paperless office transition', 'Composting program'], color: 'bg-accent/20' },
              { status: 'Done', items: ['LED lighting upgrade', 'Water recycling system'], color: 'bg-primary/10' },
            ].map(col => (
              <div key={col.status}>
                <h4 className="text-sm font-semibold mb-3">{col.status}</h4>
                <div className="space-y-2">
                  {col.items.map(item => (
                    <div key={item} className={`p-3 rounded-lg ${col.color} text-sm`}>{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
