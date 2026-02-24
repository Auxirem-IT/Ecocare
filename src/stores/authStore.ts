import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'individual' | 'corporate' | 'school' | 'city';
export type Plan = 'free' | 'pro' | 'corporate' | 'school';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  plan: Plan;
  avatar?: string;
  joinedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => boolean;
  signup: (data: { name: string; email: string; password: string; role: Role; plan: Plan }) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  upgradePlan: (plan: Plan) => void;
}

// Store passwords separately (mock)
const getPasswords = (): Record<string, string> => {
  try { return JSON.parse(localStorage.getItem('eco_passwords') || '{}'); } catch { return {}; }
};
const setPassword = (email: string, password: string) => {
  const p = getPasswords();
  p[email] = password;
  localStorage.setItem('eco_passwords', JSON.stringify(p));
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [],
      login: (email, password) => {
        const passwords = getPasswords();
        if (passwords[email] !== password) return false;
        const user = get().users.find(u => u.email === email);
        if (!user) return false;
        set({ user, isAuthenticated: true });
        return true;
      },
      signup: (data) => {
        const exists = get().users.some(u => u.email === data.email);
        if (exists) return false;
        const user: User = {
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          role: data.role,
          plan: data.plan,
          joinedAt: new Date().toISOString(),
        };
        setPassword(data.email, data.password);
        set(s => ({ users: [...s.users, user], user, isAuthenticated: true }));
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) => set(s => ({ user: s.user ? { ...s.user, ...updates } : null })),
      upgradePlan: (plan) => set(s => ({ user: s.user ? { ...s.user, plan } : null })),
    }),
    { name: 'eco-auth' }
  )
);
