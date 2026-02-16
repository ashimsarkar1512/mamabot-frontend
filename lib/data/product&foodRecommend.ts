

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
}

export interface FoodItem {
  id: string;
  icon: string;
  name: string;
  benefit: string;
  description: string;
}

export const foodItems: FoodItem[] = [
  {
    id: "f1",
    icon: "🥦",
    name: "Broccoli",
    benefit: "High in Folate",
    description: "Supports fetal growth and maternal health.",
  },
  {
    id: "f2",
    icon: "🍓",
    name: "Strawberries",
    benefit: "Rich in Vitamin C",
    description: "Boosts immunity and iron absorption.",
  },
  {
    id: "f3",
    icon: "🥑",
    name: "Avocado",
    benefit: "Healthy Fats",
    description: "Provides essential fatty acids for baby's brain development.",
  },
  {
    id: "f4",
    icon: "🍊",
    name: "Oranges",
    benefit: "Vitamin C & Fiber",
    description: "Strengthens immune system and aids digestion.",
  },
  {
    id: "f5",
    icon: "🥕",
    name: "Carrots",
    benefit: "Beta-Carotene",
    description: "Supports eye development in the fetus.",
  },
  {
    id: "f6",
    icon: "🍌",
    name: "Bananas",
    benefit: "Potassium Rich",
    description: "Helps prevent leg cramps and boosts energy.",
  },
  {
    id: "f7",
    icon: "🥩",
    name: "Lean Meat",
    benefit: "Iron & Protein",
    description: "Supports hemoglobin levels and overall energy.",
  },
];