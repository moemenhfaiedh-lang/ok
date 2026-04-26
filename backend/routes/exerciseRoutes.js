const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware we created earlier
const { 
    getExercises, 
    createExercise, 
    deleteExercise 
} = require('../controllers/exerciseController');

// @route   GET api/exercises
// @desc    Get all user exercises
// @access  Private
router.get('/', auth, getExercises);

// @route   POST api/exercises
// @desc    Add new exercise
// @access  Private
router.post('/', auth, createExercise);

// @route   DELETE api/exercises/:id
// @desc    Delete an exercise
// @access  Private
router.delete('/:id', auth, deleteExercise);

module.exports = router;