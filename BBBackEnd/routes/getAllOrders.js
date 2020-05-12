const express = require('express')
const mongoose = require('mongoose')
const {productModel} = require('../models/product.model')
const {orderModel} = require('../models/order.model')
const router = express.Router()
const {getProductDetails} = require('./getCart')

router.get("/",(req,res)=>{
  console.log("Called")
  orderModel
  .aggregate([
      { "$lookup" : {
          from: "products",
          localField: "cart.productId",
          foreignField: "_id",
          as: "productInfo"
        }
      }
  ])
  .exec()
  .then((data)=>{
    console.log(data)
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
  getAllOrders: router,
}