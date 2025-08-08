# Vogue Vault E-commerce Platform ✨

A modern, full-stack e-commerce application designed to provide a seamless shopping experience. Built with a robust Node.js backend using Express and MongoDB, and a dynamic React.js frontend, this platform supports product browsing, cart management, and secure payment processing.

## Project Overview

This repository contains a complete e-commerce solution, featuring a scalable backend API and an intuitive frontend interface. Users can browse products by category, search for specific items, add products to their shopping cart, manage quantities, and complete purchases securely via Paystack. Firebase is integrated for robust user authentication.

## Features

*   🛍️ **Product Catalog**: Browse a wide range of products with detailed descriptions, images, prices, and stock information.
*   🔍 **Product Search & Filtering**: Efficiently find products using search queries and filter by category (Men's, Women's, All).
*   🛒 **Shopping Cart Management**: Add items to cart, update quantities, remove items, and clear the entire cart.
*   💳 **Secure Checkout**: Seamless checkout process with integrated Paystack payment gateway.
*   🚀 **User Authentication**: Secure user registration and login powered by Firebase.
*   🖼️ **Image Management**: Product image uploads and storage via Cloudinary.
*   📱 **Responsive Design**: Optimized for a consistent experience across desktop and mobile devices.

## Technologies Used

| Category   | Technology       | Description                                  |
| :--------- | :--------------- | :------------------------------------------- |
| **Frontend** | React.js         | UI library for building interactive user interfaces. |
|            | Vite             | Fast development build tool for React.       |
|            | Tailwind CSS     | Utility-first CSS framework for styling.     |
|            | React Router DOM | Declarative routing for React.               |
|            | Axios            | Promise-based HTTP client.                   |
|            | Firebase (Auth)  | User authentication and management.          |
|            | React Hot Toast  | Lightweight and customizable notifications.  |
| **Backend**  | Node.js          | JavaScript runtime environment.              |
|            | Express.js       | Web application framework for Node.js.       |
|            | MongoDB          | NoSQL database for flexible data storage.    |
|            | Mongoose         | ODM for MongoDB and Node.js.                 |
|            | Multer           | Middleware for handling `multipart/form-data`. |
|            | Cloudinary       | Cloud-based image and video management.      |
|            | Paystack         | Online payment gateway integration.          |
|            | Dotenv           | Loads environment variables from a `.env` file. |
| **Tools**    | ESLint           | Pluggable JavaScript linter.                 |
|            | Nodemon          | Automatically restarts Node.js application.  |

# Vogue Vault E-commerce API

## Overview
The Vogue Vault E-commerce API is a robust backend solution built with **Node.js** and **Express.js**. It provides RESTful endpoints for managing products, handling shopping carts, processing orders, and integrating with **MongoDB** for data persistence, **Cloudinary** for image storage, and **Paystack** for secure payment processing.

## Features
- **Express.js**: Foundation for building the RESTful API endpoints.
- **MongoDB (Mongoose)**: NoSQL database for flexible and scalable data storage, managed through Mongoose ODM.
- **Cloudinary**: Cloud-based service for efficient product image storage and retrieval.
- **Paystack**: Secure integration for handling payment initialization and verification.
- **Multer & Multer-Storage-Cloudinary**: Middleware for robust file (image) uploads directly to Cloudinary.
- **CORS**: Configured to allow cross-origin requests, enabling seamless frontend-backend communication.

## Getting Started

To get the Vogue Vault E-commerce platform running locally, follow these steps.

### Installation

1.  Navigate to the project root and clone the repository:
    ```bash
    git clone https://github.com/Arowolo22/e-commerce.git
    cd e-commerce
    ```

2.  **Install Backend Dependencies**:
    Navigate into the `server` directory and install its dependencies.
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies**:
    Navigate into the `client` directory and install its dependencies.
    ```bash
    cd ../client
    npm install
    ```
    After installation, return to the project root: `cd ..`

### Environment Variables

