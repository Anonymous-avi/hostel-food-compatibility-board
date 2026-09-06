
// ===== VALIDATION TESTS =====
// These tests check whether our validation functions work correctly.


// ===== TEST 1: VALID BUDGET =====

console.assert(
  validateBudget(150) === null,
  "Test failed: valid budget should return null"
);


// ===== TEST 2: INVALID BUDGET =====

console.assert(
  validateBudget(0) !== null,
  "Test failed: zero budget should return an error"
);


// ===== TEST 3: VALID RESIDENTS =====

console.assert(
  validateResidents(residents) === null,
  "Test failed: built-in residents should be valid"
);


// ===== TEST 4: VALID DISHES =====

console.assert(
  validateDishes(dishes) === null,
  "Test failed: built-in dishes should be valid"
);


// ===== TEST 5: DUPLICATE DISH ID =====

// Create a small test array with a duplicate ID.
const duplicateDishes = [
  {
    id: "D01",
    cafe: "Test Cafe",
    name: "Test Dish",
    diet: "VEGAN",
    ingredients: ["RICE"],
    price: 100
  },
  {
    id: "D01",
    cafe: "Test Cafe",
    name: "Another Dish",
    diet: "VEGAN",
    ingredients: ["RICE"],
    price: 100
  }
];

console.assert(
  validateDishes(duplicateDishes) !== null,
  "Test failed: duplicate dish ID should return an error"
);


// ===== TEST 6: INVALID PRICE =====

const invalidPriceDish = [
  {
    id: "D06",
    cafe: "Test Cafe",
    name: "Test Dish",
    diet: "VEGAN",
    ingredients: ["RICE"],
    price: 0
  }
];

console.assert(
  validateDishes(invalidPriceDish) !== null,
  "Test failed: zero price should return an error"
);


// ===== TEST COMPLETE =====

console.log("Validation tests completed.");


// ===== ALLERGEN TESTS =====
// These tests check whether allergen matching works correctly.


// ===== TEST 7: ALLERGEN MATCH =====

console.assert(
  isAllergenSafe(["PEANUT"], ["PEANUT", "WHEAT"]) === false,
  "Test failed: matching allergen should be unsafe"
);


// ===== TEST 8: NO ALLERGEN MATCH =====

console.assert(
  isAllergenSafe(["PEANUT"], ["WHEAT", "TOMATO"]) === true,
  "Test failed: non-matching allergen should be safe"
);


// ===== TEST 9: EMPTY ALLERGEN LIST =====

console.assert(
  isAllergenSafe([], ["PEANUT", "WHEAT"]) === true,
  "Test failed: empty allergen list should be safe"
);


// ===== TEST 10: MULTIPLE ALLERGENS =====

console.assert(
  isAllergenSafe(["PEANUT", "MILK"], ["MILK", "WHEAT"]) === false,
  "Test failed: any matching allergen should be unsafe"
);


// ===== ALLERGEN TESTS COMPLETE =====

console.log("Allergen tests completed.");

// ===== BUDGET TESTS =====
// These tests check whether budget comparison works correctly.


// ===== TEST 11: PRICE WITHIN BUDGET =====

console.assert(
  isWithinBudget(110, 150) === true,
  "Test failed: dish within budget should be true"
);


// ===== TEST 12: PRICE ABOVE BUDGET =====

console.assert(
  isWithinBudget(160, 150) === false,
  "Test failed: dish above budget should be false"
);


// ===== FINAL COMPATIBILITY TESTS =====
// These tests check all three rules together.


// ===== TEST 13: COMPATIBLE DISH =====

console.assert(
  isDishCompatible(residents[0], dishes[0], 150) === true,
  "Test failed: Asha should be compatible with Lentil Rice Bowl"
);


// ===== TEST 14: ALLERGEN MAKES DISH UNSAFE =====

console.assert(
  isDishCompatible(residents[1], dishes[3], 150) === false,
  "Test failed: Dev should not eat Peanut Noodles"
);


// ===== TEST 15: BUDGET MAKES DISH INCOMPATIBLE =====

console.assert(
  isDishCompatible(residents[0], dishes[0], 100) === false,
  "Test failed: Lentil Rice Bowl should exceed budget of 100"
);


// ===== TEST 16: NO RESTRICTION RESIDENT =====

console.assert(
  isDishCompatible(residents[2], dishes[4], 150) === true,
  "Test failed: Mira should be compatible with Egg Sandwich"
);


// ===== COMPATIBILITY TESTS COMPLETE =====

console.log("Compatibility tests completed.");