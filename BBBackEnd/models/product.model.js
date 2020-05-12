const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
  name:String,
  price:{type: Number, default:0},
  quantity:{type: Number, default:5},
  description:{type:String , default:"Seller did not provide any description."},
  type:{type:String, required:true},
  seller: {type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
  images:Array
})

module.exports = {
  productModel : mongoose.model('product',productModel)
}