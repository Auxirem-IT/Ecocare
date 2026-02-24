export interface CarbonInput {
  transportKm: number;
  transportMode: 'car' | 'motorbike' | 'public' | 'cycle' | 'walk';
  nonVegMeals: number;
  vegMeals: number;
  monthlyKwh: number;
  shoppingFreq: 'low' | 'medium' | 'high';
  flightsPerYear: number;
}

const MODE_FACTORS: Record<string, number> = {
  car: 0.21, motorbike: 0.11, public: 0.089, cycle: 0.003, walk: 0,
};

const SHOPPING_FACTORS: Record<string, number> = {
  low: 1, medium: 3, high: 5,
};

export function calculateCarbonFootprint(input: CarbonInput) {
  const transport = input.transportKm * MODE_FACTORS[input.transportMode] * 30; // monthly
  const food = (input.nonVegMeals * 3.3 + input.vegMeals * 0.5) * 4.3; // weeks to month
  const energy = input.monthlyKwh * 0.82;
  const shopping = SHOPPING_FACTORS[input.shoppingFreq] * 10;
  const travel = (input.flightsPerYear * 255) / 12;

  const totalMonthlyCO2 = transport + food + energy + shopping + travel;
  const ecoScore = Math.max(0, Math.min(100, Math.round(100 - (totalMonthlyCO2 / 200) * 100)));

  const band = ecoScore <= 30 ? 'Critical' : ecoScore <= 55 ? 'Average' : ecoScore <= 75 ? 'Good' : 'Excellent';
  const bandColor = ecoScore <= 30 ? 'destructive' : ecoScore <= 55 ? 'secondary' : ecoScore <= 75 ? 'primary' : 'accent';

  return {
    breakdown: { transport: Math.round(transport), food: Math.round(food), energy: Math.round(energy), shopping: Math.round(shopping), travel: Math.round(travel) },
    totalMonthlyCO2: Math.round(totalMonthlyCO2),
    ecoScore,
    band,
    bandColor,
  };
}
