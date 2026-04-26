import React, { useState, useEffect } from 'react';
import exerciseService from '../services/exercise.service';
import ExerciseForm from '../components/exercise/ExerciseForm';
import ExerciseList from '../components/exercise/ExerciseList';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await exerciseService.getExercises();
        setExercises(data);
      } catch (err) {
        console.error("Error loading dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const handleAdd = (newEx) => {
    setExercises([newEx, ...exercises]);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      
      <main style={{ flex: 1, padding: '30px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#2d3436' }}>Fitness Dashboard</h1>
          <p style={{ color: '#636e72' }}>Keep track of your daily progress</p>
        </header>

        <ExerciseForm onAdd={handleAdd} />

        {loading ? (
          <Loader />
        ) : (
          <section>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Recent Workouts</h2>
            <ExerciseList exercises={exercises} setExercises={setExercises} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;