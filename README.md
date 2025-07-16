# [Automation Challenge] - E2E Test Automation by Ana Londoño

This repository contains the end-to-end (E2E), visual, and accessibility automated tests for the **Laboratorio de Testing** application, written using Cypress.

Credit for the foundational concepts of this project goes to the **Raptor Team** at Huge. The codebase has since been substantially changed and tailored for this particular implementation.

The automation strategy is available [here](https://docs.google.com/document/d/1xpzE6id7MyBNJ2YTJzyqXZsoXabxQS7yQM85XbTY4R4/edit?tab=t.0#heading=h.5fs1wfkcds7l)

***

## Requirements

Before you begin, ensure you have the following installed on your machine:
* **Node.js** (v18 or higher is recommended)
* **npm** (comes bundled with Node.js)

***

## Installation

1.  **Clone the repository** to your local machine:
    ```bash
    git clone https://github.com/analoar/cypress_laboratorio.git
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd [your-project-directory]
    ```

3.  **Install the dependencies** listed in `package.json`:
    ```bash
    npm install
    npm install -D cypress-axe axe-core
    npm install @faker-js/faker --save-dev
    npm install dayjs
    ```

***

## Project structure
```
├── cypress/
│   ├── e2e/                          # Contains all test (.cy.js) files, organized by feature
│   │   ├── register.cy.js
│   │   ├── login.cy.js
│   │   ├── checkout.cy.js
│   │   ├── visual-testing-cypress.cy.js
│   │   ├── a11-axe.cy.js
│   │   └── orders.cy.js
│   ├── fixtures/                     # Stores static data (e.g., user.json) used in tests
│   │   ├── data.json
│   └── support/                      # Holds reusable code and configurations
│       ├── commands/                 # Custom Cypress commands for user interactions related to one of the flows
│           ├──  checkout-commands.js
│           ├──  login-commands.js
│           └──  register-commands.js
│       ├── elements/                 # Stores constants for DOM locators
│           ├──  checkout-elements.js
│           ├──  home-elements.js
│           ├──  register-elements.js
│           ├──  login-elements.js
│           └──  orders-elements.js
│       ├── utilities.js              # Common helper functions
│       └── e2e.js                    # Imports commands to make them globally available
├── cypress-image-diff-html-report    # JSON file that is created visual comparison tests
├── cypress-visual-screenshots        # Screenshots for baseline, comparison, and the differences per browser used
│   ├── baseline               
│   ├── comparison
│   └── diff
├── cypress.config.js                  # Global Cypress configuration file (baseUrl, timeouts, etc.)
└── package.json                       # Manages project dependencies and scripts
```
## Running Tests

You can run the Cypress tests in two modes: interactive (with the Test Runner) or headless (via the command line).

### Interactive Mode

This mode is ideal for developing and debugging tests, as it opens the Cypress Test Runner UI.

```bash
npx cypress open
```

### Headless Mode

This mode is best for running the full test suite in a CI/CD pipeline or for regression runs. It runs the tests in the background without opening a browser window.
```bash
# Run all tests
npx cypress run

# Run tests from a specific file
npx cypress run --spec "cypress/e2e/checkout.cy.js"

# Run tests on a specific browser
npx cypress run --browser chrome
```

### Visual Comparison Testing 📸
The project uses cypress-image-diff for visual regression testing. The workflow involves running the tests and then generating an HTML report to see the differences.

1. Run the test file 
```bash
npx cypress run --spec "cypress/e2e/visual-testing-cypress.cy.js"
``` 

2. Generate the Report
Run the following command to generate the comparison report
```bash
npx cypress-image-diff-html-report generate
``` 

3. View the Report
To start a local server and view the HTML report in your browser, run:
```bash
npx cypress-image-diff-html-report start
````

