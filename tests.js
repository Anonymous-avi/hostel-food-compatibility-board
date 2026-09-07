
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

const compatibleResult = checkDishCompatibility(
  dishes[0],
  residents,
  150
);

console.assert(
  compatibleResult.compatible === true,
  "Test failed: Lentil Rice Bowl should be compatible for the group"
);


// ===== TEST 14: ALLERGEN MAKES DISH UNSAFE =====

const allergenResult = checkDishCompatibility(
  dishes[3],
  residents,
  150
);

console.assert(
  allergenResult.compatible === false,
  "Test failed: Peanut Noodles should be excluded"
);

console.assert(
  allergenResult.reasons.includes("ALLERGEN:Dev:PEANUT"),
  "Test failed: peanut allergen reason should be present"
);


// ===== TEST 15: BUDGET MAKES DISH INCOMPATIBLE =====

const budgetResult = checkDishCompatibility(
  dishes[0],
  residents,
  100
);

console.assert(
  budgetResult.compatible === false,
  "Test failed: Lentil Rice Bowl should exceed budget of 100"
);

console.assert(
  budgetResult.reasons.includes("OVER_BUDGET"),
  "Test failed: OVER_BUDGET reason should be present"
);

// ===== COMPATIBILITY TESTS COMPLETE =====

console.log("Compatibility tests completed.");