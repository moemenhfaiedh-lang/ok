import React, { useState } from 'react';
import exerciseService from '../../services/exercise.service';
import Button from '../common/Button';

// 1. Change prop from { onAdd } to { setExercises } to match Dashboard
const ExerciseForm = ({ setExercises }) => {
  const [formData, setFormData] = useState({ name: '', duration: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExercise = await exerciseService.addExercise(formData);
      
      // 2. Use setExercises to update the global list
      // This forces the Dashboard to recalculate the "True Calories" immediately
      setExercises(prev => [newExercise, ...prev]); 
      
      // Clear form
      setFormData({ name: '', duration: '' }); 
    } catch (err) {
      console.error("Failed to add exercise", err);
    }
  };

  return (
    <form className="exercise-form" onSubmit={onSubmit} style={formStyle}>
      <input 
        className="form-control" // Added Bootstrap class for better styling
        type="text" 
        placeholder="Exercise Name (e.g., Running)" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required 
      />
      <input 
        className="form-control" // Added Bootstrap class for better styling
        type="number" 
        placeholder="Duration (mins)" 
        value={formData.duration}
        onChange={(e) => setFormData({...formData, duration: e.target.value})}
        required 
      />
      <Button type="submit">Add Exercise</Button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column', // Changed to column so it fits nicely in the Dashboard card
  gap: '15px',
  background: 'transparent', // Let the Dashboard card handle the background
  padding: '10px',
  marginBottom: '0px'
};

export default ExerciseForm;