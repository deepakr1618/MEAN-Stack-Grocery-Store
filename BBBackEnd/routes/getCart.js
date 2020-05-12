const express = require('express')
const mongoose = require('mongoose')
const {productModel} = require('../models/product.model')
const {userModel} = require('../models/user.model')
const {orderModel} = require('../models/order.model')
const router = express.Router()


function getItemDetailsFromCart(id , origin="CART"){
  //Origin can be CART for cart or ORDER for Cart Array from an order 
  // if CART, the id should be the User ID
  // if ORDER, the id should be the Order ID
  if(origin=="CART"){
    return userModel
    .aggregate([
      { "$match" : {_id:mongoose.Types.ObjectId(id)} },
      { "$lookup" : {
          from: "products",
          localField: "cart.productId",
          foreignField: "_id",
          as: "productInfo"
        }
      }
    ])
  }
  else{
    console.log("Executing order")
    return orderModel
    .aggregate([
      { "$match" : {_id:mongoose.Types.ObjectId(id)} },
      { "$lookup" : {
          from: "products",
          localField: "cart.productId",
          foreignField: "_id",
          as: "productInfo"
        }
      }
    ])
  }
}

router.get("/:mUserId",(req,res)=>{
  const {mUserId} = req.params
  getItemDetailsFromCart(mUserId)
  .exec()
  .then((data)=>{
    res.status(201)
    .json({
      "status":"success",
      "data":data
    })
  })
  .catch((err)=>{
    res.status(500)
    .json({
      "status":"failure",
      "data":err
    })
  })
})







module.exports = {
  getCartRouter: router,
  getProductDetails:getItemDetailsFromCart
}