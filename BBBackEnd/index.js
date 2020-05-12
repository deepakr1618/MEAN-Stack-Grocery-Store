const {productModel} = require('./models/product.model.js')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bp = require('body-parser')

const {addProductRouter} = require('./routes/addProduct')
const {addUserRouter} = require('./routes/addUser')
const {addToCartRouter} = require("./routes/addCart")

const {patchProductRouter} = require('./routes/patchProduct')
const {patchCartRouter} = require("./routes/patchCart")

const {getProductsRouter} = require('./routes/getProducts')
const {getUserRouter} = require('./routes/getUser')
const {getCartRouter} = require("./routes/getCart")

const {addOrderRouter} = require("./routes/addOrder")
const {getOrderRouter} = require("./routes/getOrder")


const {getAllOrders} = require("./routes/getAllOrders")
const {changeOrderStatus} = require("./routes/changeOrderStatus")


console.log("Connecting to : "+`mongodb://database/maindb?retryWrites=true&w=majority`)
mongoose.connect(`mongodb://database/maindb`)
.catch((err)=>{
  console.log(err)
});



app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept,Authorization")
  next()
})
app.use(bp.urlencoded({extended:false}))
app.use(bp.json())



app.use("/api/products",addProductRouter)
app.use("/api/products",getProductsRouter)
app.use("/api/products",patchProductRouter)
app.use("/api/user",addUserRouter)
app.use("/api/user",getUserRouter)
app.use("/api/cart",addToCartRouter)
app.use("/api/cart",getCartRouter)
app.use("/api/cart",patchCartRouter)
app.use("/api/order",addOrderRouter)
app.use("/api/order",getOrderRouter)
app.use("/api/seller",getAllOrders)
app.use("/api/seller",changeOrderStatus)

app.get("/**",(req,res)=>{
  res.json({
    "subject":"Web Development",
    "Project":"Big Basket Clone",
    "Technologies Used": {
      "Docker":true,
      "Angular":true,
      "Express":true,
      "MongoDB":true,
    },
    "Team":[
      "Deepak","Sathwik B"
    ]
  })
})

app.post("/**",(req,res)=>{
  res.json({
    "status":"failure",
    "message":"End point does not exist."
  })
})

app.listen(3000,()=>{
  console.log("REST Running at  3000")
})
