const express =require('express')
const {storiesView,storiesDetailView} = require('../controllers/stories')
const router=express.Router()

router.get('/',storiesView)
router.get('/detail/:id',storiesDetailView)

module.exports=router