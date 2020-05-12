const express = require('express')
const router = express.Router()
const {userModel} = require("../models/user.model")
const mongoose = require('mongoose')


function deleteFromCart(mUserId,cartId){
  return userModel.findOneAndUpdate({
    _id:mUserId,
    "cart._id": cartId
  },{
    "$pull":{
      "cart": {_id:cartId}
    }
  },
  {new: true})
}


router.post("/editCart",(req,res)=>{
  console.log("Edting  cart")
  const {mUserId , payload} = req.body
  const {cartId, quantity} = payload
  if(quantity === 0){
    deleteFromCart(mUserId,cartId)
    .exec()
    .then((data)=>{
      res.status(201).json({
        "status":"success",
        "data": data
      })
    })
    .catch((err)=>{
      res.status(500).json({
        "status":"failure",
        "data": err
      })
    })
  }else{
    userModel.findOneAndUpdate({
    _id:mUserId,
    "cart._id": cartId
    },{
      "$set":{
        "cart.$.quantity": quantity
      }
    },
    {new: true})
    .exec()
    .then((data)=>{
      res.status(201).json({
        "status":"success",
        "data": data
      })
    })
    .catch((err)=>{
      res.status(500).json({
        "status":"failure",
        "data": err
      })
    })
  }
})

module.exports = {
  patchCartRouter : router
}