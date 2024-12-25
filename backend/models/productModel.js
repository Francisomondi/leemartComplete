const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
      productName: String,
      brandName: String,
      category: String,
      productImage: [],
      description: String,
      price: Number,
      sellingPrice: Number
},
{
    timestamps: true
})
const productModel = mongoose.model('product', ProductSchema)
module.exports = productModel