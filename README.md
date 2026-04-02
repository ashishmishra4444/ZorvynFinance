# Zorvyn Finance Dashboard UI

A clean, interactive, and responsive finance dashboard built for the Zorvyn Frontend Developer Intern assignment. The goal of this project is to show frontend thinking clearly through layout decisions, reusable components, managed state, mock data handling, and polished user interactions.

## Live Links

- **Live Demo:** [Zorvyn Finance App](https://zorvyn-finance-ashish-p.vercel.app/)
- **Repository:** [GitHub Source Code](https://github.com/ashishmishra4444/ZorvynFinance)

## Project Overview

This app simulates a lightweight personal finance dashboard where a user can:

- view overall balance, income, and expense summaries
- analyze financial activity using charts
- browse, search, sort, and filter transactions
- switch between `Viewer` and `Admin` roles
- read dashboard insights based on the current dataset

The application is frontend-only by design and uses static/mock data with a simulated async API layer.

## How This Meets The Assignment

### 1. Dashboard Overview

- Summary cards for **Total Balance**, **Total Income**, and **Total Expenses**
- A time-based chart for **Income vs Expenses**
- A category-based chart for **Spending Breakdown**
- A **Recent Activity** panel for quick transaction visibility

### 2. Transactions Section

- Transaction table with:
  - date
  - amount
  - category
  - type
- Search by category or amount
- Filter by transaction type
- Filter by category
- Sort by newest, oldest, highest amount, and lowest amount
- Reset filters and graceful empty-filter states

### 3. Basic Role-Based UI

- `Viewer` mode can only inspect data
- `Admin` mode can:
  - add transactions
  - edit transactions
  - delete transactions
- Role switching is demonstrated from the navbar
- Mutating actions are guarded in the shared context layer, not just hidden in the UI

### 4. Insights Section

The dashboard includes dynamic insights such as:

- highest spending category
- largest single transaction
- month-over-month expense comparison
- average transaction value
- top income source
- total transactions in the current month
- savings rate for the current month

### 5. State Management

Global state is managed with **React Context API** and a custom hook. It handles:

- transactions data
- role selection
- dark mode
- filter state
- async loading and error state

### 6. UI / UX Expectations

- responsive layout across desktop and smaller screens
- empty and no-results states handled cleanly
- export actions for CSV and JSON
- light and dark mode support
- keyboard-friendly custom dropdown interactions
- `aria-label` support and hover tooltips for major interactive controls

## Features

### Core Features

- Dashboard summary cards
- Trend chart and spending breakdown chart
- Transactions page with CRUD operations
- Search, filtering, sorting, and filter reset
- Frontend role-based UI
- Dynamic financial insights
- Responsive sidebar and navbar layout

### Optional Enhancements Implemented

- Dark mode toggle
- Local storage persistence
- Mock API layer with simulated latency
- Export to CSV and JSON
- Framer Motion animations and transitions
- Recent activity widget
- Accessibility improvements for buttons, dialogs, and dropdowns

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router 7
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Animations:** Framer Motion
- **State Management:** React Context API
- **Notifications:** React Toastify
- **Icons:** Lucide React

## Architecture & Approach

### Key Decisions

1. **Separation of concerns**
   - `mockApi.js` handles simulated async data access
   - `AppContext.jsx` manages shared state and business logic
   - UI components focus on rendering and interaction

2. **Frontend-only RBAC simulation**
   - The app demonstrates role-based behavior without a backend
   - Context methods also block restricted actions in `Viewer` mode

3. **Reusable component structure**
   - dashboard, layout, common, and transaction concerns are split into separate component groups

4. **Persistent demo experience**
   - transaction data and theme preference are stored in `localStorage`

## Folder Structure

```text
src/
  components/
    common/         Shared UI pieces like confirm modal
    dashboard/      Summary cards, charts, insights, recent activity
    layout/         Sidebar, navbar, page wrapper
    transactions/   Filters, form, table
  context/          Global app state
  hooks/            Context bridge hook
  pages/            Dashboard and transactions pages
  services/         Mock API layer
  utils/            Formatters and export helpers
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/ashishmishra4444/ZorvynFinance.git
cd ZorvynFinance
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

Visit:

```text
http://localhost:5173
```

## Reviewer Notes

- The app intentionally uses mock data and a simulated API because the assignment is focused on frontend implementation rather than backend integration.
- Role-based access is a frontend simulation for demonstration purposes.
- Transactions and theme state persist across refreshes through `localStorage`.
- The project emphasizes readability, reusable components, and UX polish over unnecessary complexity.

## Future Improvements

If extended further, the next logical additions would be:

- real backend/API integration
- authentication-based RBAC
- richer analytics and date-range filters
- unit tests for filters and insight calculations
- fully custom styled tooltips

Built by **Ashish Kumar Mishra** for the **Zorvyn Frontend Assessment**.
