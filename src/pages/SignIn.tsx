import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const [showPw, setShowPw] = useState(false);
  const login = useAuthStore(s => s.login);
  const user = useAuthStore(s => s.user);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const success = login(data.email, data.password);
    if (success) {
      toast.success('Welcome back! 🌱');
      const u = useAuthStore.getState().user;
      navigate(`/dashboard/${u?.role || 'individual'}`);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">ECOCARE</span>
        </Link>

        <div className="p-8 rounded-2xl bg-card border shadow-sm">
          <h1 className="font-display text-2xl font-bold mb-1 text-center">Welcome Back</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Sign in to continue your eco journey</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input {...register('email')} type="email" className="w-full px-4 py-2.5 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring text-sm" placeholder="you@email.com" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input {...register('password')} type={showPw ? 'text' : 'password'} className="w-full px-4 py-2.5 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-ring text-sm pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <button type="button" onClick={() => toast.info('Password reset email sent (simulated)')} className="text-sm text-primary hover:underline">
                Forgot Password?
              </button>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              Sign In
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => toast.info('Google sign-in coming soon!')} className="py-2.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
              Google
            </button>
            <button onClick={() => toast.info('GitHub sign-in coming soon!')} className="py-2.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
              GitHub
            </button>
          </div>

          <p className="text-sm text-center mt-6 text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
