# PokeFinderV2 — Front-End Technical Test

🔗 **Live Demo**: https://poke-finder-v2.vercel.app/pokemon

## Overview

Pokémon Explorer is a modern Pokémon browser built with **Next.js**, **Apollo GraphQL**, **TailwindCSS**, and **Storybook**.

Key features include:

- **Search Pokémon** by name or type.
- Display **detailed Pokémon cards** with stats, evolution, abilities, etc.
- **Add/Remove favorites**, stored in `localStorage`.
- Switch between **/pokemon** and **/favorites** pages.
- Smooth and animated UX with **Framer Motion**.
- Fully **responsive** design for mobile, tablet, and desktop.

---

## Tech Stack

- **Next.js 15 (App Router + TurboPack)**
- **Apollo Client** (GraphQL - PokéAPI)
- **TailwindCSS** (UI Styling)
- **Storybook** (Component documentation + Playwright testing)
- **Playwright** (Component-level E2E testing)
- **Framer Motion** (UI animations)
- **React Icons**

---

## Getting Started

```bash
git clone https://github.com/MartyLabs/PokeFinderV2.git
cd PokeFinderV2
yarn install
yarn dev
```

App is accessible at `http://localhost:3000/pokemon`

---

## Storybook

```bash
yarn storybook
```

Storybook runs at: `http://localhost:6006`

Documented components:

- `PokemonCard`
- `PokeDetailsCard`

---

## Run Playwright Tests

```bash
# Manual Playwright tests (recommended for debugging)
npx playwright install
npx playwright test

# Or run Storybook auto-tests:
yarn test-storybook
```

> Tests are located in `src/components/Pokemon/*.test.ts`

---

## Folder Structure

```
src/
├── app/                 # Next.js pages
│   ├── pokemon/
│   └── favorites/
├── components/
│   ├── Pokemon/         # Main components
│   └── UI/              # UI components (buttons, spinner, etc.)
├── graphql/             # GraphQL queries
├── lib/                 # Apollo Provider
├── utils/               # Helpers and localStorage logic
```

---

## Bonus Features Implemented

Fully animated Favorite button  
Playwright tests for UI validation  
Mobile & tablet responsive layout  
Filter Pokémon by type  
Reload button  
Storybook with live interactivity

---

## Upcoming Features

Pagination or infinite scroll to explore more than 10 Pokémon
Global state for favorite Pokémon (via Context or Zustand)
Animations for Pokémon transitions on detail change
Dark mode
Progressive Web App (PWA) support
Multilingual support (i18n)
404 Page
Unit tests for utility functions (favorites.ts, utils.tsx)

---

## 📄 Author

Made with ❤️ by Marty
