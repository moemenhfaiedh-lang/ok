import React, { useState, useEffect } from 'react';
import exerciseService from '../services/exercise.service';

const Workouts = () => {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await exerciseService.getExercises();
      setExercises(data);
    };
    fetchWorkouts();
  }, []);

  // --- DELETE LOGIC ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await exerciseService.deleteExercise(id);
        // Update the local state to remove the item immediately
        setExercises(prev => prev.filter(ex => ex._id !== id));
      } catch (err) {
        console.error("Failed to delete exercise", err);
        alert("Error deleting exercise. Please try again.");
      }
    }
  };

  // --- TRUE CALORIE CALCULATION LOGIC ---
  const calculateTotalCalories = (data) => {
    return data.reduce((total, ex) => {
      const name = ex.name.toLowerCase();
      let metValue = 5.0; 

      if (name.includes('run')) metValue = 9.8;
      if (name.includes('cycl') || name.includes('bike')) metValue = 7.5;
      if (name.includes('hiit') || name.includes('jump')) metValue = 11.0;
      if (name.includes('walk')) metValue = 3.5;
      if (name.includes('yoga') || name.includes('stretch')) metValue = 2.5;
      if (name.includes('swim')) metValue = 8.0;

      const caloriesPerMinute = (metValue * 3.5 * 75) / 200;
      return total + (caloriesPerMinute * ex.duration);
    }, 0);
  };

  const filtered = exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBurned = calculateTotalCalories(exercises).toFixed(0);

  return (
    <div className="d-flex">
      <main className="flex-grow-1 p-4 bg-light min-vh-100">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-dark">Workout History</h2>
            <div className="input-group w-25">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Search..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 bg-primary text-white">
                <small className="opacity-75">Total Sessions</small>
                <h3 className="fw-bold mb-0">{exercises.length}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 bg-dark text-white">
                <small className="opacity-75">Actual Calories Burned</small>
                <h3 className="fw-bold mb-0">{totalBurned} <span className="small fs-6">kcal</span></h3>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Exercise</th>
                  <th>Duration</th>
                  <th>Intensity Est.</th>
                  <th>Date</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ex) => {
                   const name = ex.name.toLowerCase();
                   let intensity = "Moderate";
                   if (name.includes('run') || name.includes('hiit')) intensity = "High";
                   if (name.includes('yoga') || name.includes('walk')) intensity = "Low";

                   return (
                    <tr key={ex._id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className="bg-info-subtle text-info p-2 rounded-3 me-3">
                            <i className="bi bi-lightning-fill"></i>
                          </div>
                          <span className="fw-bold text-capitalize">{ex.name}</span>
                        </div>
                      </td>
                      <td><span className="badge bg-secondary-subtle text-secondary px-3 py-2">{ex.duration} mins</span></td>
                      <td>
                        <span className={`small fw-medium ${intensity === 'High' ? 'text-danger' : intensity === 'Low' ? 'text-success' : 'text-primary'}`}>
                          {intensity}
                        </span>
                      </td>
                      <td className="text-muted small">{new Date(ex.date).toLocaleDateString()}</td>
                      <td className="text-end pe-4">
                        {/* ATTACH HANDLEDELETE HERE */}
                        <button 
                          className="btn btn-sm btn-outline-danger border-0"
                          onClick={() => handleDelete(ex._id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                   );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workouts;