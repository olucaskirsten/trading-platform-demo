# QuantumTrade Simulator

<div align="center">

## React + Node.js Trading Platform Demo

A modern simulated trading dashboard built with React, Node.js, mock APIs, animated UI components and a professional front-end architecture.

<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20Project-8B5CF6?style=for-the-badge)](https://trading-platform-demo-kappa.vercel.app/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Mock%20Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=fff)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=fff)](https://vercel.com/)

</div>

---

## Live Project

You can access the deployed version here:

```txt
https://trading-platform-demo-kappa.vercel.app/
```

---

## About the Project

**QuantumTrade Simulator** is a portfolio project focused on building a modern trading platform interface using **React** and **Node.js**.

The idea behind this project is to simulate the experience of a binary options / trading platform without connecting to real financial services, brokers or live market APIs. It was created as a front-end and full-stack simulation project to demonstrate interface design, protected routes, mock authentication, simulated market data, animated dashboards and API integration.

The application includes a dark tech-inspired interface, live-style market charts, asset cards, currency and crypto comparison screens, client account management, login and registration flows, and a mock backend structure prepared for local development and Vercel deployment.

This project was designed specifically for portfolio purposes, showing skills in React architecture, Node.js APIs, component organization, dashboard UI, data visualization and modern web application development.

---

## Important Disclaimer

This is a **simulated trading platform** created only for educational and portfolio purposes.

It does not:

- Execute real trades
- Connect to brokers
- Use real financial data
- Store sensitive financial information
- Provide investment advice
- Represent a real trading product

All account data, market prices, charts, orders, balances and results are mocked or simulated.

---

## Demo Access

You can use the demo credentials below:

```txt
Email: demo@quantumtrade.dev
Password: demo123
```

You can also create a local demo account using the registration page.

---

## Main Features

- Simulated login and registration flow
- Demo account creation success screen
- Protected dashboard routes
- Logout functionality
- Live-style trading dashboard
- Simulated Call / Put order ticket
- Animated asset movement chart
- Four simulated trading assets
- Portfolio overview page
- Currency and crypto comparison page
- Clickable market cards with individual chart panels
- Market chart filters: 1D, 1W, 1M and 1Y
- Global search dropdown
- Search navigation to specific market panels
- Trade history page
- Watchlist page
- Market insights page
- Risk settings page
- Client account page
- Editable profile information
- Profile photo upload simulation
- Banking details form
- Password update simulation for local demo accounts
- Responsive dark UI
- Framer Motion animations
- Mock Node.js API layer
- Vercel-ready API functions

---

## Tech Stack

### Frontend

- React
- React Router
- Vite
- Framer Motion
- Recharts
- Lucide React
- Page-specific CSS structure

### Backend Simulation

- Node.js
- Express for local mock API
- Vercel Serverless Functions
- Mock JSON-based data structure
- LocalStorage for front-end account simulation

### Deployment

- Vercel
- GitHub integration

---

## Project Structure

```txt
quantum-trade-simulator/
├── api/
│   ├── _lib/
│   │   ├── data.js
│   │   └── response.js
│   ├── auth.js
│   ├── register.js
│   ├── market.js
│   ├── portfolio.js
│   └── orders.js
│
├── server/
│   └── index.js
│
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   ├── Account/
│   │   │   ├── index.jsx
│   │   │   └── Account.css
│   │   ├── Dashboard/
│   │   │   ├── index.jsx
│   │   │   └── Dashboard.css
│   │   ├── Login/
│   │   │   ├── index.jsx
│   │   │   └── Login.css
│   │   ├── Markets/
│   │   │   ├── index.jsx
│   │   │   └── Markets.css
│   │   └── ...
│   ├── services/
│   ├── styles/
│   └── utils/
│
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## Why This Project Uses One `index.html`

This project is built with **React and Vite**, following the standard structure of a modern single-page application.

That means the project uses one physical `index.html` file, while each screen is handled as a React route.

Each page is still organized professionally inside its own folder:

```txt
src/pages/Login/index.jsx
src/pages/Login/Login.css

src/pages/Markets/index.jsx
src/pages/Markets/Markets.css

src/pages/Account/index.jsx
src/pages/Account/Account.css
```

This is the expected architecture for a React application deployed on Vercel.

---

## Pages

### Login

The login page allows users to access the simulator using demo credentials or a locally created account.

### Register

The registration page lets users create a local demo account. After registration, a success message is displayed and the user can return to the login page.

### Dashboard

The main dashboard displays simulated live asset movement, account metrics and a Call / Put order ticket.

### Markets

The markets page displays currencies and crypto assets. Each card opens a dedicated chart panel with simulated historical movement.

### Portfolio

The portfolio page displays account balance, equity, exposure, win rate and open positions.

### Orders

The orders page shows a simulated trade history table.

### Watchlist

The watchlist page allows users to monitor favorite assets and simulated market movements.

### Insights

The insights page presents simulated market intelligence, warnings and product-style signal cards.

### Risk Settings

The risk settings page simulates user preferences, trading limits and safety controls.

### Account

The account page allows users to edit profile information, upload a simulated profile photo, add banking details and update their local demo password.

---

## Local Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

Enter the project folder:

```bash
cd quantum-trade-simulator
```

Install dependencies:

```bash
npm install
```

Run the React app and the local mock API together:

```bash
npm run dev:all
```

Open the project:

```txt
http://localhost:5173
```

---

## Available Scripts

### Start the frontend only

```bash
npm run dev
```

### Start the local mock API only

```bash
npm run server
```

### Start frontend and backend together

```bash
npm run dev:all
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Deployment

This project is ready to deploy on Vercel.

Recommended settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

The `/api` folder is used by Vercel as serverless Node.js functions.

---

## Portfolio Focus

This project was created to demonstrate:

- React application architecture
- Component-based development
- Protected route logic
- Mock authentication
- Node.js API simulation
- Vercel deployment workflow
- Data visualization with charts
- Animated dashboard interfaces
- UI/UX for fintech-style products
- Organized project structure
- Front-end handling of simulated user data
- Professional portfolio presentation

---

## Future Improvements

Possible future improvements include:

- Real authentication with JWT
- Database integration
- Real market API integration
- User role management
- Advanced chart indicators
- Dark/light mode toggle
- Form validation library
- Unit and integration tests
- Improved accessibility
- Backend persistence for accounts and orders

---

## Author

Developed by **Lucas Eduardo Abrantes Kirsten**

Portfolio:

```txt
https://olkbr.com
```

LinkedIn:

```txt
https://www.linkedin.com/in/olucaskirsten
```

GitHub:

```txt
https://github.com/olucaskirsten
```

---

## License

This project is available for portfolio and educational purposes.
