import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import type { Role } from '@/stores/authStore';

export function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: Role[] }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  return <>{children}</>;
}