Both the client and server components require specific environment variables for configuration. Create a `.env` file in the `server` directory and another in the `client` directory (or manage them through your build system for the client).

#### Server-side (`server/.env`)

```dotenv
PORT=5000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.<your-cluster-id>.mongodb.net/<databaseName>?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=<YourCloudinaryCloudName>
CLOUDINARY_API_KEY=<YourCloudinaryAPIKey>
CLOUDINARY_API_SECRET=<YourCloudinaryAPISecret>
PAYSTACK_SECRET_KEY=sk_test_<YourPaystackSecretKey>
PAYSTACK_CALLBACK_URL=http://localhost:5000 # Or your deployed backend URL
```

#### Client-side (`client/.env` - recommended, though some are hardcoded in provided code)

While some Firebase and Paystack public keys are directly in `client/src/config/firebase.js` and `client/src/pages/Checkout.jsx` in the provided code, it is best practice to manage them via environment variables (e.g., `VITE_` prefixed variables for Vite).

```dotenv
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyB1_qBYzy0Q8YeGjGzoH3qXnL-Hfsv9qmY # Example from firebase.js
VITE_FIREBASE_AUTH_DOMAIN=e-commerce-aba1f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=e-commerce-aba1f
VITE_FIREBASE_STORAGE_BUCKET=e-commerce-aba1f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=2394363981
VITE_FIREBASE_APP_ID=1:2394363981:web:a4987b7b2deacef4f92404
VITE_FIREBASE_MEASUREMENT_ID=G-VL5XSH4S81

# Paystack Public Key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_a99ba50a93a9e9bcc97324eeb9baaf060ef107ab # Example from Checkout.jsx
```

**Note on Database Setup:**
Ensure your MongoDB instance is running or you have configured a cloud-based MongoDB Atlas cluster. The `MONGODB_URL` in your `server/.env` should point to your database connection string.

## API Documentation

### Base URL
All API endpoints are prefixed with: `https://e-commerce-1-aiq5.onrender.com/api`

### Endpoints

#### `POST /api/products`
Creates a new product. Supports image upload via `multipart/form-data`.
**Request**:
`Content-Type: multipart/form-data`
| Field          | Type   | Description                               | Required | Example                                                                |
| :------------- | :----- | :---------------------------------------- | :------- | :--------------------------------------------------------------------- |
| `image`        | File   | Product image file.                       | Yes      | (Binary file upload)                                                   |
| `name`         | String | Name of the product.                      | Yes      | `"Leather Jacket"`                                                     |
| `description`  | String | Detailed description of the product.      | Yes      | `"High-quality leather jacket with durable lining."`                   |
| `price`        | Number | Price of the product.                     | Yes      | `15000`                                                                |
| `category`     | String | Product category (e.g., "Male", "Female", "clothing", "footwear"). | Yes      | `"clothing"`                                                           |
| `stockQuantity`| Number | Number of units in stock.                 | Yes      | `100`                                                                  |
| `size`         | Array of Strings | Available sizes (e.g., `["S", "M", "L"]`). | Yes      | `["S", "M", "L", "XL"]`                                                |
| `color`        | Array of Strings | Available colors (e.g., `["Black", "Brown"]`). | Yes      | `["Black", "Brown"]`                                                   |

