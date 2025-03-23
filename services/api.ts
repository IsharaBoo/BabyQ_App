import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api/milestones'; // Change to your backend URL

export const completeMilestone = async (age: string, category: string, item: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/complete`, { age, category, item });
    return response.data;
  } catch (error) {
    console.error('Error marking milestone as completed:', error);
    return { success: false };
  }
};