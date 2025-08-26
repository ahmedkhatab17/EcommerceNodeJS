# E-commerce Backend API

A complete RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- 🔐 **Authentication & Authorization**

  - User registration and login
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password reset functionality

- 🛍️ **Product Management**

  - CRUD operations for products
  - Category management
  - Product search and filtering
  - Stock management

- 🛒 **Shopping Cart**

  - Add/remove products from cart
  - Update quantities
  - Cart persistence
  - Stock validation

- 📦 **Order Management**

  - Create orders from cart
  - Order status tracking
  - Order history for users
  - Admin order management

- 🔍 **Advanced Features**
  - Product search and filtering
  - Price range filtering
  - Category-based filtering
  - Sorting options

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Email Service:** Nodemailer
- **CORS:** Cross-Origin Resource Sharing enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EcommerceNodeJS
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   EMAIL=your_email@gmail.com
   PASSWORD=your_app_password_here
   NODE_ENV=development
   ```

4. **Start the server**

   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:token` - Reset password

### Products

- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove product from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders/user` - Get user's orders
- `GET /api/orders/:id` - Get specific order
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Database Models

### User

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["user", "admin"], default: "user"),
  resetPasswordToken: String,
  resetPasswordExpire: Date
}
```

### Product

```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  category: ObjectId (ref: "Category", required),
  stock: Number (required),
  image: String (required)
}
```

### Category

```javascript
{
  title: String (required, unique),
  description: String (optional)
}
```

### Order

```javascript
{
  user: ObjectId (ref: "User", required),
  products: [{
    product: ObjectId (ref: "Product", required),
    quantity: Number (required, default: 1)
  }],
  totalAmount: Number (required),
  status: String (enum: ["pending", "done"], default: "pending")
}
```

### Cart

```javascript
{
  user: ObjectId (ref: "User", required),
  items: [{
    product: ObjectId (ref: "Product", required),
    quantity: Number (required, default: 1)
  }]
}
```

## Testing

Run the API tests to verify all endpoints are working:

```bash
npm test
```

This will test all major endpoints including:

- User registration and authentication
- Product and category management
- Cart operations
- Order creation and management

## Error Handling

The API includes comprehensive error handling:

- Input validation
- Authentication errors
- Authorization errors
- Database errors
- Custom error messages

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.

---

**Note:** Make sure to update the environment variables with your actual values before running the application.
