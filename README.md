# QuantumTrade Simulator

A portfolio-ready front-end project built with **React + Node.js** for a simulated binary options trading platform.

> This is a UI/UX and front-end engineering demo. It does not execute real trades, provide financial advice, connect to brokers, or use real market data.

## Live Demo

Add your Vercel production URL here after deployment:

```txt
https://your-project-name.vercel.app
```

## Demo Access

```txt
Email: demo@quantumtrade.dev
Password: demo123
```

## Main Features

- Simulated login, registration, account creation success screen and logout flow
- Protected dashboard routes
- Live market chart simulation with green/red movement
- Four simulated trading assets
- Simulated buy/order ticket
- Portfolio overview
- Currency and crypto comparison screen with clickable detail charts
- Global search dropdown with direct navigation to assets, currencies and crypto panels
- Watchlist page
- Trade history page
- Risk profile/settings page
- Client account page with editable profile, profile photo and banking details
- Mock Node.js API layer for local development and Vercel deployment
- Responsive dark tech UI with purple accents
- Animated page transitions, staggered cards, hover interactions, glowing background effects and live signal microinteractions

## Tech Stack

- React
- React Router
- Node.js
- Express for local mock API
- Vercel Serverless Functions for deployment
- Recharts
- Lucide React
- Framer Motion
- Vite

## Project Structure

```txt
quantum-trade-simulator/
├── api/                  # Vercel serverless functions
│   ├── _lib/             # Shared API mock logic
│   ├── auth.js
│   ├── register.js
│   ├── market.js
│   ├── portfolio.js
│   └── orders.js
├── server/               # Local Express mock server
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Auth context
│   ├── data/             # Front-end constants
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # App layout
│   ├── pages/            # Route pages organized by folder, each with index.jsx and page CSS
│   ├── services/         # API client
│   ├── styles/           # Global CSS
│   └── utils/            # Helpers
├── vercel.json
├── vite.config.js
└── package.json
```

## Run Locally

Install dependencies:

```bash
npm install
```

Run the React app and local Node API together:

```bash
npm run dev:all
```

Then open:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repository on Vercel.
3. Keep the default Vite settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy.

The `/api` folder is automatically used by Vercel as serverless Node.js functions.

## Portfolio Positioning

Suggested portfolio description:

**QuantumTrade Simulator** is a simulated trading dashboard designed to demonstrate front-end engineering, real-time UI behavior, protected routes, data visualization, API consumption, and modern dashboard interface design. The project uses a mock Node.js API and simulated market data to recreate the experience of monitoring live asset movement without involving real financial transactions.

## Important Disclaimer

This project is for educational and portfolio purposes only. All assets, prices, account balances, trades and results are simulated. Nothing in this project should be interpreted as financial advice, investment recommendation, or a real trading service.


## Architecture Note

This project uses a professional React/Vite single-page application structure. That means the app has one physical `index.html`, while each screen is separated into its own React route folder:

```txt
src/pages/Login/index.jsx
src/pages/Login/Login.css
src/pages/Markets/index.jsx
src/pages/Markets/Markets.css
src/pages/Account/index.jsx
src/pages/Account/Account.css
```

This is the standard architecture for modern React projects deployed to Vercel. Separate physical HTML files are more common in static HTML/CSS/JS projects, not in React SPAs.
