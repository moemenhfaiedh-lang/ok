import axios from 'axios';

// Ensure there is no double slash at the end if you append IDs later
const API_URL = '/api/exercises';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
};

const exerciseService = {
  // Fetch all exercises for the logged-in user
  getExercises: async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises:", error.response?.data || error.message);
      throw error;
    }
  },

  // Add a new exercise
  addExercise: async (exerciseData) => {
    try {
      const response = await axios.post(API_URL, exerciseData, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error adding exercise:", error.response?.data || error.message);
      throw error;
    }
  },

  // Delete an exercise by ID
  deleteExercise: async (id) => {
    try {
      // Using backticks to ensure the ID is appended correctly to the URL
      const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error deleting exercise:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update an existing exercise
  updateExercise: async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error updating exercise:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default exerciseService;