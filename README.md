# Will Feldman's Portfolio

A modern, responsive React-based personal portfolio website showcasing professional experiences, projects, organizations, and awards. Built with TypeScript, SASS, and featuring a sophisticated modal overlay system for enhanced user experience.

## 🚀 Live Demo

Visit the live portfolio at: [willfeldman.com](https://willfeldman.com)

## 🏗️ Architecture Overview

This portfolio implements a unique dual-routing architecture that serves content both as full pages and modal overlays, providing flexibility for different user interaction patterns.

### Key Features

- **Dual Routing System**: Content can be viewed as full pages or modal overlays using React Router's `backgroundLocation` state
- **Responsive Design**: Fully responsive design with mobile-first approach
- **Dark Mode Support**: Built-in theme switching capabilities
- **Component Library**: Reusable UI components with comprehensive prop interfaces
- **TypeScript Integration**: Full TypeScript support for type safety
- **SASS Styling**: Modular SASS architecture with component-specific stylesheets

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.0.0 with TypeScript
- **Routing**: React Router DOM 6.3.0
- **Styling**: SASS/SCSS with component-scoped styles
- **Image Gallery**: PhotoSwipe 5.2.8 for image viewing
- **Icons**: React Icons 4.4.0
- **Build Tool**: React Scripts 5.0.1
- **Code Quality**: Prettier for formatting

## 📁 Project Structure

```
src/
├── components/           # React components organized by feature
│   ├── elements/        # Reusable UI components
│   │   ├── button/      # Button variants (link, close, expand)
│   │   ├── card/        # Card component with expand functionality
│   │   ├── modal/       # Modal overlay component
│   │   └── carousel/    # Image carousel component
│   ├── experience-section/  # Experience-related components
│   ├── project-section/     # Project showcase components
│   ├── organization-section/ # Organization involvement
│   ├── award-section/       # Awards and recognition
│   ├── header/             # Site header and navigation
│   └── homepage/           # Landing page component
├── data/                # Static data files
│   ├── experience.js    # Professional experience data
│   ├── project.js       # Project portfolio data
│   ├── organization.js  # Organization involvement data
│   ├── award.js         # Awards and recognition data
│   └── darkmode.js      # Theme configuration
├── styles/              # Global SASS styles
└── App.tsx             # Main application with routing logic

api/                    # Serverless API endpoints
├── experiences.js      # Experience data endpoint
├── projects.js         # Project data endpoint
├── organizations.js    # Organization data endpoint
└── awards.js          # Awards data endpoint

public/src/            # Static assets (images, documents)
```

## 🎯 Content Architecture

Each content type (experiences, projects, organizations, awards) follows a consistent pattern:

1. **Data Layer**: JavaScript files in `src/data/` containing structured content
2. **API Layer**: Serverless endpoints in `api/` that serve the data
3. **Component Layer**: 
   - Section component for listing items
   - Card component for preview/thumbnail view
   - View component for detailed display
4. **Styling**: Component-specific SCSS files with global theme support

## 🧩 Component Library

### Core Components

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `<Button>` | Versatile button with link/action support | `link`, `action`, `text`, `icon`, `tooltip` |
| `<Card>` | Expandable content card | `expandable`, `backgroundColor`, `textColor`, `action` |
| `<Modal>` | Responsive overlay modal | `children` |
| `<Carousel>` | Image/content carousel | Content-dependent |
| `<Expand>` | Expand/collapse button | `size`, `boxShadow`, `customColors` |

### Content Components

- **ExperienceCard/View**: Professional experience display
- **ProjectCard/View**: Project showcase with media
- **OrganizationCard/View**: Organization involvement
- **AwardCard/View**: Awards and recognition
- **CardSection**: Generic section wrapper for card layouts

## ⚙️ Development Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The development server will run on `http://localhost:3000` by default.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the development server |
| `npm run build` | Creates production build in `build/` directory |
| `npm test` | Runs the test suite |
| `npm run pretty` | Formats code with Prettier |

## 🎨 Styling Architecture

### SASS Structure
- **Global Styles**: `src/styles/global.scss` for site-wide styles
- **Component Styles**: Co-located `.scss` files with components
- **Theme Support**: CSS classes for dark/light mode switching

### Design Principles
- Mobile-first responsive design
- Consistent spacing and typography scales
- Accessible color contrasts
- Smooth animations and transitions

## 🌐 Deployment

The portfolio is configured for deployment on Vercel with:

- **Static Site Generation**: Optimized build output
- **Serverless Functions**: API endpoints in the `api/` directory
- **Asset Optimization**: Automatic image and code optimization
- **CDN Distribution**: Global edge network delivery

### Build Process

```bash
# Create production build
npm run build

# The build/ directory contains static files ready for deployment
```

## 🔧 Configuration Files

- `tsconfig.json`: TypeScript compiler configuration
- `package.json`: Dependencies and scripts
- `vercel.json`: Deployment configuration
- `CLAUDE.md`: AI assistant development guidance

## 🎯 Key Features Explained

### Dual Routing System
The portfolio implements a sophisticated routing system where content can be accessed via:
1. **Direct URLs**: Full page views for better SEO and bookmarking
2. **Modal Overlays**: Contextual viewing without losing page state

### Content Management
Content is managed through structured JavaScript data files, providing:
- Type safety with consistent data schemas
- Easy content updates without code changes
- Separation of content and presentation logic

### Performance Optimizations
- Code splitting with React.lazy (where applicable)
- Optimized images served from CDN
- Minimal bundle size with tree shaking
- Efficient re-rendering with React best practices

## 📝 Development Guidelines

### Adding New Content
1. Update relevant data file in `src/data/`
2. Ensure consistent data structure
3. Add corresponding API endpoint if needed
4. Test both page and modal views

### Component Development
1. Follow existing naming conventions
2. Include component-specific SCSS file
3. Use TypeScript for prop definitions
4. Maintain responsive design principles

### Code Quality
- Run `npm run pretty` before committing
- Follow existing code patterns and conventions
- Test across different screen sizes and devices

## 🤝 Contributing

This is a personal portfolio project, but if you notice any issues or have suggestions:

1. Check existing issues and pull requests
2. Create detailed issue descriptions
3. Follow the existing code style and patterns
4. Test thoroughly before submitting pull requests

## 📄 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ by Will Feldman using React, TypeScript, and modern web technologies.