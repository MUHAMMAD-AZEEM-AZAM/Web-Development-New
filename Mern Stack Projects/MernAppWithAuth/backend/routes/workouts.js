const express=require('express')
const {getWorkout,getWorkouts,createWorkout,deleteWorkout,updateWorkout}=require('../controllers/workoutController')

const router =express.Router()

// Get All workout
router.get('/',getWorkouts)

// Get single workout
router.get('/:id',getWorkout)

// Post All workout
router.post('/',createWorkout)

// Delete All workout
router.delete('/:id',deleteWorkout)

// update All workout
router.patch('/:id',updateWorkout)

module.exports=router