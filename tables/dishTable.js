
// ===== DISH TABLE =====
// This function displays all available dishes.

function renderDishes() {
  const tableBody = document.querySelector("#dishTable tbody");

  // Remove old rows before adding fresh data.
  tableBody.innerHTML = "";

  // Create one row for each dish.
  dishes.forEach(function (dish) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${dish.id}</td>
      <td>${dish.cafe}</td>
      <td>${dish.name}</td>
      <td>${dish.diet}</td>
      <td>${dish.ingredients.join(", ")}</td>
      <td>₹${dish.price}</td>
    `;

    tableBody.appendChild(row);
  });
}