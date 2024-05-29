require('dotenv').config()
const Story=require('../models/stories')
const cloudinary = require('cloudinary').v2;



// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });


const getStories=async (req, res) => {
    try {
      const stories = await Story.find();
      res.json(stories);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

const createStory=  async (req, res) => {
    const { title, story, genres, level, color } = req.body;
    const imageFile = req.file;
  
    try {
      if (imageFile) {
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: 'stories' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(imageFile.buffer);
        });
  
        const newstory = new Story({
          title,
          story,
          image: uploadResult.secure_url,
          genres: Array.isArray(genres) ? genres : genres.split(','),
          level,
          color
        });
  
        const savedStory = await newstory.save();
        res.status(201).json({ message: 'Successfully created storie', savedStory });
      } else {
        res.status(400).json({ message: 'Image file is required' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error' + error);
    }
  }


const updateStory= async (req, res) => {
    const id = req.params.id;
    const { title, story, genres, level, color } = req.body;
    const imageFile = req.file;
    const updateData = { title, story, genres: Array.isArray(genres) ? genres : genres.split(','), level, color };
  
    try {
      if (imageFile) {
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: 'stories' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(imageFile.buffer);
        });
  
        updateData.image = uploadResult.secure_url;
      }
  
      const updatedStory = await Story.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedStory) {
        return res.status(404).json({ message: 'storie not found' });
      }
  
      res.json({ message: 'storie updated successfully', updatedStory });
    } catch (error) {
      console.error('Error updating storie:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  const deleteStory = async (req, res) => {
    const id = req.params.id;
    try {
      // Find the story by ID in MongoDB
      const deletedStory = await Story.findByIdAndDelete(id);
      if (!deletedStory) {
        return res.status(404).json({ message: 'Story not found' });
      }
  
      // Delete the image from Cloudinary
      const imageURL = deletedStory.image; // Assuming the image URL is stored in the 'image' field
      if (imageURL) {
        publicID=publicIdFromUrl(imageURL)
        console.log(publicID);
  
        // Delete the image from Cloudinary using the public ID
        const resp = await cloudinary.uploader.destroy(publicID);
        console.log(resp);
      }
  
      res.json({ message: 'Story and associated image deleted successfully' });
    } catch (error) {
      console.error('Error deleting story:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  function publicIdFromUrl(imageURL){
    const urlParts = imageURL.split('/');
    const fileNameWithExtension = urlParts.pop();
    const folderName = urlParts.pop();
    return `${folderName}/${fileNameWithExtension.split('.')[0]}`;
    
  }


module.exports={getStories,updateStory,deleteStory,createStory}