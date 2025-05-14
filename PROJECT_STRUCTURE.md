# DrugForge AI: Drug Discovery Application

DrugForge AI is a web application for drug discovery and analysis, featuring various predictive models for drug properties and interactions.

## Project Structure

```
/src
  /components - Reusable UI components and feature components
  /context - React context for state management
  /hooks - Custom React hooks
  /pages - Main page components
  /assets - Static assets like images and icons
```

## Key Files

- `src/index.jsx` - Entry point of the React application
- `src/App.jsx` - Main application component with routing configuration
- `index.html` - HTML template

## Features

- Drug property prediction (solubility, half-life, etc.)
- Blood-Brain Barrier permeability analysis
- Target identification and binding score prediction
- Molecular docking simulations
- Interactive visualization of drug-protein interactions

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Backend Integration

The application connects to a Python backend for ML model inference. See the `backendML` directory for model implementations.
