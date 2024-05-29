const express = require('express')
const adminstoriesView = require('../controllers/admin')

const router = express.Router()

router.get('/',(req,res)=>{
    res.render('../views/AdminPanel')
})

router.get('/stories', adminstoriesView)

module.exports = router