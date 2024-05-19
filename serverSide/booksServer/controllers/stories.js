const Story = require('../models/stories')

const storiesView=async (req,res)=>{
    const stories=await Story.find()
    res.render('../views/storiesPage.ejs',{stories})
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
module.exports={storiesView,storiesDetailView}   