const express =require('express')
const router=express.Router()
const product=require('../controllers/products')

router.post('/',product.addProduct)
router.get('/',product.getProducts)
router.get('/:id',product.getSingleProduct)
router.get('/visited-products',product.vistedProduct);


module.exports=router