const express = require('express')
const {productModel} = require('../models/product.model')
const router = express.Router()


router.patch("/",(req,res)=>{
  const {id, payload} = req.body
  const prodRes = productModel.findOneAndUpdate({
    _id:id
  },{
    $set:payload
  },
  {new:true})
  prodRes
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

module.exports = {
  patchProductRouter:router
};