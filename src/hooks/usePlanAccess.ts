import { useAuthStore, Plan } from '@/stores/authStore';

const PLAN_LEVELS: Record<Plan, number> = {
  free: 0, pro: 1, corporate: 2, school: 2,
};

const FEATURE_REQUIREMENTS: Record<string, Plan> = {
  carbon_basic: 'free',
  ai_input: 'pro',
  ai_insights: 'pro',
  monthly_reports: 'pro',
  esg_dashboard: 'corporate',
  team_analytics: 'corporate',
  export_pdf: 'pro',
  community_full: 'pro',
  smart_recommendations: 'pro',
  green_certificate: 'pro',
};

export function usePlanAccess(featureName: string) {
  const plan = useAuthStore(s => s.user?.plan ?? 'free');
  const requiredPlan = FEATURE_REQUIREMENTS[featureName] ?? 'free';
  const hasAccess = PLAN_LEVELS[plan] >= PLAN_LEVELS[requiredPlan];
  return { hasAccess, requiredPlan, currentPlan: plan };
}
