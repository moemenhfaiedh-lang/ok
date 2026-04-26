const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('exercise', ExerciseSchema);