// ===== INITIAL VALIDATION =====
//these three are checked as soon as the application is loaded 
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

// Keep the tables independent from validdation results coz they need to be shown no matter what 
renderResidents();
renderDishes();


// ===== CHECK INITIAL DATA =====

if (budgetError || residentError || dishError) {
  console.error(budgetError || residentError || dishError);
}

// ===== CHECK COMPATIBILITY =====

checkButton.addEventListener("click", function () {
  // clear old errors 
  errorArea.innerHTML = "";

  // the budget input value is initially a string so I convert it to number by adding number before the fucntion 
  const budget = Number(budgetInput.value);

  // now again these three are checked when the user clicks the compatibility check button 
  const currentBudgetError = validateBudget(budget);
  const currentResidentError = validateResidents(residents);
  const currentDishError = validateDishes(dishes);

  // Teeno errors mein se pehla error select karo
  const validationError =
    currentBudgetError ||
    currentResidentError ||
    currentDishError;

  // if the input is invalid then show message in the error area
  if (validationError) {
    errorArea.textContent = validationError;

    // If invalid input then clear old check results 
    compatibleCount.textContent = "Compatible dishes: 0";
    resultArea.innerHTML = "";

    // Tables are rendered again 
    renderResidents();
    renderDishes();

    return; //stops the function there itself ...that means if there is error then don't calculate compatibility
  }

  // if the input is valid ...then this calls the logic.js function 
  const results = buildCompatibilityResults(
    residents,
    dishes,
    budget
  );

  // show the results 
  renderAllCompatibilityResults(results);
});

// ===== SEARCH COMPATIBLE DISHES =====
//this event is executed when the user types in the search box 
searchInput.addEventListener("input", function () {
  const budget = Number(budgetInput.value);//during search current budget taken into account 

  const results = buildCompatibilityResults(
    residents,
    dishes,
    budget
  );

  renderCompatibilityResults(results);//this applies search only to compatible dishes 
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
//this function displays both compatible as well as non compatible dishes 
function renderAllCompatibilityResults(results) {
  const compatibleResults = results.filter(function (result) {
    return result.compatible;
  });
   //in excluded we will return those results which are not compatible 
  const excludedResults = results.filter(function (result) {
    return !result.compatible;
  });

  compatibleCount.textContent =
    "Compatible dishes: " + compatibleResults.length;
  //this is that results table html structure 
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

  resultArea.innerHTML = html; //for showing the final table on page 
}


// ===== SHOW ONLY SEARCHED COMPATIBLE DISHES =====

function renderCompatibilityResults(results) {
  //incompatible dishes won't be included in the search results 
  const compatibleResults = results.filter(function (result) {
    return result.compatible;
  });
   //this is done to make the search case insensitive 
  const searchText = searchInput.value.trim().toUpperCase();

  const filteredResults = compatibleResults.filter(function (result) {
    const dish = result.dish;
    //search is done on the basis of three things cafe name , dish name and ingredients 
    return (
      searchText === "" ||
      dish.cafe.toUpperCase().includes(searchText) ||
      dish.name.toUpperCase().includes(searchText) ||
      dish.ingredients.some(function (ingredient) {//some ensures that out of all the ingredients atleast one ingredient is matching or not 
        return ingredient.toUpperCase().includes(searchText);//include checks whether another string is present in a string or not 
      })
    );
  });

  // Count is always kept for unfiltered compatible dishes 
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