const mongoose = require('mongoose')
const Workout = require('../models/workoutModels')

//get all workouts
const getWorkouts = async (req, res) => {
    //the object inside find used to get all object with specific value
    //and the sort method sort the data and -1 in asending order
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}


//get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such workout Or invlaid Id' })
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    //add document in db
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout= async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such workout Or invlaid Id' })
    }
    const workout = await Workout.findOneAndDelete({_id:id})
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}

// update a workout
const updateWorkout= async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such workout Or invlaid Id' })
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}