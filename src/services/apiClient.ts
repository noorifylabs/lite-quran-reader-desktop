import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.quran.com/api/v4',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;