// ===== NORMALIZATION =====

// Extra spaces remove karta hai
// aur text ko uppercase mein convert karta hai.

function normalizeTag(value) {
  return value.trim().toUpperCase();
}

// ===== DIET COMPATIBILITY =====

function isDietCompatible(residentDiet, dishDiet) {
  // Dono diet values ko same format mein convert karo
  const normalizedResidentDiet = normalizeTag(residentDiet);
  const normalizedDishDiet = normalizeTag(dishDiet);

  if (normalizedResidentDiet === "VEGAN") {
    return normalizedDishDiet === "VEGAN";
  }

  if (normalizedResidentDiet === "VEGETARIAN") {
    return (
      normalizedDishDiet === "VEGAN" ||
      normalizedDishDiet === "VEGETARIAN"
    );
  }

  if (normalizedResidentDiet === "NO_RESTRICTION") {
    return true;
  }

  return false;
}


// ===== ALLERGEN COMPATIBILITY =====

function getMatchingAllergens(residentAllergens, dishIngredients) {
  const matchingAllergens = [];

  // Dish ke ingredients ko normalized format mein convert karo
  const normalizedIngredients = dishIngredients.map(function (ingredient) {
    return normalizeTag(ingredient);
  });

  // Resident ke har allergen ko check karo
  residentAllergens.forEach(function (allergen) {
    const normalizedAllergen = normalizeTag(allergen);

    if (normalizedIngredients.includes(normalizedAllergen)) {
      matchingAllergens.push(normalizedAllergen);
    }
  });

  return matchingAllergens;
}


// ===== SIMPLE ALLERGEN CHECK =====

function isAllergenSafe(residentAllergens, dishIngredients) {
  const matchingAllergens = getMatchingAllergens(
    residentAllergens,
    dishIngredients
  );

  return matchingAllergens.length === 0;
}

// ===== BUDGET CHECK =====

// Check karta hai ki dish ka price
// resident ke budget ke andar hai ya nahi.

function isWithinBudget(dishPrice, budget) {
  return dishPrice <= budget;
}

// ===== SIMPLE SINGLE DISH CHECK =====

// Ek resident aur ek dish ke liye
// diet, allergen aur budget ke teeno rules check karta hai.

function isDishCompatible(resident, dish, budget) {
  // Diet rule check karo
  if (!isDietCompatible(resident.diet, dish.diet)) {
    return false;
  }

  // Allergen rule check karo
  if (!isAllergenSafe(resident.allergens, dish.ingredients)) {
    return false;
  }

  // Budget rule check karo
  if (!isWithinBudget(dish.price, budget)) {
    return false;
  }

  // Agar teeno rules pass ho gaye
  return true;
}


// ===== SINGLE DISH CHECK =====

function checkDishCompatibility(dish, residents, budget) {
  const reasons = [];

  // Har resident ko check karo
  residents.forEach(function (resident) {
    // Pehle diet rule check hoga
    if (!isDietCompatible(resident.diet, dish.diet)) {
      reasons.push("DIET:" + resident.name);
    }

    // Phir allergen rule check hoga
    const matchingAllergens = getMatchingAllergens(
      resident.allergens,
      dish.ingredients
    );

    matchingAllergens.forEach(function (allergen) {
      reasons.push(
        "ALLERGEN:" + resident.name + ":" + allergen
      );
    });
  });

  // Budget rule sabse last mein check hoga
  if (dish.price > budget) {
    reasons.push("OVER_BUDGET");
  }

  return {
    dish: dish,
    compatible: reasons.length === 0,
    reasons: reasons
  };
}


// ===== COMPLETE GROUP COMPATIBILITY =====

function buildCompatibilityResults(residents, dishes, budget) {
  const results = [];

  // Dishes ke original source order ko preserve karo
  dishes.forEach(function (dish) {
    const result = checkDishCompatibility(
      dish,
      residents,
      budget
    );

    results.push(result);
  });

  return results;
}