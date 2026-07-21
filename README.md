# WordSearch Online

An interactive, responsive word search puzzle web application built with Angular, designed to deliver a modern browser gaming experience with zero clutter.

---

## Technical Stack & Architecture

The application is built using a modern Angular architecture, completely avoiding legacy NgModule structures in favor of standalone components, reactive signals, and explicit routing.

* Frontend Framework: Angular (Standalone Components, Signals for reactive state management, Effects, and Computed properties).
* Styling: SCSS with modular, component-scoped stylesheets, responsive CSS Grid layouts, and custom dynamic theme palettes.
* Routing: Angular Router with lazy-loaded feature routes and query parameter passing (/ for Home selection, /game for the core puzzle workspace).
* Audio & Interactivity: HTML5 Audio API for real-time sound feedback and custom pointer-event handling (mousedown, mouseenter, mouseup) for smooth matrix word selection.

---

## Project Structure & File Alignment

The repository is organized following clean separation of concerns, dividing the codebase into modular pages, core shared logic, and routing configuration:

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # TypeScript interfaces and type definitions (puzzle, topic, difficulty)
│   │   └── services/         # API integration and core business logic services
│   ├── pages/
│   │   ├── home/             # Landing page (Category sections, styled topic tiles, navigation triggers)
│   │   ├── game-board/       # Core game container (Matrix rendering, mouse selection state, timer, score)
│   │   ├── about/            # Static informational page
│   │   └── policy pages/     # Privacy policy, terms of use, and cookie policy components
│   ├── app.component.ts      # Root layout component containing global header and footer
│   ├── app.config.ts         # Application configuration providers
│   └── app.routes.ts         # Centralized lazy-loaded routing definitions
```

## Key Implementation Details

1. Routing & Entry Flow: 
   The application starts at the HomeComponent (/), where users choose a topic grouped by thematic categories (TV Series, Science, Heroes). Upon selection, the app navigates to the GameBoardComponent (/game?topic=...), passing the chosen topic via query parameters.
2. Reactive State with Signals: 
   Instead of traditional RxJS state for local component data, Angular Signals (signal, computed, effect) manage the puzzle matrix, selected difficulty, active target words, and completion status instantly.
3. Responsive Grid Layout: 
   The Home page utilizes CSS Grid with adaptive column scaling, ensuring proper alignment on wide desktop screens (leaving dedicated side margins for future ad slots) and responsive mobile viewports.

---

## Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* Angular CLI