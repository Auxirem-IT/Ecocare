import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Zap, TrendingDown, Brain, Check, Square } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EcoScoreGauge } from '@/components/charts/EcoScoreGauge';
import { CarbonDonut } from '@/components/charts/CarbonDonut';
import { PlanGate } from '@/components/PlanGate';
import { useEcoStore } from '@/stores/ecoStore';
import { useAuthStore } from '@/stores/authStore';
import { getAIResponse } from '@/services/aiService';
import { mockTasks } from '@/data/mockData';

const weeklyData = [
  { day: 'Mon', co2: 4.2 }, { day: 'Tue', co2: 3.8 }, { day: 'Wed', co2: 5.1 },
  { day: 'Thu', co2: 2.9 }, { day: 'Fri', co2: 3.5 }, { day: 'Sat', co2: 4.8 }, { day: 'Sun', co2: 2.1 },
];

export default function IndividualDashboard() {
  const { monthlyScores, habitStreak, xpPoints, totalCo2Saved } = useEcoStore();
  const user = useAuthStore(s => s.user);
  const [tasks, setTasks] = useState(mockTasks);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const latestScore = monthlyScores[monthlyScores.length - 1];
  const chartStyle = { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' };

  const handleAI = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResponse('');
    const response = await getAIResponse(aiInput);
    setAiResponse(response);
    setAiLoading(false);
    setAiInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's your sustainability snapshot for this month.</p>
        </div>

        {/* Top cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Eco Score', value: `${latestScore?.score || 74}`, icon: Zap, color: 'text-accent' },
            { label: 'Habit Streak', value: `${habitStreak} days`, icon: Flame, color: 'text-secondary' },
            { label: 'XP Points', value: xpPoints.toLocaleString(), icon: TrendingDown, color: 'text-primary' },
            { label: 'CO₂ Saved', value: `${totalCo2Saved} kg`, icon: TrendingDown, color: 'text-primary' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-card border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <p className="font-display text-2xl font-bold">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Eco Score Gauge */}
          <div className="p-6 rounded-xl bg-card border flex flex-col items-center justify-center">
            <h3 className="font-display text-lg font-semibold mb-4">Your Eco Score</h3>
            <EcoScoreGauge score={latestScore?.score || 74} />
          </div>

          {/* Carbon Breakdown */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Carbon Breakdown</h3>
            <CarbonDonut breakdown={latestScore?.breakdown || { transport: 16, food: 14, energy: 14, shopping: 5, travel: 3 }} />
          </div>

          {/* Today's Tasks */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Today's Green Tasks</h3>
            <div className="space-y-2">
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  {task.completed ? (
                    <div className="w-5 h-5 rounded bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={`text-sm flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</span>
                  <span className="text-xs text-muted-foreground">+{task.xp} XP</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Monthly CO₂ Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyScores}>
                <defs>
                  <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(153, 40%, 30%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(153, 40%, 30%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={chartStyle} />
                <Area type="monotone" dataKey="co2" stroke="hsl(153, 40%, 30%)" fill="url(#co2Gradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Activity */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={chartStyle} />
                <Bar dataKey="co2" fill="hsl(83, 78%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Quick Tip */}
        <PlanGate feature="ai_input">
          <div className="p-6 rounded-xl bg-card border">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">AI Eco Assistant</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tell me about your daily activities and I'll calculate the environmental impact.
            </p>
            <div className="flex gap-3">
              <input
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAI()}
                placeholder="e.g., I drove 30km to work today and had a steak for lunch..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
              <button onClick={handleAI} disabled={aiLoading} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                {aiLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            {aiResponse && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-lg bg-muted text-sm whitespace-pre-line leading-relaxed">
                {aiResponse}
              </motion.div>
            )}
          </div>
        </PlanGate>

        {/* Comparison widget */}
        <div className="p-6 rounded-xl bg-card border">
          <h3 className="font-display text-lg font-semibold mb-2">Your Footprint vs. Average</h3>
          <p className="text-sm text-muted-foreground mb-4">Compared to the average urban user (55 kg CO₂/month)</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>You</span>
                <span className="font-medium">{latestScore?.co2 || 52} kg</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, ((latestScore?.co2 || 52) / 100) * 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average User</span>
                <span className="font-medium text-muted-foreground">55 kg</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-secondary transition-all" style={{ width: '55%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
