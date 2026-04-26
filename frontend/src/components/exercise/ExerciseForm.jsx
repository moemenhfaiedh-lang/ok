import React, { useState } from 'react';
import exerciseService from '../../services/exercise.service';
import Button from '../common/Button';

const ExerciseForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', duration: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const newExercise = await exerciseService.addExercise(formData);
      onAdd(newExercise);
      setFormData({ name: '', duration: '' }); 
    } catch (err) {
      console.error("Failed to add exercise", err);
    }
  };

  return (
    <form className="exercise-form" onSubmit={onSubmit} style={formStyle}>
      <input 
        type="text" 
        placeholder="Exercise Name (e.g., Pushups)" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required 
      />
      <input 
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
  gap: '10px',
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  marginBottom: '20px'
};

export default ExerciseForm;