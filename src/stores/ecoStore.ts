import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ActivityLog {
  id: string;
  date: string;
  category: 'transport' | 'food' | 'energy' | 'shopping' | 'travel';
  description: string;
  value: number;
  co2Impact: number;
}

export interface MonthlyScore {
  month: string;
  score: number;
  co2: number;
  breakdown: { transport: number; food: number; energy: number; shopping: number; travel: number };
}

interface EcoState {
  activityLogs: ActivityLog[];
  monthlyScores: MonthlyScore[];
  habitStreak: number;
  xpPoints: number;
  badgesEarned: string[];
  totalCo2Saved: number;
  logActivity: (log: Omit<ActivityLog, 'id'>) => void;
  updateStreak: () => void;
  earnBadge: (badge: string) => void;
  addXP: (points: number) => void;
}

export const useEcoStore = create<EcoState>()(
  persist(
    (set) => ({
      activityLogs: [],
      monthlyScores: [
        { month: 'Sep', score: 62, co2: 76, breakdown: { transport: 25, food: 18, energy: 20, shopping: 8, travel: 5 } },
        { month: 'Oct', score: 65, co2: 70, breakdown: { transport: 22, food: 17, energy: 19, shopping: 7, travel: 5 } },
        { month: 'Nov', score: 68, co2: 64, breakdown: { transport: 20, food: 16, energy: 18, shopping: 6, travel: 4 } },
        { month: 'Dec', score: 64, co2: 72, breakdown: { transport: 24, food: 18, energy: 20, shopping: 6, travel: 4 } },
        { month: 'Jan', score: 71, co2: 58, breakdown: { transport: 18, food: 15, energy: 16, shopping: 5, travel: 4 } },
        { month: 'Feb', score: 74, co2: 52, breakdown: { transport: 16, food: 14, energy: 14, shopping: 5, travel: 3 } },
      ],
      habitStreak: 12,
      xpPoints: 2450,
      badgesEarned: ['eco_starter', 'week_warrior', 'carbon_cutter'],
      totalCo2Saved: 128,
      logActivity: (log) => set(s => ({
        activityLogs: [...s.activityLogs, { ...log, id: crypto.randomUUID() }],
      })),
      updateStreak: () => set(s => ({ habitStreak: s.habitStreak + 1 })),
      earnBadge: (badge) => set(s => ({
        badgesEarned: s.badgesEarned.includes(badge) ? s.badgesEarned : [...s.badgesEarned, badge],
      })),
      addXP: (points) => set(s => ({ xpPoints: s.xpPoints + points })),
    }),
    { name: 'eco-data' }
  )
);
