
// ===== BUILT-IN RESIDENT DATA =====
// This array stores the residents of our hostel group.

const residents = [
  {
    name: "Asha",
    diet: "VEGAN",
    allergens: []
  },
  {
    name: "Dev",
    diet: "VEGETARIAN",
    allergens: ["PEANUT"]
  },
  {
    name: "Mira",
    diet: "NO_RESTRICTION",
    allergens: ["MILK"]
  }
];


// ===== BUILT-IN DISH DATA =====
// Keep dishes in the exact order given in the problem statement.

const dishes = [
  {
    id: "D01",
    cafe: "Hostel Cafe",
    name: "Lentil Rice Bowl",
    diet: "VEGAN",
    ingredients: ["LENTIL", "RICE", "SPINACH"],
    price: 110
  },
  {
    id: "D02",
    cafe: "Library Cafe",
    name: "Tomato Pasta",
    diet: "VEGAN",
    ingredients: ["WHEAT", "TOMATO"],
    price: 150
  },
  {
    id: "D03",
    cafe: "Hostel Cafe",
    name: "Paneer Wrap",
    diet: "VEGETARIAN",
    ingredients: ["MILK", "WHEAT"],
    price: 140
  },
  {
    id: "D04",
    cafe: "East Cafe",
    name: "Peanut Noodles",
    diet: "VEGAN",
    ingredients: ["PEANUT", "WHEAT"],
    price: 130
  },
  {
    id: "D05",
    cafe: "Library Cafe",
    name: "Egg Sandwich",
    diet: "NON_VEGETARIAN",
    ingredients: ["EGG", "WHEAT"],
    price: 100
  }
];


// ===== DEFAULT GROUP BUDGET =====
// This is the maximum price allowed per person.

const defaultBudget = 150;