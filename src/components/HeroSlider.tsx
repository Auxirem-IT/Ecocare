import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroForest from '@/assets/hero-forest.jpg';
import heroCity from '@/assets/hero-city.jpg';
import heroCommunity from '@/assets/hero-community.jpg';

const slides = [
  {
    image: heroForest,
    title: 'Care for Earth using',
    highlight: 'Data + AI',
    subtitle: 'Track your environmental impact with AI-powered insights and join a global movement towards sustainability.',
    cta: 'Get Started',
    ctaSecondary: 'Watch Demo',
  },
  {
    image: heroCity,
    title: 'Track Your Carbon Footprint',
    highlight: 'in Minutes',
    subtitle: 'Our intelligent calculator analyzes your lifestyle and provides personalized reduction strategies.',
    cta: 'Try Calculator',
    ctaSecondary: 'Learn More',
  },
  {
    image: heroCommunity,
    title: 'Join 10,000+',
    highlight: 'Eco Warriors',
    subtitle: 'Connect with like-minded individuals, compete in challenges, and earn rewards for your green habits.',
    cta: 'Join Community',
    ctaSecondary: 'View Leaderboard',
  },
];

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    // Auto-play
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => { clearInterval(interval); emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Background with Ken Burns */}
              <div className={`absolute inset-0 ${selectedIndex === i ? 'animate-ken-burns' : ''}`}>
                <img src={slide.image} alt="" className="w-full h-full object-cover" />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <AnimatePresence mode="wait">
                    {selectedIndex === i && (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                      >
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4">
                          {slide.title}{' '}
                          <span className="text-accent">{slide.highlight}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg font-body">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link
                            to="/signup"
                            className="px-8 py-3.5 rounded-lg bg-accent text-accent-foreground font-semibold text-base hover:opacity-90 transition-opacity"
                          >
                            {slide.cta}
                          </Link>
                          <button className="px-8 py-3.5 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-colors">
                            {slide.ctaSecondary}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              selectedIndex === i ? 'bg-accent w-8' : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-background/30 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-primary-foreground" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-background/30 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-primary-foreground" />
      </button>
    </section>
  );
}
