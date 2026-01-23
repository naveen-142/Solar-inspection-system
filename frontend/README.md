# AI Solar Inspection Platform

A production-ready React application for AI-powered solar energy inspection.

## Features

- **Education Hub**: Learn about renewable energy and common solar faults.
- **AI Inspection**: Upload drone imagery to detect visual anomalies.
- **Results Dashboard**: View detected panels, anomalies, and estimated energy loss.
- **Responsive Design**: Works on all devices.

## Tech Stack

- React 19 (Vite)
- Tailwind CSS
- React Router DOM
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Axios (API Integration)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Project Structure

- `src/components`: Reusable UI components (Layout, etc.)
- `src/pages`: Main application views (Landing, Inspection, Results)
- `src/context`: Global state management
- `src/assets`: Static assets

## Notes

- API requests are sent to `/api/analyze`.
- If the backend is not available, the application will degrade gracefully and show mock data for demonstration purposes.
