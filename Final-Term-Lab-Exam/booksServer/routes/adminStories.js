const express = require('express')
const multer = require('multer')

const { createStory, updateStory, deleteStory, getStories} = require('../controllers/adminStories')

const router = express.Router()

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getStories)

router.post('/', upload.single('image'), createStory)

router.delete('/:id', deleteStory)

router.put('/:id',upload.single('image'), updateStory)

module.exports = router
