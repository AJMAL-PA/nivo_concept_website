import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export const sendContact = (data) => api.post('/contact', data);
export const sendConsultation = (data) => api.post('/consultation', data);

export default api;
