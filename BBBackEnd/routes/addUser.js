const express = require('express')
const {userModel} = require('../models/user.model')
const router = express.Router()


function saveUser({firebaseUID,name,address,email,cart=[]}){
  const user = new userModel({
    firebaseUID,
    name,
    address,
    cart,
    email
  })
  return user.save()
}


router.post("/",(req,res)=>{
  const {name,address, firebaseUID, email} = req.body;
  console.log(email)
  const userRes = saveUser({
    firebaseUID,
    name,
    address,
    email
  })
  userRes
  .then((data)=>{
    res.status(201).json({
      "status":"success",
      "data":data
    })
  })
  .catch((err)=>{
    res.json(500).json({
      "status":"failure",
      "data":err
    })
  })
})

module.exports = {
  addUserRouter:router
};