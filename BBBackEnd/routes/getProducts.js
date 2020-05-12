const express = require('express')
const {productModel} = require('../models/product.model')
const router = express.Router()


router.get("/",(req,res)=>{
  productModel.find({})
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

router.get("/:id",(req,res)=>{
  const id = req.params.id
  productModel.findById(id)
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
  getProductsRouter: router
}