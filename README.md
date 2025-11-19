# TV Show Dashboard

A modern, accessible Vue 3 application for browsing and discovering TV shows using the TVMaze API.

## 📋 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Development](#development)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Testing](#testing)
- [Accessibility](#accessibility)

## 🎯 Overview

TV Show Dashboard is a responsive web application that allows users to explore TV shows categorized by genre, view detailed information about each show, and search for their favorite series. The application emphasizes clean code, reusability, and accessibility while maintaining a simple yet engaging user interface.

## 🚀 Getting Started

### Requirements

- Node.js 24.x or latest stable version
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Format code
npm run format

# Type check
npm run type-check
```

## ✨ Features

- **Genre-Based Browsing**: Shows organized by genre (Drama, Comedy, Sports, etc.)
- **Smart Sorting**: Content sorted by rating within each genre
- **Show Details**: Comprehensive information page for each TV show
- **Search Functionality**: Quick search by show name
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Accessibility First**: WCAG compliant with keyboard navigation and screen reader support
- **Horizontal Scrolling**: Modern UI with smooth horizontal lists
- **Theme Support**: Light and Dark Mode support

## 🛠 Tech Stack

### Core

- **Vue 3** (Composition API)
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **Node.js 24** (or latest stable)

### State & Routing

- **Pinia** - State management
- **Vue Router** - Client-side routing

### Validation & Quality

- **Zod** - Runtime type validation
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **Vue Test Utils** - Vue component testing

### Styling

- **Scoped CSS** - Component-level styling
- **theme.css** - Global design tokens

### Additional

- **Swiper** - Touch-enabled slider/carousel

## 📚 API Integration

The application uses the [TVMaze API](http://www.tvmaze.com/api):

- **Show Index**: `/shows` - Retrieve all shows
- **Show Search**: `/search/shows?q={query}` - Search by name
- **Show Details**: `/shows/{id}` - Get detailed information

## 🧪 Testing

The project uses Vitest and Vue Test Utils for comprehensive testing:

- **Unit Tests**: Test individual components and functions

```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## ♿ Accessibility

This application follows WCAG 2.1 Level AA guidelines:

- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Screen reader compatibility
- ✅ Responsive text sizing
- ✅ Skip navigation links

**Built with ❤️ using Vue 3 and modern web standards**
