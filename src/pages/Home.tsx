import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3, Brain, Trash2, Lightbulb, Users, Gauge,
  ArrowRight, Check, Star, ChevronRight
} from 'lucide-react';
import { HeroSlider } from '@/components/HeroSlider';
import { StatsBar } from '@/components/StatsBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockTestimonials, pricingPlans } from '@/data/mockData';
import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  { icon: BarChart3, title: 'Carbon Analyzer', description: 'Calculate your carbon footprint with precision using our structured input system and real emission factors.' },
  { icon: Brain, title: 'Eco Habit Coach', description: 'AI-powered daily habit recommendations that adapt to your lifestyle and help build sustainable routines.' },
  { icon: Trash2, title: 'Waste Tracker', description: 'Log and categorize your waste output. Get insights on recycling rates and reduction opportunities.' },
  { icon: Lightbulb, title: 'Smart Recommendations', description: 'Receive personalized tips based on your data — from energy savings to sustainable shopping alternatives.' },
  { icon: Users, title: 'Community Challenges', description: 'Join eco challenges, compete on leaderboards, and earn XP badges with your community.' },
  { icon: Gauge, title: 'ESG Dashboard', description: 'Corporate-grade ESG reporting with department analytics, trend tracking, and exportable reports.' },
];

const steps = [
  { step: '01', title: 'Create Your Eco Profile', description: 'Tell us about your lifestyle — commute, diet, energy usage, and shopping habits.' },
  { step: '02', title: 'AI Calculates Your Impact', description: 'Our engine processes your data against verified emission factors to compute your footprint.' },
  { step: '03', title: 'Track, Improve & Earn', description: 'Log daily habits, watch your score improve, and earn badges and certificates for your progress.' },
];

export default function Home() {
  const [ctaEmail, setCtaEmail] = useState('');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setTestimonialIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => { clearInterval(interval); emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <HeroSlider />

      {/* Stats */}
      <StatsBar />

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Everything You Need to <span className="text-gradient-primary">Go Green</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Powerful tools that make sustainability measurable, actionable, and rewarding.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-card border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                <button className="mt-4 text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Three simple steps to start your sustainability journey.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />

            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 text-xl font-display font-bold relative z-10">
                  {s.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Loved by Eco Warriors</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Hear from our growing community of sustainability advocates.</p>
          </motion.div>

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {mockTestimonials.map((t) => (
                <div key={t.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3">
                  <div className="p-6 rounded-2xl bg-card border h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 mb-6 italic leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{t.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {mockTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${testimonialIndex === i ? 'bg-primary w-6' : 'bg-muted-foreground/30'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Start free. Upgrade when you're ready for more.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border flex flex-col ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105'
                    : 'bg-card hover:shadow-lg'
                } transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-xl font-semibold mb-1">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'opacity-80' : 'text-muted-foreground'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold">${plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'opacity-70' : 'text-muted-foreground'}`}>/{plan.period}</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? '' : 'text-primary'}`} />
                      <span className={plan.popular ? 'opacity-90' : ''}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`w-full py-3 rounded-lg text-center text-sm font-semibold transition-opacity hover:opacity-90 block ${
                    plan.popular
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
        <div className="container mx-auto px-4 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Start Your Eco Journey Today</h2>
            <p className="text-muted-foreground text-lg mb-8">Join thousands making a measurable difference. Free to start, no credit card required.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (ctaEmail) { toast.success('Welcome to ECOCARE! Check your email. 🌱'); setCtaEmail(''); }
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={ctaEmail}
                onChange={e => setCtaEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-card border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                required
              />
              <button type="submit" className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                Sign Up Free
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
