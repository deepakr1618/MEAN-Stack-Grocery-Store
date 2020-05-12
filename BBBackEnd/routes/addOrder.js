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


router.post("/makeOrder",(req,res)=>{
  const {buyer, total, cart,address} = req.body
  console.log("Making order for : ")
  console.log(cart)
  const resSave = saveOrder({buyer, total, cart,address})
  .then((data)=>{
    const orderId = data._id
    userModel.findOneAndUpdate({
          _id: buyer
        }, {
        $push: { 
            orders: {orderId}
        } 
    },{new: true})
    .exec()
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
  .catch((err)=>{
    res.status(500).json({
      "status":"failure",
      "data":err
    })
  })
})

module.exports = {
  addOrderRouter: router
}