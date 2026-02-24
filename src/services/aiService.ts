import { mockAIResponses } from '@/data/mockData';

const KEYWORDS = ['car', 'drive', 'bus', 'public', 'flight', 'fly', 'meat', 'nonveg', 'electricity', 'power', 'plastic', 'waste'];

export async function getAIResponse(userInput: string): Promise<string> {
  // Simulate thinking delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  const lower = userInput.toLowerCase();

  // Check for keyword matches
  for (const keyword of KEYWORDS) {
    if (lower.includes(keyword)) {
      const key = keyword === 'drive' ? 'car' : keyword === 'fly' ? 'flight' : keyword === 'nonveg' ? 'meat' : keyword === 'power' ? 'electricity' : keyword === 'waste' ? 'plastic' : keyword === 'public' ? 'bus' : keyword;
      if (mockAIResponses[key]) return mockAIResponses[key];
    }
  }

  // Extract numbers for rough estimation
  const numbers = lower.match(/\d+/g);
  if (numbers) {
    const val = parseInt(numbers[0]);
    return `Based on your input of ${val} units, I estimate this activity contributes approximately ${Math.round(val * 0.15)} kg CO₂ per month. Consider reducing this by:\n1. Finding sustainable alternatives\n2. Setting weekly reduction goals\n3. Tracking progress with ECOCARE's habit system`;
  }

  return mockAIResponses.default;
}
