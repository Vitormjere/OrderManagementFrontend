# OrderManagementFrontend

React dashboard for OrderManagementAPI, a simple interface for managing products, customers, and orders.

Demo: https://order-management-frontend-tan.vercel.app

## About the project

Frontend built to consume [OrderManagementAPI](https://github.com/Vitormjere/OrderManagementAPI), a REST API for order management. Lets you register products and customers, and create orders by picking a customer and adding multiple items, the total is calculated automatically based on data returned by the API.

## Stack

- React (Vite)
- React Router for navigation
- Fetch API for HTTP requests
- Plain CSS (no framework)
- Deployed on Vercel with automatic deploys on push

## Features

- Full CRUD for Products and Customers
- Order creation with dynamic item list (add/remove products before submitting)
- Order status shown as color-coded badges
- Low stock warning on the products table
- Sidebar navigation between pages

## Running locally

```bash
git clone https://github.com/Vitormjere/OrderManagementFrontend.git
cd OrderManagementFrontend
npm install
npm run dev
```

By default, the app points to the production API. To use a local backend instead, update `API_BASE_URL` in `src/services/api.js`.

## Related project

Backend API: [OrderManagementAPI](https://github.com/Vitormjere/OrderManagementAPI)

## Author

Vitor Miranda Jeremias — [GitHub](https://github.com/Vitormjere)
