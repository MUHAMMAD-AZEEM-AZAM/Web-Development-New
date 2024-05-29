const Story = require('../models/stories')

const storiesView = async (req, res) => {
    const stories = await Story.find()
    res.render('../views/storiesPage.ejs', { stories })
}

const storiesDetailView = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).send('Story not found');
        }
        res.render('storiesDetailPage', { story });
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addContinueReading = async (req, res) => {
    console.log("add continue")
    let reading = req.cookies.reading;
    if (!reading) reading = [];
    reading.push(req.params.id);
    res.cookie("reading", reading);
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).send('Story not found');
        }
        res.render('storiesDetailPage', { story });
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).send('Internal Server Error');
    }
}


const addToFavourite = async (req, res) => {
    let id = req.params.id
    let favourite = req.cookies.favourite;
    if (!favourite) favourite = [];
    if (favourite.includes(id)) return res.redirect(`/stories/detail/${id}`);
    favourite.push(id);
    res.cookie('favourite', favourite)

    return res.redirect(`/stories/detail/${id}`)
}


module.exports = { storiesView, storiesDetailView, addContinueReading, addToFavourite }   