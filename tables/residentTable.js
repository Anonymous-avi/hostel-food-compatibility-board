
// ===== RESIDENT TABLE =====
// This function displays all residents in the HTML table.

function renderResidents() { //used to show resident's table data inside HTML table
  const tableBody = document.querySelector("#residentTable tbody");

  // Remove old rows before adding fresh data.
  tableBody.innerHTML = "";

  // Create one row for each resident.
  residents.forEach(function (resident) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${resident.name}</td>
      <td>${resident.diet}</td>
      <td>${resident.allergens.join(", ") || "None"}</td>
    `;

    tableBody.appendChild(row);
  });
}