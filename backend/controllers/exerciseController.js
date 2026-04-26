const Exercise = require('../models/Exercise');

// Get all exercises for a user
exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user.id }).sort({ date: -1 });
    res.json(exercises);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create a new exercise
exports.createExercise = async (req, res) => {
  const { name, duration } = req.body;
  try {
    const newExercise = new Exercise({
      user: req.user.id,
      name,
      duration
    });
    const exercise = await newExercise.save();
    res.json(exercise);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete an exercise
exports.deleteExercise = async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Exercise removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};