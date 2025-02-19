# IO2 Frontend

## Overview

**IO2 Frontend** is a modern web application built for enterprise data management. This project provides a comprehensive dashboard for managing end clients, business partners, companies, and addresses with a robust user management system. This project is built using:

### Tech stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Data Fetching:** SWR for API data fetching and caching
- **State Management:** Valtio for reactive state management
- **UI Library:** React Bootstrap, Metronic Template UI
- **Validation:** React Hook Form + Yup
- **Internationalization:** Built-in Next.js i18n
- **Linting & Formatting:** ESLint, Prettier

## Features

### 1. Data Management Dashboard
  - Users Management
  - Payments Management
  - Packages Management
  - Organization Units Management
  - Enterprise Roots Management
  - End Clients Management
  - Companies Management
  - Business Partners Management
  - Addresses Management
  - Settings Management
  - Service Management
  - Project Management
  - Product Management
  - Price Management
  - Person Management
  - Settings Management
### 2. Data Validation
  - KVK
  - Google

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 20.x)
- **npm** or **yarn**

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone git@bitbucket.org:infraorders2/io2-frontend.git
cd io2-frontend

# Install dependencies
npm install  # or yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables from `.env.example` file.

Note: For production, make sure to set appropriate values for each environment variable. Never commit the `.env.local` file to version control.

## Running the Project

Start the development server:

```bash
npm run dev  # or yarn dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build  # or yarn build
npm start      # Start the production server
```

## Code Quality & Linting

This project uses Lefthook for git hooks to ensure code quality. The following checks run automatically on pre-commit:

```bash
# 1. Code Formatting
# Formats JavaScript, TypeScript, CSS, SCSS, Markdown, and JSON files
yarn prettier --write

# 2. Code Linting
# Lints and fixes JavaScript and TypeScript files
yarn eslint --fix

# 3. Type Checking
# Validates TypeScript types
yarn tsc --noEmit
```

The checks run in sequence (piped mode) and will stop if any check fails. Files are automatically fixed and added back to staging when possible.

Affected files:

- Formatting: `.js, .ts, .tsx, .css, .scss, .md, .json`
- Linting: `.js, .ts, .tsx`
- Type Check: `.ts, .tsx`

## Documentation

- **Changelog:** Follow CHANGELOG.md to track updates.
- **Component Documentation:** Uses [Storybook](https://itsavirus-com.github.io/io2-storybook) for UI documentation.
- **API Documentation:** Refer to link [API Documentation](https://infraorders2.postman.co/workspace/InfraOrders-Integration~b641bdd5-5566-44b6-851b-a7b89a1eb1f4/overview).

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[ngblu networks](https://www.ngblunetworks.nl/)
