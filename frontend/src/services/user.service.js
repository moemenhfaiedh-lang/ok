import axios from 'axios';

const API_URL = '/api/user';

const getAuthHeaders = () => ({
  headers: {
    'x-auth-token': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
});

const userService = {
  // Method to change password
  changePassword: async (passwordData) => {
    try {
      const response = await axios.put(
        `${API_URL}/change-password`, 
        passwordData, 
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error.response?.data || error.message);
      throw error;
    }
  },

  // You can also add your 'Delete Account' call here later
  deleteAccount: async () => {
    try {
      const response = await axios.delete(`${API_URL}/me`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error deleting account:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default userService;