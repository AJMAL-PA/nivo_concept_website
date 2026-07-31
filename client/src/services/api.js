import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// export const sendContact = (data) => api.post('/contact', data);
// export const sendConsultation = (data) => api.post('/consultation', data);

// Admin Auth Endpoint
export const verifyAdmin = (username, passcode) => api.post('/admin/verify', {}, { headers: { 'x-admin-username': username, 'x-admin-passcode': passcode } });

// Project Endpoints
export const fetchProjects = () => api.get('/projects');
export const fetchProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data, username, passcode) => api.post('/projects', data, { headers: { 'x-admin-username': username, 'x-admin-passcode': passcode } });
export const updateProject = (id, data, username, passcode) => api.put(`/projects/${id}`, data, { headers: { 'x-admin-username': username, 'x-admin-passcode': passcode } });
export const deleteProject = (id, username, passcode) => api.delete(`/projects/${id}`, { headers: { 'x-admin-username': username, 'x-admin-passcode': passcode } });

// Gallery Endpoints
export const fetchGallery = () => api.get('/gallery');
export const createGalleryItem = (data, username, passcode) => api.post('/gallery', data, { headers: { 'x-admin-username': username, 'x-admin-passcode': passcode } });
export const deleteGalleryItem = (id, username, passcode) => api.delete(`/gallery/${id}`, { headers: { 'x-admin-username': username, 'x-admin-passcode': passcode } });

// File Upload Endpoint
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default api;
