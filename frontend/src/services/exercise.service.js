import axios from 'axios';

const API_URL = 'http://localhost:5000/api/exercises/';

const getAuthHeaders = () => ({
  headers: {
    'x-auth-token': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
});

const exerciseService = {
  getExercises: async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  },

  
  addExercise: async (exerciseData) => {
    const response = await axios.post(API_URL, exerciseData, getAuthHeaders());
    return response.data;
  },

  
  deleteExercise: async (id) => {
    const response = await axios.delete(`${API_URL}${id}`, getAuthHeaders());
    return response.data;
  },

  
  updateExercise: async (id, updatedData) => {
    const response = await axios.put(`${API_URL}${id}`, updatedData, getAuthHeaders());
    return response.data;
  }
};

export default exerciseService;