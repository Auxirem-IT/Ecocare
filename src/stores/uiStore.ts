import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isDark: boolean;
  sidebarOpen: boolean;
  toggleDark: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isDark: false,
      sidebarOpen: true,
      toggleDark: () => set(s => {
        const next = !s.isDark;
        document.documentElement.classList.toggle('dark', next);
        return { isDark: next };
      }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'eco-ui' }
  )
);

// Initialize dark mode on load
const stored = JSON.parse(localStorage.getItem('eco-ui') || '{}');
if (stored?.state?.isDark) {
  document.documentElement.classList.add('dark');
}
