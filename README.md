# Zorvyn Finance Dashboard UI

A clean, interactive, and responsive finance dashboard built for the Zorvyn Frontend Developer Intern assessment. The project focuses on clear frontend architecture, polished UI states, and practical dashboard interactions using mock financial data.

## Overview

This application simulates a user's financial activity, allowing them to:

- view a financial summary
- explore and manage transactions
- understand spending trends through charts and insights
- switch between `Viewer` and `Admin` roles on the frontend

### Live Demo & Repository

- **Live Deployment:** [Zorvyn Finance App](https://zorvyn-finance-ashish-p.vercel.app/)
- **Repository:** [GitHub Source Code](https://github.com/ashishmishra4444/ZorvynFinance)

## Features

### Core Assignment Coverage

- **Dashboard Overview:** Summary cards for total balance, income, and expenses.
- **Time-Based Visualization:** Trend chart showing income vs expenses over time.
- **Categorical Visualization:** Spending breakdown pie chart by category.
- **Transactions Section:** Search, sort, and filter transactions from a dedicated page.
- **Role-Based UI:** `Viewer` can browse data, while `Admin` can add, edit, and delete transactions.
- **Insights Section:** Highest spending category, largest transaction, and month-over-month expense comparison.
- **State Management:** React Context API manages transactions, role state, theme, and filters.
- **Responsive Design:** Layout adapts across desktop and smaller screen sizes.
- **Empty States:** Dashboard and table handle no-data and no-results states gracefully.

### Optional Enhancements Included

- **Dark Mode Toggle**
- **Local Storage Persistence**
- **Mock API Layer with Simulated Delay**
- **Animations and Transitions with Framer Motion**
- **Export to CSV and JSON**
- **Custom Filter Dropdowns**

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router 7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State Management:** React Context API + custom hook
- **Icons:** Lucide React
- **Notifications:** React Toastify

## Architecture & Approach

1. **Separation of concerns:** `mockApi.js` simulates the backend layer, `AppContext.jsx` owns shared state and business rules, and UI components stay focused on rendering and interaction.
2. **Frontend RBAC simulation:** Role changes happen entirely on the frontend, but the context layer also protects mutations so the demo behavior feels intentional.
3. **Reusable dashboard building blocks:** Summary cards, charts, filters, table, form modal, and insights are split into focused components for maintainability.
4. **Persistent demo experience:** Transactions and theme settings are stored locally so the dashboard remains useful after refresh.

## Folder Structure

```text
src/
  components/
    common/         Reusable UI primitives
    dashboard/      Summary cards, charts, insights
    layout/         Sidebar, navbar, page wrapper
    transactions/   Table, form, filters
  context/          Global app state
  hooks/            Context hook bridge
  pages/            Dashboard and transactions pages
  services/         Mock async API
  utils/            Formatters and export helpers
```

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/ashishmishra4444/ZorvynFinance.git
cd ZorvynFinance
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app at `http://localhost:5173`

## Notes for Reviewers

- The app uses static/mock data with a simulated async API to keep the focus on frontend implementation.
- Role-based behavior is intentionally frontend-only and meant for demonstration.
- Transactions and theme preference persist via `localStorage`.

Built by Ashish Kumar Mishra for the Zorvyn Frontend Assessment.
