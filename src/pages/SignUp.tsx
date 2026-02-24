import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Leaf, Eye, EyeOff, Check } from 'lucide-react';
import { useAuthStore, Role, Plan } from '@/stores/authStore';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

type FormData = z.infer<typeof schema>;

const ROLES: { value: Role; label: string; description: string }[] = [
  { value: 'individual', label: 'Individual', description: 'Personal carbon tracking' },
  { value: 'corporate', label: 'Company', description: 'ESG & team analytics' },
  { value: 'school', label: 'School', description: 'Student challenges & education' },
  { value: 'city', label: 'City Admin', description: 'Community-wide management' },
];

const PLANS: { value: Plan; label: string; price: string }[] = [
  { value: 'free', label: 'Free', price: '$0' },
  { value: 'pro', label: 'Pro', price: '$9/mo' },
  { value: 'corporate', label: 'Corporate', price: '$49/mo' },
  { value: 'school', label: 'School', price: '$19/mo' },
];

export default function SignUp() {
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<Role>('individual');
  const [plan, setPlan] = useState<Plan>('free');
  const signup = useAuthStore(s => s.signup);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const success = signup({ name: data.name, email: data.email, password: data.password, role, plan });
    if (success) {
      toast.success('Account created! Welcome to ECOCARE 🌱');
      navigate(`/dashboard/${role}`);
    } else {
      toast.error('An account with this email already exists.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">ECOCARE</span>
        </Link>

        <div className="p-8 rounded-2xl bg-card border shadow-sm">
          <h1 className="font-display text-2xl font-bold mb-1 text-center">Create Account</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Start your sustainability journey today</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <input {...register('name')} className="w-full px-4 py-2.5 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring text-sm" placeholder="Jane Doe" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input {...register('email')} type="email" className="w-full px-4 py-2.5 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring text-sm" placeholder="you@email.com" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <input {...register('password')} type={showPw ? 'text' : 'password'} className="w-full px-4 py-2.5 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring text-sm" placeholder="••••••" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Confirm</label>
                <input {...register('confirmPassword')} type="password" className="w-full px-4 py-2.5 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring text-sm" placeholder="••••••" />
                {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Account Type</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      role === r.value ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="text-sm font-medium block">{r.label}</span>
                    <span className="text-xs text-muted-foreground">{r.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plan */}
            <div>
              <label className="text-sm font-medium mb-2 block">Plan</label>
              <div className="flex gap-2">
                {PLANS.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPlan(p.value)}
                    className={`flex-1 p-2.5 rounded-lg border text-center transition-all ${
                      plan === p.value ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="text-xs font-medium block">{p.label}</span>
                    <span className="text-xs text-muted-foreground">{p.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Create Account
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-muted-foreground">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
