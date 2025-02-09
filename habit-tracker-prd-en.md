# Product Requirements Document - Habit Tracker

## Overview
Web application for tracking daily habits, designed to replace an existing Google Sheets system. The application will allow users to track different types of habits and daily metrics, with a color-based visualization system to indicate success or failure.

## Context & Objectives
- Replace an existing Google Sheets system
- Provide a more mobile-friendly interface
- Maintain the simplicity of the current system
- Enable easy and visual daily tracking

## Technical Specifications

### Prerequisites
- Node.js: v18.18.0 or newer (v20.x.x recommended)
- npm: version corresponding to Node.js
- Installation via nvm recommended:
  ```bash
  # nvm installation
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  
  # Node.js installation and usage
  nvm install 20
  nvm use 20
  ```
- Project creation and startup:
  ```bash
  # Create SvelteKit project
  npx sv create habit-tracker

  # Navigate to project directory
  cd habit-tracker

  # Install dependencies
  npm install

  # Start the project
  npm run dev -- --open
  ```

### Technical Stack
- Frontend: 
  - SvelteKit for application framework
  - Skeleton (based on Tailwind) for UI
  - TypeScript for type checking
- Backend: Supabase
- Hosting: Vercel
- Version Control: GitHub
- Application Type: Single Page Application (SPA)
- Responsive design: Mobile and desktop compatible

### Initial Setup
1. **Project Creation**
   ```bash
   npx sv create habit-tracker
   ```
   - Template: SvelteKit minimal
   - Type checking: TypeScript
   
2. **Plugins and Tools**
   - prettier: Code formatting
   - eslint: Linting
   - vitest: Unit testing
   - tailwindcss: CSS Framework
   - sveltekit-adapter-vercel: Vercel deployment
     - Can switch to static adapter later via:
     ```bash
     npm remove @sveltejs/adapter-vercel
     npm install @sveltejs/adapter-static
     ```
     - Update svelte.config.js:
     ```js
     import adapter from '@sveltejs/adapter-static';
     ```
   
3. **Tailwind Plugins**
   - typography: Text formatting
   - forms: Form styling
   - container-queries: Not installed initially, can be added later if needed for complex layouts with `npm install @tailwindcss/container-queries`

### UI Framework - Skeleton
1. **Used Components**
   - AppBar/AppShell for main navigation
   - AppRail for tab navigation
   - Cards for habit widgets
   - Buttons for toggles and actions
   - Inputs for numerical and text input

2. **Theme and Customization**
   - Native light/dark theme support
   - Main colors:
     - Success: system green
     - Failure: system red
     - Accent: default theme colors

3. **Responsive Design**
   - Fluid layout based on Skeleton grid
   - Automatic mobile/desktop adaptation
   - Touch-optimized navigation

### Supabase Backend
- Hosted PostgreSQL database
- Free tier includes:
  - 500MB storage
  - 50MB database size
  - Unlimited users
  - 500K requests per month
- Built-in authentication
- REST and real-time APIs
- Daily automatic backup

## Data Types

1. **Boolean Habits**
   - Possible values: 1 (success) or 0/empty (failure)
   - Visualization: Green for success, Red for failure
   - Example: "Read 5 pages"

2. **Numerical Measurements with Limits**
   - Example: Number of cigarettes
   - Configurable parameters:
     - Maximum limit (e.g., 5/day)
     - Ideal target (e.g., 2/day)
   - Visualization: Green if ≤ limit, Red if > limit

3. **Expense Tracking**
   - Amount input
   - Automatic monthly total calculation
   - Categories: nicorette, online games

4. **Text Notes**
   - Multiple text fields possible
   - Plain text without formatting
   - Automatic saving
   - Flexible configuration of note columns in settings
   - Usage example: daily notes, journal, specific observations

## Application Structure

### Main Navigation
The application is organized into three main tabs:

1. **Daily Input** (Default page)
   - Display of current day's habits
   - Quick input interface via cards/widgets
   - Simple navigation to previous days
   - Immediate status display (green/red)

2. **Reporting**
   - Statistics and trends view
   - Tracking counters (e.g., days without alcohol)
   - Monthly expense totals
   - Performance visualization

3. **Configuration**
   - Habit management
     - Habit name
     - Type (boolean, numeric, expense)
     - Parameters (limits, goals)
   - Widget organization

### Temporal Navigation
- Default focus on current day
- Simple navigation system to previous days
- No multi-day view in V1

## Wireframes and Mockups

Wireframes and Mockups
Phase 1 - TodoList
![Maquette de la v1](./docs/assets/phase1-todolist.png)
Description : Vue principale montrant les habitudes booléennes organisées par catégories, avec un système de couleurs vert/rouge pour indiquer le statut

Ce visuel est une bonne base pour la version 1 de l'application
On peut déjà préparer les boutons pour le header (une roue crantée pour la partie settings, et un mini graph barchart pour la partie reporting)

Phase 2 - Categorization
Show Image
Description : Interface montrant la catégorisation des habitudes avec la navigation entre catégories

Phase 3 - Administration
Show Image
Description : Panel d'administration permettant la gestion des habitudes et des catégories

Phase 4 - Reporting
Show Image
Description : Dashboard de reporting montrant les tendances et statistiques

## Development Phases

### Phase 1 - Categorized Habits TodoList
- Supabase setup with habits and categories tables
- Basic application structure
- Single view with boolean habits list
- Habits organized by categories:
  * Sleep
  * Health
  * Work
  * Nicotine
  * Vice
- Simple toggle for marking habits done/undone
- Daily states storage in database
- Basic temporal navigation (day by day)
- Hardcoded habits and categories (JSON or database)

### Phase 2 - Administration
- Habit configuration interface
- Habits CRUD:
  - Creation
  - Modification
  - Deletion
  - Reordering
- Labels and descriptions management
- Categories management

### Phase 3 - Reporting
- Dedicated statistics view
- Trends visualization
- Performance tracking by category
- Achievement history

### Phase 4 - Advanced Features
- Additional data types (numeric, expenses)
- Data export (CSV/JSON)
- UX improvements based on usage
- Performance optimization
- Additional features based on user feedback