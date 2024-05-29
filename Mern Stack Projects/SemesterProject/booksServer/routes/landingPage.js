const express = require('express')
const Story = require('../models/stories')
const Yvideo = require('../models/youtubeVideos')
const sendMessage = require('../controllers/contactUsEmail') 

// const adminstoriesView = require('../controllers/admin')

const router = express.Router()

// router.get('/', async (req, res) => {
//     res.render('landingPage/landingPage');
//   })

router.get('/', async (req, res) => {
    const stories=await Story.find().sort({createdAt:-1}).limit(4)
    const videos = await Yvideo.find();
    res.render('landingPage/landingPage',{stories:stories,videos:videos});
  })

  router.post('/send-message',async(req,res)=>{
    const {email,name,message}=req.body

    const detail={
      email,name,message
    }
    try {
    await  sendMessage(detail)
    res.redirect('/')
    } catch (error) {
      res.status(500).send("Error sending message")
    }
  })


router.post('/video',async(req,res)=>{
    const { title, category,video_id } = req.body;
    try {
    const newVideo = new Yvideo({
        title,
        video_id,
        category
      });

      const savedVideo = await newVideo.save();
      res.status(201).json({ message: 'Successfully created Video', savedVideo });
    } catch (error) {
        console.error(error);
      res.status(500).json('Internal Server Error' + error);
    }
   
})


module.exports = router