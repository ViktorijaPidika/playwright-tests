# playwright-tests

This project contains automated end-to-end tests written with **Playwright** and **TypeScript**. It aims to provide a scalable and maintainable framework for testing web applications.

## Preconditions

- **Node.js** is installed (recommended version: >= 16.x)  
- **npm** or **yarn** is installed and working
- **IDE** is downloaded

## Setup Instructions

1. **Clone the repository**

`git clone https://github.com/your-org/your-playwright-project.git`
<br>
`cd your-playwright-project`

2. **Install dependencies**
`npm install`

3. **Install Playwright**
`npm init playwright@latest`

## Running tests

Run all tests: `npx playwright test` <br>
Run tests in headed mode for debugging: `npx playwright test --headed` <br>
Run tests for a specific browser (e.g., Firefox): `npx playwright test --project=firefox` <br>
Run a specific test file: `npx playwright test tests/example.spec.ts` <br>

##Project structure
```bash
├── tests/                 # Test specs
│   └── example.spec.ts
├── pages/                 # Page Object Models
│   └── home.page.ts
├── utils/                 # Helper utilities
├── playwright.config.ts   # Playwright configuration
├── package.json           # npm configuration
├── tsconfig.json          # TypeScript configuration
└── README.md

