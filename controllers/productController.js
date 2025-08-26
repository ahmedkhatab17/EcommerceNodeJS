const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const products = await Product.find(query)
      .populate("category")
      .sort(sortOptions);
      
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, image } = req.body;
    
    // Validate required fields
    if (!title || !description || !price || !category || !stock || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Validate price and stock
    if (price <= 0 || stock < 0) {
      return res.status(400).json({ error: "Price must be greater than 0 and stock must be non-negative" });
    }
    
    const product = new Product({ title, description, price, category, stock, image });
    await product.save();
    
    const populatedProduct = await Product.findById(product._id).populate("category");
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, image } = req.body;
    
    // Validate price and stock if provided
    if (price !== undefined && price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }
    
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ error: "Stock must be non-negative" });
    }
    
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("category");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
