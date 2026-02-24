import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, Role } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import {
  Leaf, LayoutDashboard, BarChart3, Brain, Trash2, Lightbulb, Users, FileText,
  Settings, Sun, Moon, Bell, ChevronLeft, ChevronRight, LogOut, Building2,
  Award, MapPin, Gauge, Menu
} from 'lucide-react';

const ROLE_MENUS: Record<Role, { label: string; icon: any; path: string }[]> = {
  individual: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '' },
    { label: 'Carbon Analyzer', icon: BarChart3, path: '/carbon' },
    { label: 'Eco Coach', icon: Brain, path: '/coach' },
    { label: 'Waste Tracker', icon: Trash2, path: '/waste' },
    { label: 'Recommendations', icon: Lightbulb, path: '/recommendations' },
    { label: 'Community', icon: Users, path: '/community' },
    { label: 'Reports', icon: FileText, path: '/reports' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  corporate: [
    { label: 'Overview', icon: LayoutDashboard, path: '' },
    { label: 'ESG Dashboard', icon: Gauge, path: '/esg' },
    { label: 'Team Analytics', icon: BarChart3, path: '/team' },
    { label: 'Green Initiatives', icon: Lightbulb, path: '/initiatives' },
    { label: 'Carbon Reports', icon: FileText, path: '/reports' },
    { label: 'Certifications', icon: Award, path: '/certs' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  school: [
    { label: 'Overview', icon: LayoutDashboard, path: '' },
    { label: 'Student Challenges', icon: Users, path: '/challenges' },
    { label: 'Class Leaderboard', icon: Award, path: '/leaderboard' },
    { label: 'Eco Activities', icon: Brain, path: '/activities' },
    { label: 'Awareness Tracker', icon: BarChart3, path: '/awareness' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  city: [
    { label: 'City Overview', icon: MapPin, path: '' },
    { label: 'Waste Analytics', icon: Trash2, path: '/waste' },
    { label: 'Community Challenges', icon: Users, path: '/challenges' },
    { label: 'City Rankings', icon: Award, path: '/rankings' },
    { label: 'Zone Reports', icon: FileText, path: '/zones' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
};

const ROLE_BADGES: Record<Role, { label: string; color: string }> = {
  individual: { label: 'Individual', color: 'bg-primary text-primary-foreground' },
  corporate: { label: 'Corporate', color: 'bg-secondary text-secondary-foreground' },
  school: { label: 'School', color: 'bg-accent text-accent-foreground' },
  city: { label: 'City Admin', color: 'bg-muted text-foreground' },
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const { isDark, toggleDark, sidebarOpen, setSidebarOpen } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();
  const role = user?.role || 'individual';
  const menu = ROLE_MENUS[role];
  const badge = ROLE_BADGES[role];
  const basePath = `/dashboard/${role}`;

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 256 : 64 }}
          className="fixed left-0 top-0 bottom-0 z-40 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 h-16 px-4 border-b border-sidebar-border">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && <span className="font-display text-lg font-bold truncate">ECOCARE</span>}
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
            {menu.map(item => {
              const fullPath = `${basePath}${item.path}`;
              const isActive = location.pathname === fullPath;
              return (
                <Link
                  key={item.label}
                  to={fullPath}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  }`}
                  title={item.label}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-sidebar-border space-y-2">
            {sidebarOpen && (
              <div className={`px-2 py-1 rounded text-xs font-medium w-fit ${badge.color}`}>
                {badge.label} • {user?.plan?.toUpperCase()}
              </div>
            )}
            <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:text-destructive hover:bg-sidebar-accent transition-colors">
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>Sign Out</span>}
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass border-b h-14 flex items-center justify-between px-4 gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}>{badge.label}</div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        <main className="p-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
