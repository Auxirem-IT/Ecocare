import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Users, Activity, Award } from 'lucide-react';
import { mockLeaderboard, mockChallenges } from '@/data/mockData';

export default function SchoolDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">School Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Track student engagement and eco activities.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'School Score', value: '78', icon: GraduationCap },
            { label: 'Active Students', value: '342', icon: Users },
            { label: 'Challenges Active', value: '6', icon: Trophy },
            { label: 'Badges Earned', value: '1,240', icon: Award },
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
          {/* Leaderboard */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Class Leaderboard</h3>
            <div className="space-y-2">
              {mockLeaderboard.map(team => (
                <div key={team.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    team.rank === 1 ? 'bg-accent text-accent-foreground' : team.rank === 2 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {team.rank}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.members} members</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{team.score}</p>
                    <p className="text-xs text-muted-foreground">{team.co2Saved} kg saved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Challenges */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-display text-lg font-semibold mb-4">Active Challenges</h3>
            <div className="space-y-3">
              {mockChallenges.map(c => (
                <div key={c.id} className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">{c.title}</h4>
                    <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">{c.daysLeft}d left</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{c.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{c.participants} participants</span>
                    <span className="font-medium">+{c.xpReward} XP</span>
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
