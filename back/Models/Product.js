const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  picture: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    // required: true,
  },
  highbid:{
    type:String,
    default:"null"
  }


})
module.exports = mongoose.model("ProductList", productSchema)