# Zorvyn Finance Dashboard UI

A clean, interactive, and responsive finance dashboard built for the Zorvyn Frontend Developer Intern assessment. This project demonstrates modern frontend architecture, complex state management, and an acute attention to UI/UX details.

## 🚀 Overview

This application simulates a user's financial activity, allowing them to view high-level summaries, track trends, and manage individual transactions. It was built with a strict focus on frontend modularity—separating the data layer, state management, and UI components.

### Live Demo & Repository
* **Live Deployment:** [(https://zorvyn-finance-ashish-p.vercel.app/)]
* **Repository:** [(https://github.com/ashishmishra4444/ZorvynFinance)]

---

## ✨ Features Implemented

**Core Requirements:**
* **Dashboard Overview:** Displays Total Balance, Income, and Expenses, alongside responsive Area (Trend) and Pie (Categorical) charts.
* **Transactions Section:** A comprehensive data table with real-time searching, sorting, and multi-category filtering.
* **Role-Based UI (RBAC):** A seamless toggle between `Admin` and `Viewer` modes. Viewers are restricted to read-only access, while Admins can Add, Edit, and Delete transactions.
* **Dynamic Insights:** Automatically calculates the highest spending category and largest single transaction based on the active dataset.
* **State Management:** Handled globally via the React Context API to ensure seamless communication between the mock backend, filters, and UI components.

**Optional Enhancements Completed:**
* ✅ **Dark Mode Toggle:** Native CSS implementation using Tailwind v4 variants.
* ✅ **Data Persistence:** Synchronizes with `localStorage` to ensure data survives page refreshes.
* ✅ **Mock API Integration:** An asynchronous service layer (`mockApi.js`) simulates network latency (600ms delays) and resolves Promises to mimic a real backend interaction.
* ✅ **Animations & Transitions:** Buttery-smooth page routing, modal popups, and stagger-loaded lists powered by Framer Motion.
* ✅ **Export Functionality:** Users can download their transaction history as `.csv` or `.json` files.
* ✅ **Advanced Filtering:** Custom-built UI dropdowns to filter by Category, Type, and Sort Order.

---

## 🛠️ Tech Stack

* **Framework:** React 18 (Bootstrapped with Vite)
* **Routing:** React Router v6 (`BrowserRouter`)
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion
* **Visualizations:** Recharts
* **State Management:** React Context API + Custom Hooks
* **Icons:** Lucide-React
* **UX Enhancements:** React Toastify (Notifications)

---

## 🏗️ Architecture & Approach

My goal was to build an application that is not just visually appealing, but architecturally sound and ready to scale. 

1. **Separation of Concerns:** I isolated the data logic (`services/mockApi.js`) from the global state (`context/AppContext.jsx`), which is entirely separated from the UI components. This mimics a real-world application where the frontend does not care where the data comes from, only how to display it.
2. **Custom UI Components:** Instead of relying on native HTML `<select>` elements which suffer from OS-level styling restrictions, I built a custom `FormDropdown` component to ensure perfect cross-browser styling and hover states.
3. **Security by UI:** The Role-Based Access Control doesn't just hide buttons; it actively intercepts API calls in the Context layer and throws warning toasts if a `Viewer` attempts to mutate data.

### Folder Structure

\`\`\`text
/src
  /components
    /common      # Reusable UI (ConfirmModal)
    /dashboard   # SummaryCards, Charts, Insights
    /layout      # Sidebar, Navbar, PageWrapper
    /transactions# TransactionTable, TransactionForm, Filters
  /context       # AppContext (Global State)
  /hooks         # useAppContext bridge
  /pages         # DashboardPage, TransactionsPage
  /services      # mockApi (Simulated async backend)
  /utils         # formatters, export logic
\`\`\`

---

## 💻 Local Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**
   \`\`\`bash
   git clone [(https://github.com/ashishmishra4444/ZorvynFinance)]
   cd zorvynfinance
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **View the application:**
   Open your browser and navigate to `http://localhost:5173`

---
*Built by Ashish Kumar Mishra for the Zorvyn Frontend Assessment.*