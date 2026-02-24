export const mockTestimonials = [
  { id: 1, name: 'Priya Sharma', role: 'Environmental Scientist', quote: 'ECOCARE transformed how I track my daily carbon impact. The AI insights are incredibly accurate and actionable.', rating: 5, avatar: 'PS' },
  { id: 2, name: 'Marcus Chen', role: 'Sustainability Director, TechCorp', quote: 'Our company reduced emissions by 23% in 6 months using ECOCARE\'s corporate dashboard. Essential tool for ESG reporting.', rating: 5, avatar: 'MC' },
  { id: 3, name: 'Sarah Williams', role: 'High School Teacher', quote: 'My students love the gamified challenges. It makes environmental education engaging and measurable.', rating: 4, avatar: 'SW' },
  { id: 4, name: 'Raj Patel', role: 'City Planner, Mumbai', quote: 'The city-wide analytics helped us identify our biggest emission zones and prioritize green infrastructure.', rating: 5, avatar: 'RP' },
  { id: 5, name: 'Emma Thompson', role: 'Freelance Designer', quote: 'Finally an eco app that\'s beautiful AND useful. I\'ve maintained a 45-day streak thanks to the habit coach.', rating: 5, avatar: 'ET' },
];

export const mockChallenges = [
  { id: 1, title: 'Zero Waste Week', description: 'Produce zero landfill waste for 7 days', participants: 1240, daysLeft: 5, category: 'waste', xpReward: 500 },
  { id: 2, title: 'Bike to Work Month', description: 'Replace car commutes with cycling for 30 days', participants: 890, daysLeft: 18, category: 'transport', xpReward: 1000 },
  { id: 3, title: 'Plant-Based Challenge', description: 'Eat fully plant-based meals for 2 weeks', participants: 2100, daysLeft: 10, category: 'food', xpReward: 750 },
  { id: 4, title: 'Energy Saver Sprint', description: 'Reduce electricity usage by 20% this month', participants: 670, daysLeft: 22, category: 'energy', xpReward: 600 },
];

export const mockTasks = [
  { id: 1, title: 'Use reusable water bottle', completed: true, xp: 10 },
  { id: 2, title: 'Take public transport today', completed: false, xp: 25 },
  { id: 3, title: 'Eat a plant-based meal', completed: true, xp: 15 },
  { id: 4, title: 'Turn off lights when leaving room', completed: false, xp: 5 },
  { id: 5, title: 'Recycle packaging properly', completed: false, xp: 10 },
];

export const mockAIResponses: Record<string, string> = {
  car: "Driving a car produces approximately 0.21 kg CO₂ per km. Consider carpooling, using public transit, or switching to an EV to reduce your transport emissions by up to 65%.",
  bus: "Great choice! Public transit produces only 0.089 kg CO₂ per km — that's 58% less than driving alone. Keep it up!",
  flight: "A single flight produces about 255 kg CO₂ per trip. Consider video conferencing for business meetings or choosing train travel for shorter distances.",
  meat: "Each non-vegetarian meal contributes roughly 3.3 kg CO₂. Switching to plant-based meals 3 days a week could save over 500 kg CO₂ annually.",
  electricity: "Your electricity usage produces 0.82 kg CO₂ per kWh. Try switching to LED bulbs, using smart power strips, and running appliances during off-peak hours.",
  plastic: "Reducing single-use plastic saves approximately 2.5 kg CO₂ per kg of plastic avoided. Carry reusable bags, bottles, and containers.",
  default: "Based on your input, I estimate your activity contributes approximately 15-25 kg CO₂ per month. Here are 3 ways to reduce it:\n1. Switch to renewable energy sources\n2. Optimize your daily commute\n3. Reduce food waste by meal planning",
};

export const mockLeaderboard = [
  { rank: 1, name: 'GreenTeam Alpha', score: 95, co2Saved: 450, members: 24 },
  { rank: 2, name: 'EcoWarriors United', score: 91, co2Saved: 380, members: 18 },
  { rank: 3, name: 'Planet Protectors', score: 88, co2Saved: 340, members: 32 },
  { rank: 4, name: 'Carbon Crushers', score: 85, co2Saved: 290, members: 15 },
  { rank: 5, name: 'Sustainability Squad', score: 82, co2Saved: 260, members: 21 },
];

export const pricingPlans = [
  {
    id: 'free' as const,
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Basic carbon tracking for individuals',
    features: ['Basic carbon calculator', 'Weekly eco tips', 'Community access (view only)', 'Basic habit tracking'],
    cta: 'Get Started Free',
  },
  {
    id: 'pro' as const,
    name: 'Pro Individual',
    price: 9,
    period: 'month',
    description: 'Advanced AI insights and full reports',
    features: ['Everything in Free', 'AI-powered insights', 'Natural language input', 'Monthly reports & certificate', 'Smart recommendations', 'Full community access', 'Export PDF reports'],
    popular: true,
    cta: 'Start Pro Trial',
  },
  {
    id: 'corporate' as const,
    name: 'Corporate',
    price: 49,
    period: 'month',
    description: 'ESG dashboard and team analytics',
    features: ['Everything in Pro', 'ESG dashboard', 'Team/employee analytics', 'Department breakdown', 'Green initiative kanban', 'Custom reporting', 'Priority support'],
    cta: 'Contact Sales',
  },
  {
    id: 'school' as const,
    name: 'School',
    price: 19,
    period: 'month',
    description: 'Gamified challenges for students',
    features: ['Everything in Pro', 'Class leaderboards', 'Student challenges', 'Eco activity feed', 'Badge system', 'Teacher dashboard', 'Awareness tracker'],
    cta: 'Start School Plan',
  },
];
