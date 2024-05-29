const express =require('express')
const {storiesView,storiesDetailView,addContinueReading,addToFavourite} = require('../controllers/stories')
const router=express.Router()

router.get('/',storiesView)
router.get('/detail/:id',storiesDetailView)
router.get('/add_continue_reading/:id',addContinueReading)
router.get('/add_to_favourite/:id',addToFavourite)

module.exports=router