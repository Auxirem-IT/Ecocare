import { usePlanAccess } from '@/hooks/usePlanAccess';
import { Lock } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import type { Plan } from '@/stores/authStore';

export function PlanGate({ feature, children }: { feature: string; children: React.ReactNode }) {
  const { hasAccess, requiredPlan } = usePlanAccess(feature);
  const upgradePlan = useAuthStore(s => s.upgradePlan);

  if (hasAccess) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-50">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-sm rounded-lg">
        <Lock className="w-8 h-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground font-medium">Requires {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} Plan</p>
        <button
          onClick={() => upgradePlan(requiredPlan as Plan)}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Upgrade to {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)}
        </button>
      </div>
    </div>
  );
}
