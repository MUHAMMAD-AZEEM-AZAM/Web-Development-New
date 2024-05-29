
const mongoose = require('mongoose')

// Define schema and model for storing data
const youtubeVideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    video_id: { type: String, required: true },
    category:{ type: String, required: true }
  }, { timestamps: true });
  
  module.exports= mongoose.model('Yvideo', youtubeVideoSchema);

 