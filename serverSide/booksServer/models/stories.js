const mongoose = require('mongoose')

// Define schema and model for storing data
const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    story: { type: String, required: true },
    image: { type: String, required: true },
    genres: { type: Array, required: true },
    level: { type: Number, required: true },
    color: { type: String, required: true },
  }, { timestamps: true });
  
  module.exports= mongoose.model('story', storySchema);

 