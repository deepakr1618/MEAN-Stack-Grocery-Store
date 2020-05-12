const express = require('express')
const router = express.Router()

const {orderModel} = require('../models/order.model')
const {userModel} = require('../models/user.model')

function saveOrder({buyer,total,cart,address}){
  const order = new orderModel({
    buyer,
    total,
    cart,
    address
  })
  return order.save()
}


router.post("/change",(req,res)=>{
  const {orderId , status} = req.body
  orderModel.findOneAndUpdate(
    {
      _id: orderId
    },
    {
      orderStatus: status
    },
    {new: true}
  )
  .then((data)=>{
    res.status(201).json({
      "status":"success",
      "data":data
    })
  })
  .catch((err)=>{
    res.status(500).json({
      "status":"failure",
      "data":err
    })
  })
})

module.exports = {
  changeOrderStatus: router
}