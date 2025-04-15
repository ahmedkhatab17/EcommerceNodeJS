const Product = require('../models/Product');
const Order = require('../models/Order');

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const {  products } = req.body;
    let totalAmount = 0; // لاحتساب التوتال


    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.title}` });

      }
      totalAmount += product.price * item.quantity; 

    }

  
    const newOrder = new Order({
      
      products,
      totalAmount,
      status: "pending"  
    });

    for (let item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity } // تقليل الكمية من المخزون
      });
    }

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // إذا كانت الحالة هي "done"، نقوم بتحديث المخزون
    if (status === "done") {
      for (let item of order.products) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity } // تقليل الكمية من المخزون
        });
      }
    }

    // تحديث حالة الطلب
    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
