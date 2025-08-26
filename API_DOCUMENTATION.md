# E-commerce API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User

- **POST** `/auth/register`
- **Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

#### Login User

- **POST** `/auth/login`
- **Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User

- **GET** `/auth/me`
- **Headers:** Authorization required

#### Forgot Password

- **POST** `/auth/forgotpassword`
- **Body:**

```json
{
  "email": "john@example.com"
}
```

#### Reset Password

- **PUT** `/auth/resetpassword/:resetToken`
- **Body:**

```json
{
  "newPassword": "newpassword123"
}
```

### Products

#### Get All Products

- **GET** `/products`
- **Query Parameters:**
  - `category` - Filter by category ID
  - `search` - Search in title and description
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter

#### Get Product by ID

- **GET** `/products/:id`

#### Create Product (Admin Only)

- **POST** `/products`
- **Headers:** Authorization required (Admin)
- **Body:**

```json
{
  "title": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "category_id",
  "stock": 100,
  "image": "image_url"
}
```

#### Update Product (Admin Only)

- **PUT** `/products/:id`
- **Headers:** Authorization required (Admin)
- **Body:** Same as create (all fields optional)

#### Delete Product (Admin Only)

- **DELETE** `/products/:id`
- **Headers:** Authorization required (Admin)

### Categories

#### Get All Categories

- **GET** `/categories`

#### Get Category by ID

- **GET** `/categories/:id`

#### Create Category (Admin Only)

- **POST** `/categories`
- **Headers:** Authorization required (Admin)
- **Body:**

```json
{
  "title": "Category Name",
  "description": "Category description"
}
```

#### Update Category (Admin Only)

- **PUT** `/categories/:id`
- **Headers:** Authorization required (Admin)

#### Delete Category (Admin Only)

- **DELETE** `/categories/:id`
- **Headers:** Authorization required (Admin)

### Cart

#### Get User Cart

- **GET** `/cart`
- **Headers:** Authorization required

#### Add to Cart

- **POST** `/cart/add`
- **Headers:** Authorization required
- **Body:**

```json
{
  "productId": "product_id",
  "quantity": 2
}
```

#### Update Cart Item

- **PUT** `/cart/update`
- **Headers:** Authorization required
- **Body:**

```json
{
  "productId": "product_id",
  "quantity": 3
}
```

#### Remove from Cart

- **DELETE** `/cart/remove`
- **Headers:** Authorization required
- **Body:**

```json
{
  "productId": "product_id"
}
```

#### Clear Cart

- **DELETE** `/cart/clear`
- **Headers:** Authorization required

### Orders

#### Create Order

- **POST** `/orders`
- **Headers:** Authorization required
- **Body:**

```json
{
  "products": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ]
}
```

#### Get User Orders

- **GET** `/orders/user`
- **Headers:** Authorization required

#### Get All Orders (Admin Only)

- **GET** `/orders`
- **Headers:** Authorization required (Admin)

#### Update Order Status (Admin Only)

- **PUT** `/orders/:id/status`
- **Headers:** Authorization required (Admin)
- **Body:**

```json
{
  "status": "done" // or "pending"
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
EMAIL=your_email@gmail.com
PASSWORD=your_app_password_here
NODE_ENV=development
```

## Running the Server

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Start the production server:

```bash
npm start
```

## Database Models

### User

- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- `role` (String, enum: ["user", "admin"], default: "user")
- `resetPasswordToken` (String)
- `resetPasswordExpire` (Date)

### Product

- `title` (String, required)
- `description` (String, required)
- `price` (Number, required)
- `category` (ObjectId, ref: "Category", required)
- `stock` (Number, required)
- `image` (String, required)

### Category

- `title` (String, required, unique)
- `description` (String, optional)

### Order

- `user` (ObjectId, ref: "User", required)
- `products` (Array of objects with product and quantity)
- `totalAmount` (Number, required)
- `status` (String, enum: ["pending", "done"], default: "pending")

### Cart

- `user` (ObjectId, ref: "User", required)
- `items` (Array of objects with product and quantity)
