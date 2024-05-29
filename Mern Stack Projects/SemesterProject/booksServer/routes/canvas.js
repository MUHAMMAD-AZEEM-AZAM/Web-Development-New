require('dotenv').config()
const express =require('express')
const router=express.Router()
const cloudinary=require('cloudinary')

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

router.get('/',(req,res)=>{
res.render('../views/canvasPage.ejs')
})
router.get('/canvasImages', async(req,res)=>{
    var urls=[]
        try {
          const response = await cloudinary.api.resources({
            type: 'upload', // Filter for upload resources (images)
            prefix: 'sketchImages/', // Filter by folder prefix
          });
      
          urls= response.resources.map(resource => resource.secure_url); // Extract secure URLs
        } catch (error) {
          console.error('Error fetching images:', error);
          return []; // Return empty array on error
        }
        res.render('canvasImages',{sketchImageUrls:urls})
})

module.exports=router