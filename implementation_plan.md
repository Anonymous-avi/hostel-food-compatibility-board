# Hostel Food Compatibility Board
# IMPLEMENTATION PLAN

## 1. Requirements 

- Display the resident's information.
- Display the available dishes.
- Check whether each dish matches the residents’ dietary requirements.
- Check whether any dish contains a resident’s allergen.
- Check whether the dish is within the group budget.
- Display all compatible dishes.
- Display incompatible dishes along with their exact exclusion reasons.
- Apply the search only to compatible dishes.
- Restore the original data when the Reset button is clicked.
- Display an error when the input is invalid.
- Do not use a backend, database, login system, or internet connection.

The main screen should contain:

- A residents table
- A dishes table
- A Check Compatibility button
- A result area
- A compatible-dish count
- A search box
- A Reset button
- Sample data controls

## 2. Edge Cases to be taken care of

- A dish has a price of 0.
- A dish has a negative price.
- The group budget is 0 or negative.
- Two dishes have the same dish ID.
- A resident’s name is empty.
- A dish name is empty.
- A cafe name is empty.
- An ingredient tag is empty.
- A dish price is exactly equal to the budget.
- The search query is written in uppercase or lowercase.
- The budget is changed after checking compatibility.
- A dish price is changed after checking compatibility.
- Old errors and results should disappear after Reset.

## 3. Architecture Decision

The application will use a simple browser-based architecture:

Data
↓
Validation
↓
Compatibility Engine
↓
Search and Filtering
↓
UI Rendering

Technology choices:

- HTML for the page structure and tables
- CSS for styling
- JavaScript for validation, compatibility logic, search, and buttons
- In-memory arrays for storing residents and dishes

No backend, database, login system, or internet connection is required.

## 4. Implementation Plan

### Step 1: Create the static UI

- Create the residents table.
- Create the dishes table.
- Add a budget input.
- Add a search input.
- Add the Check Compatibility button.
- Add the Reset button.
- Add an area for results and errors.

Checkpoint: The complete screen should be visible and properly arranged.

### Step 2: Add the built-in data

- Add the three residents.
- Add the five dishes.
- Keep the dishes in the exact order given in the problem statement.

Checkpoint: The correct residents and dishes should appear when the application opens.

### Step 3: Implement validation and compatibility logic

- Validate all required fields.
- Check the diet rules.
- Check the allergen rules.
- Check the budget rule.
- Generate the exact exclusion reasons.
- Display invalid-input errors.

Checkpoint: With the default data, exactly D01 and D02 should be compatible.

### Step 4: Implement search and reset

- Apply search only to compatible dishes.
- Update the result when the budget changes.
- Make search case-insensitive.
- Restore the original data when Reset is clicked.
- Clear old results and errors after Reset.

Checkpoint: Test the `wheat` search, the ₹130 budget, and the Reset button.

### Step 5: Test and document the application

- Run all important test cases.
- Take screenshots of the results.
- Save the AI prompts used during development.
- Record important changes suggested by the AI.
- Add clear running instructions to the README file.

Checkpoint: All required acceptance tests should pass.

## 5. Testing Checkpoints

### Test 1: Default data

Expected result:

- D01 and D02 are compatible.
- The compatible count is 2.
- D03, D04, and D05 show the correct exclusion reasons.

### Test 2: Search

Search for:

wheat

Expected result:

- Only D02 is displayed.
- The overall compatible count remains 2.
- Clearing the search displays D01 and D02 again.

### Test 3: Budget boundary

Set the budget to ₹130.

Expected result:

- D01 remains compatible.
- D02 is marked as OVER_BUDGET.

### Test 4: Invalid price

Change D01’s price to 0.

Expected result:

- Show INVALID_INPUT.
- Identify the D01 row and price field.
- Clear all previous results and counts.

### Test 5: Reset

Click Reset after the invalid-price test.

Expected result:

- Original residents and dishes return.
- Budget returns to ₹150.
- Search becomes empty.
- Old errors and results are cleared.