const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {  // ✅ إضافة وصف للفئة
    type: String,
    required: false, // اجعله اختياريًا إذا كنت لا تريد أن يكون إلزاميًا
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
