const express = require('express')
const mongoose = require('mongoose')
const {productModel} = require('../models/product.model')
const {getProductDetails} = require("./getCart")
const {userModel} = require('../models/user.model')
const {orderModel} = require('../models/order.model')
const router = express.Router()



router.get("/:orderId",(req,res)=>{
  const {orderId} = req.params
  getProductDetails(orderId,"ORDER")
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
  getOrderRouter: router
}