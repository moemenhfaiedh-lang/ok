const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  // Add category to distinguish between high/low intensity
  type: { 
    type: String, 
    enum: ['Cardio', 'Strength', 'Yoga', 'HIIT'], 
    default: 'Strength' 
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('exercise', ExerciseSchema);