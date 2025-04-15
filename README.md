
# 🛒 Ecommerce Node.js API

A full-featured e-commerce REST API built using **Node.js**, **Express**, and **MongoDB**, supporting user authentication, product management, and order handling with role-based access control.

---

## 📦 Packages Used

| Package         | Purpose                                                  |
|----------------|----------------------------------------------------------|
| **express**     | Web framework to create the server                      |
| **mongoose**    | ODM for interacting with MongoDB                        |
| **dotenv**      | Manage environment variables                            |
| **bcryptjs**    | Hash passwords before storing                           |
| **jsonwebtoken**| Handle JWT-based authentication                         |
| **cors**        | Allow cross-origin API requests                         |
| **multer**      | Handle file uploads (e.g., images)                      |
| **aws-sdk**     | Connect with Amazon S3                                  |
| **multer-s3**   | Upload files directly to S3                             |
| **nodemon**     | Auto-restart server during development                  |

---

## 📁 Project Structure

```
ecommerce/
│
├── config/              # MongoDB configuration
│   └── db.js
│
├── controllers/         # API logic
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── categoryController.js
│   └── cartController.js
│
├── routes/              # Route handlers
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── categoryRoutes.js
│   └── cartRoutes.js
│
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Category.js
│   └── Cart.js
│
├── middleware/          # Middleware (e.g., Auth)
│   └── authMiddleware.js
│
├── .env                 # Environment variables
├── server.js            # Entry point
├── package.json         # NPM dependencies
└── README.md
```

---

## 🧠 User Roles

After logging in, the response includes the user’s role. This allows frontend apps to control access:

- **User**: Can view and order products
- **Admin**: Can manage products, categories, and orders (add/edit/delete)

---

## 🧱 Database Design

This project uses **MongoDB** with four main collections:

### 1️⃣ `users`
Stores user account information.

```json
{
  "username": "ahmed123",
  "email": "ahmed@example.com",
  "password": "hashed_password",
  "role": "user",  // or "admin"
  "createdAt": "2024-02-02T12:00:00Z"
}
```

---

### 2️⃣ `categories`
Stores product categories.

```json
{
  "name": "Electronics",
  "description": "All electronic items",
  "createdAt": "2024-02-02T12:05:00Z"
}
```

---

### 3️⃣ `products`
Stores product details.

```json
{
  "name": "iPhone 15",
  "price": 1200,
  "category": "ObjectId of category",
  "stock": 50,
  "description": "New iPhone with A16 Bionic chip.",
  "images": [
    "https://example.com/iphone1.jpg",
    "https://example.com/iphone2.jpg"
  ],
  "createdAt": "2024-02-02T12:10:00Z"
}
```

---

### 4️⃣ `orders`
Stores order details.

```json
{
  "user": "ObjectId of user",
  "products": [
    {
      "product": "ObjectId of product",
      "quantity": 2
    }
  ],
  "totalPrice": 2400,
  "status": "Pending",  // or "Shipped", "Delivered"
  "createdAt": "2024-02-02T12:20:00Z"
}
```

---

## 🔗 Relationships Between Collections

- Each **Product** belongs to a **Category**
- Each **Order** belongs to a **User**
- Each **Order** contains multiple **Products**

---

## 📥 Sample MongoDB Inserts

```js
db.users.insertOne({
  username: "ahmed123",
  email: "ahmed@example.com",
  password: "$2a$10$encryptedpassword",
  role: "user",
  createdAt: new Date()
});

db.categories.insertOne({
  name: "Electronics",
  createdAt: new Date()
});

db.products.insertOne({
  name: "iPhone 15",
  price: 1200,
  category: ObjectId("..."),
  stock: 50,
  description: "New iPhone with A16 Bionic chip.",
  images: ["https://example.com/iphone1.jpg"],
  createdAt: new Date()
});

db.orders.insertOne({
  user: ObjectId("..."),
  products: [
    { product: ObjectId("..."), quantity: 2 }
  ],
  totalPrice: 2400,
  status: "Pending",
  createdAt: new Date()
});
```

