import React from 'react';
import axios from 'axios';
import Button from '../common/Button';

const ExerciseList = ({ exercises, setExercises }) => {
  
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exercises/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setExercises(exercises.filter(ex => ex._id !== id));
    } catch (err) {
      console.error("Delete failed");
    }
  };

  return (
    <div className="exercise-list">
      {exercises.map(ex => (
        <div key={ex._id} className="exercise-card">
          <div>
            <h3>{ex.name}</h3>
            <p>⏱ {ex.duration} minutes</p>
          </div>
          <Button variant="danger" onClick={() => onDelete(ex._id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;