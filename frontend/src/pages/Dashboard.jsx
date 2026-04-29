import React, { useState, useEffect } from 'react';
import exerciseService from '../services/exercise.service';
// Updated import to match your file structure
import ExerciseForm from '../components/exercise/ExerciseForm'; 
import ExerciseList from '../components/exercise/ExerciseList';

const Dashboard = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await exerciseService.getExercises();
      setExercises(data);
    };
    fetchExercises();
  }, []);

  // --- THE TRUE CALORIE ENGINE ---
  const calculateTotalBurn = (allExercises) => {
    return allExercises.reduce((total, ex) => {
      const name = ex.name.toLowerCase();
      let met = 5.0; // Default: Strength/General

      // Intensity Mapping based on name
      if (name.includes('run')) met = 9.8;
      else if (name.includes('bike') || name.includes('cycl')) met = 7.5;
      else if (name.includes('hiit') || name.includes('burpee')) met = 11.0;
      else if (name.includes('walk')) met = 3.5;
      else if (name.includes('yoga') || name.includes('stretch')) met = 2.5;

      // Formula using average 75kg weight
      const caloriesPerMin = (met * 3.5 * 75) / 200;
      return total + (caloriesPerMin * ex.duration);
    }, 0);
  };

  const totalCalories = calculateTotalBurn(exercises).toFixed(0);
  const totalMinutes = exercises.reduce((acc, curr) => acc + curr.duration, 0);

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold text-dark">Welcome Back! ⚡</h2> 
          <p className="text-secondary fw-medium">Here is your progress across all activities.</p>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-primary text-white h-100">
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-white bg-opacity-25 p-3 me-3">
                <i className="bi bi-fire fs-3"></i>
              </div>
              <div>
                <small className="opacity-75 d-block">Total Calories</small>
                <h3 className="fw-bold mb-0">{totalCalories} kcal</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-dark text-white h-100">
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-white bg-opacity-10 p-3 me-3">
                <i className="bi bi-clock-history fs-3"></i>
              </div>
              <div>
                <small className="opacity-75 d-block">Total Time</small>
                <h3 className="fw-bold mb-0">{totalMinutes} mins</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-info-subtle text-info p-3 me-3">
                <i className="bi bi-trophy fs-3"></i>
              </div>
              <div>
                <small className="opacity-75 d-block fw-bold text-dark">Total Sessions</small>
                <h3 className="fw-bold mb-0 text-dark">{exercises.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-4">Add New Workout</h5>
            {/* Swapped to your ExerciseForm component */}
            <ExerciseForm setExercises={setExercises} />
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-4">Recent Exercises</h5>
            <ExerciseList exercises={exercises} setExercises={setExercises} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;