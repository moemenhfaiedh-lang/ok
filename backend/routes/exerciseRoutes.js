const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware we created earlier
const Exercise = require('../models/Exercise');
const mongoose = require('mongoose'); // Import mongoose
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
router.delete('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) return res.status(404).json({ msg: 'Exercise not found' });

    // Check if user owns the exercise
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await exercise.deleteOne();
    res.json({ msg: 'Exercise removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;