**Response**:
`HTTP 201 Created`
```json
{
  "_id": "654321abcdef01234567890a",
  "name": "Leather Jacket",
  "description": "High-quality leather jacket with durable lining.",
  "price": 15000,
  "category": "clothing",
  "imageUrl": "https://res.cloudinary.com/yourcloud/image/upload/v123456789/ecommerce-products/jacket.jpg",
  "stockQuantity": 100,
  "size": ["S", "M", "L", "XL"],
  "color": ["Black", "Brown"],
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
- `HTTP 400 Bad Request`: Invalid input data.
- `HTTP 500 Internal Server Error`: Server error during product creation.

#### `GET /api/products`
Retrieves all products, with optional category filtering.
**Request**:
`GET /api/products?category=Male` (Optional query parameter `category` can be `Male`, `Female`, or `all`).
**Response**:
`HTTP 200 OK`
```json
[
  {
    "_id": "654321abcdef01234567890a",
    "name": "Leather Jacket",
    "description": "High-quality leather jacket with durable lining.",
    "price": 15000,
    "category": "clothing",
    "imageUrl": "https://...",
    "stockQuantity": 100,
    "size": ["S", "M", "L", "XL"],
    "color": ["Black", "Brown"],
    "createdAt": "2023-10-26T10:00:00.000Z",
    "updatedAt": "2023-10-26T10:00:00.000Z"
  }
]
```
**Errors**:
- `HTTP 500 Internal Server Error`: Server error during product retrieval.

#### `GET /api/products/search`
Searches products by name or description.
**Request**:
`GET /api/products/search?q=jeans` (Query parameter `q` for search term).
**Response**:
`HTTP 200 OK`
```json
[
  {
    "_id": "654321abcdef01234567890b",
    "name": "Classic Blue Jeans",
    "description": "Comfortable denim jeans.",
    "price": 5000,
    "category": "clothing",
    "imageUrl": "https://...",
    "stockQuantity": 50,
    "size": ["30", "32", "34"],
    "color": ["Blue"],
    "createdAt": "2023-10-26T10:05:00.000Z",
    "updatedAt": "2023-10-26T10:05:00.000Z"
  }
]
```
**Errors**:
- `HTTP 500 Internal Server Error`: Server error during search.

#### `POST /api/products/test/create`
Creates a set of predefined test products.
**Request**:
No request body required.
**Response**:
`HTTP 201 Created`
```json
{
  "message": "Test products created successfully",
  "products": [
    {
      "name": "Test T-Shirt",
      "description": "A comfortable cotton t-shirt for testing",
      "price": 2500,
      "category": "clothing",
      "imageUrl": "https://via.placeholder.com/300x300?text=Test+T-Shirt",
      "stockQuantity": 50,
      "size": ["S", "M", "L", "XL"],
      "color": ["Red", "Blue", "Black", "White"],
      "_id": "654321abcdef01234567890c",
      "createdAt": "2023-10-26T10:10:00.000Z",
      "updatedAt": "2023-10-26T10:10:00.000Z"
    }
    // ... more test products
  ]
}
```
**Errors**:
- `HTTP 500 Internal Server Error`: Server error during test product creation.

#### `GET /api/products/:id`
Retrieves a single product by its ID.
**Request**:
`GET /api/products/654321abcdef01234567890a`
**Response**:
`HTTP 200 OK`
```json
{
  "_id": "654321abcdef01234567890a",
  "name": "Leather Jacket",
  "description": "High-quality leather jacket with durable lining.",
  "price": 15000,
  "category": "clothing",
  "imageUrl": "https://...",
  "stockQuantity": 100,
  "size": ["S", "M", "L", "XL"],
  "color": ["Black", "Brown"],
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
- `HTTP 404 Not Found`: Product not found with the given ID.
- `HTTP 500 Internal Server Error`: Server error during product retrieval.

#### `PUT /api/products/:id`
Updates an existing product by its ID. Supports optional image re-upload.
**Request**:
`Content-Type: multipart/form-data`
| Field          | Type   | Description                               | Required | Example                                                                |
| :------------- | :----- | :---------------------------------------- | :------- | :--------------------------------------------------------------------- |
| `image`        | File   | Optional new product image file.          | No       | (Binary file upload)                                                   |
| `name`         | String | Updated name of the product.              | No       | `"Premium Leather Jacket"`                                             |
| `description`  | String | Updated description.                      | No       | `"An even better description."`                                        |
| `price`        | Number | Updated price.                            | No       | `16000`                                                                |
| `category`     | String | Updated category.                         | No       | `"accessories"`                                                        |
| `stockQuantity`| Number | Updated stock quantity.                   | No       | `95`                                                                   |
| `size`         | Array of Strings | Updated available sizes.          | No       | `["M", "L", "XL"]`                                                     |
| `color`        | Array of Strings | Updated available colors.         | No       | `["Black"]`                                                            |

**Response**:
`HTTP 200 OK`
```json
{
  "_id": "654321abcdef01234567890a",
  "name": "Premium Leather Jacket",
  "description": "An even better description.",
  "price": 16000,
  "category": "accessories",
  "imageUrl": "https://res.cloudinary.com/yourcloud/image/upload/v123456789/ecommerce-products/updated_jacket.jpg",
  "stockQuantity": 95,
  "size": ["M", "L", "XL"],
  "color": ["Black"],
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:30:00.000Z"
}
```
**Errors**:
- `HTTP 400 Bad Request`: Invalid input data.
- `HTTP 404 Not Found`: Product not found with the given ID.
- `HTTP 500 Internal Server Error`: Server error during product update.

#### `DELETE /api/products/:id`
Deletes a product by its ID.
**Request**:
`DELETE /api/products/654321abcdef01234567890a`
**Response**:
`HTTP 200 OK`
```json
{
  "message": "Product deleted"
}
```
**Errors**:
- `HTTP 404 Not Found`: Product not found with the given ID.
- `HTTP 500 Internal Server Error`: Server error during product deletion.

#### `GET /api/cart`
Retrieves all items currently in the shopping cart.
**Request**:
No request body required.
**Response**:
`HTTP 200 OK`
```json
{
  "cartItems": [
    {
      "_id": "654321abcdef01234567890d",
      "product": "654321abcdef01234567890a",
      "name": "Leather Jacket",
      "price": 15000,
      "imageUrl": "https://...",
      "selectedSize": "M",
      "quantity": 2,
      "createdAt": "2023-10-26T11:00:00.000Z",
      "updatedAt": "2023-10-26T11:00:00.000Z"
    }
  ],
  "total": 30000
}
```
**Errors**:
- `HTTP 500 Internal Server Error`: Server error during cart retrieval.

#### `POST /api/cart/add`
Adds a product to the shopping cart. If the product with the same size already exists, its quantity will be incremented.
**Request**:
```json
{
  "product": "654321abcdef01234567890a",
  "name": "Leather Jacket",
  "price": 15000,
  "imageUrl": "https://...",
  "selectedSize": "M",
  "quantity": 1
}
```
**Response**:
`HTTP 201 Created` (for new item) or `HTTP 200 OK` (for updated item)
```json
{
  "_id": "654321abcdef01234567890d",
  "product": "654321abcdef01234567890a",
  "name": "Leather Jacket",
  "price": 15000,
  "imageUrl": "https://...",
  "selectedSize": "M",
  "quantity": 1,
  "createdAt": "2023-10-26T11:00:00.000Z",
  "updatedAt": "2023-10-26T11:00:00.000Z"
}
```
**Errors**:
- `HTTP 400 Bad Request`: Missing required fields (`product`, `name`, `price`, `imageUrl`, `selectedSize`, `quantity`).
- `HTTP 500 Internal Server Error`: Server error during addition to cart.

#### `PUT /api/cart/update/:id`
Updates the quantity or selected size of a specific cart item.
**Request**:
`PUT /api/cart/update/654321abcdef01234567890d`
```json
{
  "quantity": 3,
  "selectedSize": "L"
}
```
**Response**:
`HTTP 200 OK`
```json
{
  "_id": "654321abcdef01234567890d",
  "product": "654321abcdef01234567890a",
  "name": "Leather Jacket",
  "price": 15000,
  "imageUrl": "https://...",
  "selectedSize": "L",
  "quantity": 3,
  "createdAt": "2023-10-26T11:00:00.000Z",
  "updatedAt": "2023-10-26T11:05:00.000Z"
}
```
**Errors**:
- `HTTP 404 Not Found`: Cart item not found with the given ID.
- `HTTP 500 Internal Server Error`: Server error during cart item update.

#### `DELETE /api/cart/delete/:id`
Deletes a specific item from the shopping cart.
**Request**:
`DELETE /api/cart/delete/654321abcdef01234567890d`
**Response**:
`HTTP 200 OK`
```json
{
  "message": "Cart item deleted"
}
```
**Errors**:
- `HTTP 404 Not Found`: Cart item not found with the given ID.
- `HTTP 500 Internal Server Error`: Server error during cart item deletion.

#### `POST /api/cart/clear`
Clears all items from the shopping cart.
**Request**:
No request body required.
**Response**:
`HTTP 200 OK`
```json
{
  "message": "Cart cleared"
}
```
**Errors**:
- `HTTP 500 Internal Server Error`: Server error during cart clear.

#### `POST /api/payments/init`
Initializes a payment with Paystack for a given amount and creates a pending order.
**Request**:
```json
{
  "amount": 45000,
  "email": "customer@example.com",
  "items": [
    {
      "product": "654321abcdef01234567890a",
      "name": "Leather Jacket",
      "price": 15000,
      "imageUrl": "https://...",
      "selectedSize": "M",
      "quantity": 3
    }
  ],
  "user": "firebase-user-id-123",
  "billingDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "08012345678",
    "email": "customer@example.com",
    "address": "123 Main St",
    "city": "Lagos",
    "state": "Lagos",
    "zipCode": "100001",
    "country": "Nigeria"
  }
}
```
**Response**:
`HTTP 200 OK`
```json
{
  "authorization_url": "https://checkout.paystack.com/your-auth-url",
  "reference": "psk_1678888888888",
  "orderId": "654321abcdef01234567890e"
}
```
**Errors**:
- `HTTP 400 Bad Request`: Missing required fields.
- `HTTP 500 Internal Server Error`: Paystack initialization failed or server error.

#### `GET /api/payments/verify/:reference`
Verifies the status of a Paystack payment using its reference.
**Request**:
`GET /api/payments/verify/psk_1678888888888`
**Response**:
`HTTP 200 OK` (for success) or `HTTP 400 Bad Request` (for failure)
```json
{
  "status": "success",
  "paystackRes": {
    "id": 1234567,
    "domain": "test",
    "status": "success",
    "reference": "psk_1678888888888",
    "amount": 4500000,
    "message": null,
    "gateway_response": "Successful",
    // ... more Paystack data
  }
}
```
**Errors**:
- `HTTP 400 Bad Request`: Payment status is not 'success'.
- `HTTP 500 Internal Server Error`: Paystack verification failed or server error.

#### `POST /api/orders`
Manually creates an order (primarily for internal use or testing).
**Request**:
```json
{
  "user": "firebase-user-id-123",
  "items": [
    {
      "product": "654321abcdef01234567890a",
      "name": "Leather Jacket",
      "price": 15000,
      "imageUrl": "https://...",
      "selectedSize": "M",
      "quantity": 1
    }
  ],
  "amount": 15000,
  "paystackReference": "manual_ref_12345",
  "email": "manual@example.com",
  "billingDetails": {
    "firstName": "Manual",
    "lastName": "User",
    "phone": "09011112222",
    "email": "manual@example.com",
    "address": "456 Test Lane",
    "city": "Ibadan",
    "state": "Oyo",
    "zipCode": "200001",
    "country": "Nigeria"
  }
}
```
**Response**:
`HTTP 201 Created`
```json
{
  "_id": "654321abcdef01234567890f",
  "user": "firebase-user-id-123",
  "items": [
    {
      "product": "654321abcdef01234567890a",
      "name": "Leather Jacket",
      "price": 15000,
      "imageUrl": "https://...",
      "selectedSize": "M",
      "quantity": 1,
      "_id": "654321abcdef012345678910"
    }
  ],
  "amount": 15000,
  "status": "pending",
  "paystackReference": "manual_ref_12345",
  "email": "manual@example.com",
  "billingDetails": {
    "firstName": "Manual",
    "lastName": "User",
    "phone": "09011112222",
    "email": "manual@example.com",
    "address": "456 Test Lane",
    "city": "Ibadan",
    "state": "Oyo",
    "zipCode": "200001",
    "country": "Nigeria"
  },
  "createdAt": "2023-10-26T12:00:00.000Z",
  "updatedAt": "2023-10-26T12:00:00.000Z"
}
```
**Errors**:
- `HTTP 400 Bad Request`: Missing required fields.
- `HTTP 500 Internal Server Error`: Server error during order creation.

#### `GET /api/orders`
Retrieves all orders (primarily for administrative or testing purposes).
**Request**:
No request body required.
**Response**:
`HTTP 200 OK`
```json
[
  {
    "_id": "654321abcdef01234567890e",
    "user": "firebase-user-id-123",
    "items": [
      {
        "product": "654321abcdef01234567890a",
        "name": "Leather Jacket",
        "price": 15000,
        "imageUrl": "https://...",
        "selectedSize": "M",
        "quantity": 3,
        "_id": "654321abcdef012345678911"
      }
    ],
    "amount": 45000,
    "status": "paid",
    "paystackReference": "psk_1678888888888",
    "email": "customer@example.com",
    "billingDetails": {
      "firstName": "John",
      "lastName": "Doe",
      "phone": "08012345678",
      "email": "customer@example.com",
      "address": "123 Main St",
      "city": "Lagos",
      "state": "Lagos",
      "zipCode": "100001",
      "country": "Nigeria"
    },
    "createdAt": "2023-10-26T11:30:00.000Z",
    "updatedAt": "2023-10-26T11:45:00.000Z"
  }
]
```
**Errors**:
- `HTTP 500 Internal Server Error`: Server error during order retrieval.

---

## Usage

To start and interact with the Vogue Vault E-commerce platform:

### Start the Backend Server

1.  Open your terminal in the `e-commerce/server` directory.
2.  Run the development server:
    ```bash
    npm run dev
    ```
    The server will typically run on `http://localhost:5000` (or the `PORT` specified in your `.env`). You should see a message indicating the server is running.

### Start the Frontend Application

1.  Open a **new terminal** and navigate to the `e-commerce/client` directory.
2.  Start the React development server:
    ```bash
    npm run dev
    ```
    This will typically open the application in your browser at `http://localhost:5173` (or another available port).

### Interacting with the Application

*   **Registration/Login**: Upon launching the frontend, you will be redirected to the login page. Create a new account or log in with existing Firebase credentials.
*   **Browse Products**: After logging in, you can explore products on the homepage. Use the navigation links to filter by category or view all products.
*   **Product Details**: Click on any product to view its detailed information, select size and quantity, and add it to your cart.
*   **Shopping Cart**: Access your cart from the navigation bar. You can update item quantities or remove items before proceeding to checkout.
*   **Checkout**: Proceed to checkout from the cart page. Fill in your billing details and complete the payment using Paystack.

## Contributing

We welcome contributions to the Vogue Vault E-commerce Platform! To contribute:

*   🍴 Fork the repository.
*   🌿 Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b fix/bug-description`.
*   🚀 Make your changes and commit them with a clear, concise message.
*   🧪 Ensure your code passes any existing tests and add new tests if necessary.
*   ⬆️ Push your branch to your forked repository.
*   🔄 Open a pull request to the `main` branch of this repository, describing your changes in detail.

## License

This project is licensed under the MIT License.

## Author Info

Connect with the author of this project:

*   **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
*   **Twitter**: [Your Twitter Profile](https://twitter.com/yourusername)
*   **Portfolio**: [Your Personal Website](https://yourwebsite.com)

---
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Paystack](https://img.shields.io/badge/Paystack-00C3F7?style=for-the-badge&logo=paystack&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)