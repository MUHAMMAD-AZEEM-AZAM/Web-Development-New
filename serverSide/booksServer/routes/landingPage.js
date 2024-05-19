const express = require('express')
const Story = require('../models/stories')
// const adminstoriesView = require('../controllers/admin')

const router = express.Router()

// router.get('/', async (req, res) => {
//     res.render('landingPage/landingPage');
//   })

router.get('/', async (req, res) => {
    const stories=await Story.find().sort({createdAt:-1}).limit(4)
    res.render('landingPage/landingPage',{stories:stories});
  })

module.exports = router