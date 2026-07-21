# Weather Intelligence

A live weather search, 7-day forecast, and smart planning recommendations application built with React and Vite. It relies solely on the [Open-Meteo API](https://open-meteo.com/), requiring absolutely no API keys or backend services.

## Features

- **Live Weather Data**: Retrieve current temperature, wind speed, and weather conditions.
- **7-Day Forecast**: View maximum/minimum temperatures and rain probabilities for the week.
- **Smart Recommendations**: Get actionable planning advice (e.g., "Carry an umbrella", "Stay hydrated") based on the current weather and forecasts.
- **Responsive Layout**: Designed for seamless viewing across mobile, tablet, and desktop devices.
- **Error Handling**: Graceful fallback states for empty searches, invalid cities, network failures, or API unavailability.

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Lucide React** (Icons)
- **Open-Meteo APIs** (Geocoding & Forecast)

## Installation

1. Ensure you have Node.js (v18+) installed.
2. Clone this repository or download the source code.
3. Install dependencies:

   ```bash
   npm install
   ```

## Development

Run the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is occupied).

## Deployment

To create a production build:

```bash
npm run build
```

This will generate static files in the `dist` directory. You can host these files on any static hosting provider like Vercel, Netlify, GitHub Pages, or Firebase Hosting. 

Since this application runs entirely client-side and requires no environment variables or API keys, it is instantly deployable.
