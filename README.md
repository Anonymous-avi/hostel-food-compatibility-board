# Hostel Food Compatibility Board

A browser-based application that helps a group of hostel residents find dishes that everyone can eat while staying within a shared budget.

The application checks dietary restrictions, allergens, and price limits, then displays compatible dishes and explains why other dishes are excluded.

## 1. Problem Statement

When several hostel residents want to order food together, choosing a dish can be difficult because everyone may have different dietary preferences, allergies, and budget limits.

This project solves that problem by providing a simple compatibility board where users can:

- View the residents in a group.
- View the available dishes.
- Set a budget per person.
- Check which dishes are suitable for everyone.
- See the exact reasons why a dish is excluded.
- Search through compatible dishes.
- Reset the application to its original state.

The application is designed as a small, client-side project without a backend or database.

## 2. Features

### Resident information

The application displays each resident's:

- Name
- Dietary preference
- Allergens

### Dish information

The application displays each dish's:

- Dish ID
- Cafe name
- Dish name
- Dietary category
- Ingredients
- Price

### Compatibility checking

A dish is considered compatible only when:

1. Its diet is suitable for every resident.
2. It does not contain any resident's allergens.
3. Its price is within the group budget.

### Exclusion reasons

When a dish is not compatible, the application displays the reason using clear codes such as:

- `DIET:ResidentName`
- `ALLERGEN:ResidentName:Allergen`
- `OVER_BUDGET`

A dish may have more than one exclusion reason.

### Search

Users can search compatible dishes by:

- Cafe name
- Dish name
- Ingredient

Search is case-insensitive.

The compatible count continues to show the total number of compatible dishes, even when a search filters the displayed results.

### Reset

The Reset button restores the default budget and clears the search, previous results, and errors.

## 3. Technologies Used

- **HTML** — Creates the page structure, input fields, buttons, and tables.
- **CSS** — Provides styling, spacing, colors, tables, buttons, and mobile responsiveness.
- **JavaScript** — Handles data, validation, compatibility logic, search, rendering, and user interactions.
- **In-memory arrays** — Store the residents and dishes during the current browser session.

No backend, database, login system, or internet connection is required.

## 4. Project Structure

```text
hostel-food-compatibility-board/
│
├── index.html
├── style.css
├── data.js
├── validation.js
├── logic.js
├── app.js
├── tests.js
├── implementation_plan.md
├── README.md
│
└── tables/
    ├── residentTable.js
    └── dishTable.js