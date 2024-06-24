# Coffee Hub Web App ☕️

This project implements a Coffee Hub web application using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Technical Stack](#technical-stack)
- [Installation](#installation)

## Features

The Coffee Hub app offers functionalities for both users and admins:

### User:

- Register, login, view product listings, and create orders.

### Admin:

- Manage products (create, update, delete, search).
- Manage orders (update status, search).

### Authentication:

- JWT (JSON Web Token) secures API access and verifies user identity.
- One-Time Password (OTP) verification via email using Nodemailer for enhanced security.

## API Endpoints

RESTful API endpoints are defined for all functionalities. Refer to the backend code for detailed implementation.

### User Management:

- `POST /api/register`: Register a new user.
- `POST /api/login`: Login registered users.
- `POST /api/verifyOtp`: To verify OTP .
- `POST /api/resendOtp`: To get new OTP.

### Product Management:

- `GET /api/products`: Get all products.
- `POST /api/products` (Admin): Create a new product.
- `PUT /api/products/:id` (Admin): Update a product.
- `DELETE /api/products/:id` (Admin): Delete a product.
- `GET /api/products?search=` Search for products.

### Order Management:

- `GET /api/orders`: Get all orders.
- `POST /api/orders`: Create a new order.
- `PUT /api/orders/:id` (Admin): Update an order.
- `DELETE /api/orders/:id` (Admin): Delete an order.
- `GET /api/orders/view`: Get logged in user orders.
- `GET /api/orders?search=`: Search for orders.

## Frontend Features

The user interface provides a seamless experience for users and admins:

- **Home Page**: Welcome message with login/register options.
- **Register Page**: Form for user registration.
- **Login Page**: Form for user login.
- **Admin Dashboard**: Accessible after admin login, offering options for product and order management. (Add, edit, delete, and search features)

- **Product Form**: Form to create or update product details.
- **Car**: Effortlessly add items to purchase.

## Technical Stack

The application leverages the following technologies:

### Backend:

- **Node.js & Express.js**: Server and API endpoints.
- **MongoDB & Mongoose**: Database (user, product, order data).
- **JWT**: User authentication and API security.
- **Nodemailer**: User authentication with OTP verification.

### Frontend:

- **React.js**: User interface.
- **React Router**: Navigation between pages.
- **Redux and Context API**: Application state management.
- **Axios**: HTTP requests to the backend API.
- **Formik**: Simplifies form state management, validation, and error handling.
- **react-spinners**: Pre-built, customizable spinners to add visual feedback during long-running operations.
- **react-toastify**: Easy creation of various notification types (success, error, warning, info).

## Installation

1. Clone this repository.
2. Install dependencies: `npm install`
3. Start the development server: `npm run start` (frontend)
4. Start the backend server (in a separate terminal): `npm start`
