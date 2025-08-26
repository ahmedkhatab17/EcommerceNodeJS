# E-commerce Backend API 🛍️

Hey there! 👋 I'm Ahmed, and this is my e-commerce backend API that I built from scratch. It's been quite a journey learning Node.js, Express, and MongoDB while building this project!

## What I Built 🚀

This is a complete RESTful API for an e-commerce platform that handles everything from user authentication to order management. I wanted to create something that could actually power a real online store, so I focused on making it robust, secure, and user-friendly.

### Why I Built This 💭

I started this project to learn full-stack development and understand how real e-commerce platforms work. It's been an amazing learning experience - from setting up authentication to handling email notifications, every feature taught me something new about web development.

## Features I Implemented ✨

- 🔐 **Authentication & Authorization**

  - User registration and login (with proper password hashing!)
  - JWT-based authentication that actually works
  - Role-based access control (so admins can manage everything)
  - Password reset functionality with email integration (this was tricky!)
  - Change password for authenticated users
  - Delete account functionality (with proper cleanup)

- 🛍️ **Product Management**

  - Full CRUD operations for products
  - Category management system
  - Smart product search and filtering
  - Stock management (so we don't oversell!)
  - Admin-only product editing (because only admins should edit products)

- 🛒 **Shopping Cart**

  - Add/remove products from cart (the core shopping experience)
  - Update quantities with real-time validation
  - Cart persistence (so users don't lose their cart)
  - Stock validation (no more overselling!)

- 📦 **Order Management**

  - Create orders from cart (the checkout process)
  - Order status tracking (pending → done)
  - Order history for users (so they can see their purchases)
  - Admin order management with status updates

- 🔍 **Advanced Features**
  - Product search and filtering (find what you need quickly)
  - Price range filtering (budget-friendly shopping)
  - Category-based filtering (browse by category)
  - Sorting options (price, date, etc.)

## Tech Stack I Used 🛠️

- **Runtime:** Node.js (my first time using it!)
- **Framework:** Express.js (made routing so much easier)
- **Database:** MongoDB with Mongoose ODM (NoSQL was new to me)
- **Authentication:** JWT (JSON Web Tokens) - learned a lot about security
- **Password Hashing:** bcryptjs (security first!)
- **Email Service:** Nodemailer (sending emails was fun to implement)
- **CORS:** Cross-Origin Resource Sharing enabled (for frontend integration)

## What You Need to Run This 📋

- Node.js (v14 or higher)
- MongoDB (local or cloud instance - I used MongoDB Atlas)
- npm or yarn package manager
- Gmail account for email functionality (for password reset)

## How to Get Started 🚀

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd EcommerceNodeJS
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your environment**
   Create a `config.env` file in the root directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   EMAIL=your_email@gmail.com
   PASSWORD=your_gmail_app_password
   FRONTEND_URL=http://localhost:4200
   NODE_ENV=development
   ```

4. **Start the server**

   ```bash
   # Development mode (with auto-reload - super helpful!)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints I Created 🔗

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:token` - Reset password
- `PUT /api/auth/changepassword` - Change password (authenticated user)
- `DELETE /api/auth/deleteaccount` - Delete user account (authenticated user)

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

## Database Models I Designed 🗄️

### User

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["user", "admin"], default: "user"),
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
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
  description: String (optional),
  createdAt: Date,
  updatedAt: Date
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
  status: String (enum: ["pending", "done"], default: "pending"),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart

```javascript
{
  user: ObjectId (ref: "User", required),
  items: [{
    product: ObjectId (ref: "Product", required),
    quantity: Number (required, default: 1)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Testing What I Built 🧪

Run the API tests to verify all endpoints are working:

```bash
npm test
```

This will test all major endpoints including:

- User registration and authentication
- Product and category management
- Cart operations
- Order creation and management

## Error Handling (I Made Sure Everything Works!) 🛡️

The API includes comprehensive error handling:

- Input validation and sanitization
- Authentication and authorization errors
- Database connection errors
- Email service errors
- Custom error messages with proper HTTP status codes

## Security Features I Implemented 🔒

- Password hashing with bcryptjs (salt rounds: 10)
- JWT token authentication with expiration
- Role-based access control (User/Admin)
- Email-based password reset with secure tokens
- User enumeration protection
- Environment variable validation

## Email Setup (This Was Fun to Figure Out!) 📧

To enable password reset functionality:

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate an App Password** for "Mail"
3. **Use the App Password** in the PASSWORD environment variable

## What I Learned Building This 📚

This project taught me so much about:

- Building RESTful APIs with Express
- Working with MongoDB and Mongoose
- Implementing authentication and authorization
- Handling email services
- Error handling and validation
- Security best practices
- API documentation

## Recent Updates I Made 🆕

### v2.0.0 - Enhanced Authentication & Admin Features

- ✨ Added password reset functionality with email integration
- ✨ Implemented change password endpoint for authenticated users
- ✨ Added delete account functionality with proper cleanup
- ✨ Enhanced admin order management with status updates
- ✨ Improved error handling and user feedback
- ✨ Added email service integration with Nodemailer
- 🔒 Enhanced security with user enumeration protection
- 🛠️ Improved API response consistency

### Environment Variables You'll Need

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
EMAIL=your_email@gmail.com
PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:4200
NODE_ENV=development
```

## Want to Contribute? 🤝

I'd love to see what you can add to this project! Here's how:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Need Help? 📞

If you run into any issues or have questions about how I built something:

- Open an issue in the repository
- Or reach out to me directly: **ahmedkhatab175@gmail.com**

I'm always happy to help and explain how things work!

## License 📄

This project is licensed under the ISC License.

---

**Note:** Make sure to update the environment variables with your actual values before running the application.

---

**Built with ❤️, lots of coffee ☕, and determination by Ahmed using Node.js, Express, and MongoDB**

_This project represents my journey into full-stack development. Every line of code taught me something new, and I'm excited to share it with the community! 🚀_
