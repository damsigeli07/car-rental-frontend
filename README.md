# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Car Rental Management System - Frontend

React-based frontend for car rental system using Vite, React Router, and Tailwind CSS.

## Features
- User authentication (Login/Register)
- Car browsing and search
- Booking management
- Payment processing
- Admin dashboard
- Responsive design

## Tech Stack
- React 18+
- React Router v6
- Axios (HTTP client)
- Tailwind CSS
- Vite (build tool)

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```

Server starts at: `http://localhost:5173`

## Build
```bash
npm run build
```

## Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

## API Integration

Backend API: `http://localhost:5000/api`

Make sure backend is running before starting frontend!

## Project Structure
```
src/
├── pages/          - Page components
├── components/     - Reusable components
├── services/       - API service
├── context/        - Auth context
├── styles/         - CSS files
├── assets/         - Images, icons
├── App.jsx         - Main app component
└── main.jsx        - Entry point
```

## Pages to Build
- [ ] Login
- [ ] Register
- [ ] Home/Dashboard
- [ ] Car Listing
- [ ] Car Details
- [ ] Booking
- [ ] My Bookings
- [ ] Payment
- [ ] Admin Dashboard

## Testing

Backend must be running:
```bash
cd ../car-rental-backend
npm run dev
```

Frontend:
```bash
npm run dev
```

---

Generated: March 2026
