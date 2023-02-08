const { db } = require("../Models/Product")
const Product =require("../Models/Product")
exports.product=async(req,res)=>{
    const newProduct = new Product({ name:req.body.name, price:req.body.price, description:req.body.description, picture:req.body.picture})
    newProduct.save((error, product) => {
        if (error) {
            res.status(500).res.send(error)
        }
        else {
            res.status(200).json({ messege: "Product added", product,  })
        }
    })
}

exports.productlist = async(req,res)=>{
    Product.find().then((list) => {
       
        if (!list) {
            res.send(error + "  " + "fuck you")
            res.status(400)
        }
        else {
            console.log("this is ",list);
            res.status(200).json({list} )
        }
    })
}

exports.bid=async(req,res)=>{
    Product.findByIdAndUpdate(req.params.id, req.body)
    .then((bid) => {
        if (!bid) {
            res.status(400).send("not foud")
        }
        else {
            res.status(200).json({ messege: 'updated bid' })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err)
    })
}