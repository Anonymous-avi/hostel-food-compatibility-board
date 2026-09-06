
// ===== VALIDATION HELPERS =====
// These functions check whether the input data is valid.


// Check whether a value is a positive whole number.
function isPositiveWholeNumber(value) {
  return Number.isInteger(value) && value > 0;
}


// Check whether a text value is not empty.
function isNonEmpty(value) {
  return typeof value === "string" && value.trim() !== "";
}


// ===== VALIDATE GROUP BUDGET =====

function validateBudget(budget) {
  if (!isPositiveWholeNumber(budget)) {
    return "INVALID_INPUT: Group Details, budget field";
  }

  return null;
}


// ===== VALIDATE RESIDENTS =====

function validateResidents(residents) {
  for (let i = 0; i < residents.length; i++) {
    const resident = residents[i];

    if (!isNonEmpty(resident.name)) {
      return `INVALID_INPUT: Residents, row ${i + 1}, name field`;
    }
  }

  return null;
}


// ===== VALIDATE DISHES =====

function validateDishes(dishes) {
  const seenIds = new Set();

  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];

    // Check required text fields.
    if (!isNonEmpty(dish.id)) {
      return `INVALID_INPUT: Dishes, row ${i + 1}, id field`;
    }

    if (!isNonEmpty(dish.cafe)) {
      return `INVALID_INPUT: Dishes, row ${i + 1}, cafe field`;
    }

    if (!isNonEmpty(dish.name)) {
      return `INVALID_INPUT: Dishes, row ${i + 1}, name field`;
    }

    // Check that the dish ID is unique.
    if (seenIds.has(dish.id)) {
      return `DUPLICATE_DISH_ID: Dishes, row ${i + 1}, id field`;
    }

    seenIds.add(dish.id);

    // Check that the price is positive and whole.
    if (!isPositiveWholeNumber(dish.price)) {
      return `INVALID_INPUT: Dishes, row ${i + 1}, price field`;
    }

    // Check that every ingredient tag is non-empty.
    for (let j = 0; j < dish.ingredients.length; j++) {
      if (!isNonEmpty(dish.ingredients[j])) {
        return `INVALID_INPUT: Dishes, row ${i + 1}, ingredient field`;
      }
    }
  }

  return null;
}