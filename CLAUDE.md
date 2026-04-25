# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Daily Questions PWA** is a Progressive Web Application built with Angular 21 for presenting daily questions to users. The application uses modern Angular patterns including standalone components, signals for reactive state management, Tailwind CSS for styling, and Vitest for unit testing.

## Development Commands

- **Start dev server:** `npm run dev` or `npm start` (runs on `http://localhost:4200/`)
- **Build for production:** `npm run build` (outputs to `dist/`)
- **Run unit tests:** `npm test` (Vitest via Angular's test builder)
- **Watch build:** `npm run watch` (rebuilds on file changes for development)

To run a single test file: `npm test -- src/app/app.spec.ts`

## Architecture & Stack

### Core Technologies
- **Angular 21:** Using standalone components (not NgModules). All components use `imports` array instead of module declarations.
- **Reactive State:** Signals from `@angular/core` for local component state. Use `signal()` for reactive data and `computed()` for derived values.
- **Styling:** Tailwind CSS v4 with PostCSS for utility-first styling. Global styles in `src/styles.css`.
- **Testing:** Vitest unit tests via `@angular/build:unit-test` builder. Tests use JSDOM for DOM simulation.
- **Routing:** Angular Router with `Routes` array defined in `src/app/app.routes.ts`. Currently empty, routes added as features are developed.

### Project Structure
```
src/
├── app/
│   ├── app.ts              # Root component (standalone)
│   ├── app.html            # Root template
│   ├── app.css             # Component styles
│   ├── app.routes.ts       # Route definitions
│   ├── app.config.ts       # Application configuration & providers
│   └── app.spec.ts         # Root component tests
├── main.ts                 # Bootstrap entry point
├── index.html              # HTML shell
└── styles.css              # Global styles
```

## Key Development Patterns

### Components
All components are **standalone**. Template example:
```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-my-feature',
  imports: [CommonModule],  // Declare dependencies here, not in a module
  templateUrl: './my-feature.html',
  styleUrl: './my-feature.css'
})
export class MyFeatureComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);
}
```

### Testing
Tests are co-located with source files using `.spec.ts` suffix. Use Vitest syntax (compatible with Jest):
```typescript
import { describe, it, expect } from 'vitest';
import { Component } from '@angular/core';

describe('MyComponent', () => {
  it('should render', () => {
    // test code
  });
});
```

### Routing
Add new routes to `src/app/app.routes.ts`:
```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions', component: QuestionsComponent }
];
```

## Common Tasks

**Generate a new component:**
```bash
ng generate component features/question-card
```

**Generate a service:**
```bash
ng generate service services/question
```

These will respect the standalone pattern and create files with the proper structure.

## Build & Deployment

Production builds optimize for performance with:
- Tree-shaking and dead code elimination
- Output hashing for cache-busting
- Bundle size budgets enforced (1MB limit for main bundle, 8kB per component style)

Assets from the `public/` directory are included in builds automatically.

## TypeScript Configuration

- **Target:** ES2022 with strict mode enabled
- **Lib:** DOM, ES2022
- Config files: `tsconfig.json` (base), `tsconfig.app.json` (application), `tsconfig.spec.json` (tests)
