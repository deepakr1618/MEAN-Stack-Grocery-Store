const express = require('express')
const {userModel} = require('../models/user.model')
const router = express.Router()




router.get("/",(req,res)=>{
  userModel.find()
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


router.get("/firebase/:id",(req,res)=>{
  const firebaseUID = req.params.id
  userModel.findOne({firebaseUID})
  .then((data)=>{
    if(data){
      res.status(201)
      .json({
        "status":"success",
        "data":data
      })
    }
    else{
      res.status(201)
      .json({
        "status":"NEW_USER",
        "data":data
      })
    }
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
  getUserRouter: router
}