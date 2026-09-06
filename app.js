// ===== INITIAL VALIDATION =====

const budgetError = validateBudget(defaultBudget);
const residentError = validateResidents(residents);
const dishError = validateDishes(dishes);


// ===== GET HTML ELEMENTS =====

const checkButton = document.querySelector("#checkButton");
const resetButton = document.querySelector("#resetButton");
const searchInput = document.querySelector("#searchInput");
const budgetInput = document.querySelector("#budget");

const compatibleCount = document.querySelector("#compatibleCount");
const errorArea = document.querySelector("#errorArea");
const resultArea = document.querySelector("#resultArea");

// ===== ALWAYS RENDER TABLES =====

// Tables ko validation result se independent rakho
renderResidents();
renderDishes();


// ===== CHECK INITIAL DATA =====

if (budgetError || residentError || dishError) {
  console.error(budgetError || residentError || dishError);
}

// ===== CHECK COMPATIBILITY =====

checkButton.addEventListener("click", function () {
  // Purane errors clear karo
  errorArea.innerHTML = "";

  // Budget input se current value lo
  const budget = Number(budgetInput.value);

  // Current data validate karo
  const currentBudgetError = validateBudget(budget);
  const currentResidentError = validateResidents(residents);
  const currentDishError = validateDishes(dishes);

  // Teeno errors mein se pehla error select karo
  const validationError =
    currentBudgetError ||
    currentResidentError ||
    currentDishError;

  // Agar input invalid hai
  if (validationError) {
    errorArea.textContent = validationError;

    // Purane calculated results clear karo
    compatibleCount.textContent = "Compatible dishes: 0";
    resultArea.innerHTML = "";

    // Tables ko visible rakho
    renderResidents();
    renderDishes();

    return;
  }

  // Valid input par compatibility calculate karo
  const results = buildCompatibilityResults(
    residents,
    dishes,
    budget
  );

  // Results show karo
  renderAllCompatibilityResults(results);
});

// ===== SEARCH COMPATIBLE DISHES =====

searchInput.addEventListener("input", function () {
  const budget = Number(budgetInput.value);

  const results = buildCompatibilityResults(
    residents,
    dishes,
    budget
  );

  renderCompatibilityResults(results);
});


// ===== RESET =====

resetButton.addEventListener("click", function () {
  budgetInput.value = defaultBudget;
  searchInput.value = "";

  compatibleCount.textContent = "Compatible dishes: 0";
  errorArea.innerHTML = "";

  resultArea.innerHTML =
    '<p>No results yet. Click "Check Compatibility".</p>';
});


// ===== SHOW ALL RESULTS =====

function renderAllCompatibilityResults(results) {
  const compatibleResults = results.filter(function (result) {
    return result.compatible;
  });

  const excludedResults = results.filter(function (result) {
    return !result.compatible;
  });

  compatibleCount.textContent =
    "Compatible dishes: " + compatibleResults.length;

  let html = `
    <table>
      <thead>
        <tr>
          <th>Dish ID</th>
          <th>Cafe</th>
          <th>Dish</th>
          <th>Price</th>
          <th>Status</th>
          <th>Exclusion Reasons</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Compatible dishes first
  compatibleResults.forEach(function (result) {
    const dish = result.dish;

    html += `
      <tr>
        <td>${dish.id}</td>
        <td>${dish.cafe}</td>
        <td>${dish.name}</td>
        <td>₹${dish.price}</td>
        <td>Compatible</td>
        <td>—</td>
      </tr>
    `;
  });

  // Excluded dishes after compatible dishes
  excludedResults.forEach(function (result) {
    const dish = result.dish;

    html += `
      <tr>
        <td>${dish.id}</td>
        <td>${dish.cafe}</td>
        <td>${dish.name}</td>
        <td>₹${dish.price}</td>
        <td>Excluded</td>
        <td>${result.reasons.join(", ")}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  resultArea.innerHTML = html;
}


// ===== SHOW ONLY SEARCHED COMPATIBLE DISHES =====

function renderCompatibilityResults(results) {
  const compatibleResults = results.filter(function (result) {
    return result.compatible;
  });

  const searchText = searchInput.value.trim().toUpperCase();

  const filteredResults = compatibleResults.filter(function (result) {
    const dish = result.dish;

    return (
      searchText === "" ||
      dish.cafe.toUpperCase().includes(searchText) ||
      dish.name.toUpperCase().includes(searchText) ||
      dish.ingredients.some(function (ingredient) {
        return ingredient.toUpperCase().includes(searchText);
      })
    );
  });

  // Count hamesha unfiltered compatible dishes ka rahega
  compatibleCount.textContent =
    "Compatible dishes: " + compatibleResults.length;

  if (filteredResults.length === 0) {
    resultArea.innerHTML = "<p>No compatible dishes found.</p>";
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Dish ID</th>
          <th>Cafe</th>
          <th>Dish</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  filteredResults.forEach(function (result) {
    const dish = result.dish;

    html += `
      <tr>
        <td>${dish.id}</td>
        <td>${dish.cafe}</td>
        <td>${dish.name}</td>
        <td>₹${dish.price}</td>
        <td>Compatible</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  resultArea.innerHTML = html;
}