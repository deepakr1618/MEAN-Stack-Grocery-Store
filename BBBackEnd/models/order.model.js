const mongoose = require('mongoose')

const orderModel = new mongoose.Schema({
  buyer:  { type: mongoose.Schema.Types.ObjectId, ref:"user", required:true },
  total: {type: Number, required:true},
  cart: [
    {
    productId: { type: mongoose.Schema.Types.ObjectId, ref:"product" , required:true},
    quantity: {type:Number, default:1}
  }
  ],
  orderStatus: {type: String, default: "Order Placed"},
  address:{
    houseNo : Number,
    street : String,
    city: String,
    pincode : Number
  }
})

module.exports = {
  orderModel : mongoose.model('order',orderModel)
}