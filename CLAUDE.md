# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Commands
- `npm install` - Install dependencies
- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run pretty` - Format code with Prettier

### Project Structure Commands
- Development server runs on React's default port (typically 3000)
- Built files are output to `build/` directory

## Architecture Overview

This is a React-based personal portfolio website built with TypeScript and SASS. The application uses React Router for client-side routing with modal overlay functionality.

### Key Architecture Patterns

**Data Structure**: Portfolio content (experiences, projects, organizations, awards) is stored in JavaScript data files (`src/data/`) and served via API endpoints (`api/`) for a backend-like structure.

**Routing Strategy**: Implements dual routing - standard page routes and modal overlays using React Router's `backgroundLocation` state. Each content type (experience, project, organization, award) can be viewed both as a full page and as a modal overlay.

**Component Hierarchy**: 
- `App.tsx` - Main routing logic with modal overlay handling
- `Homepage.jsx` - Landing page combining Header and Experience sections
- Sectioned components for different content types (experience, project, organization, award)
- Reusable elements in `components/elements/` (buttons, cards, modals, carousel)

**Content Management**: Each content type follows the same pattern:
- Data stored in `src/data/[type].js` 
- API endpoint in `api/[type].js`
- Section component for listing (`[Type].jsx`)
- Card component for preview (`[Type]Card.jsx`)
- View component for detailed display (`[Type]View.jsx`)

### Styling Architecture
- Uses SASS/SCSS for styling with component-specific stylesheets
- Global styles in `src/styles/global.scss`
- Dark mode support via CSS classes controlled by `src/data/darkmode.js`

### Component Library
The codebase includes well-documented reusable components (see README.markdown for detailed component parameters). Key components include Modal, Card, Button, Expand, and Carousel with specific prop requirements.

### Static Assets
Images and documents are stored in `public/src/` and referenced via absolute URLs pointing to willfeldman.com domain.