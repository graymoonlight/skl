import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Адрес бэкенда
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Интерцептор для JWT-токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Редирект на логин при истечении токена
    }
    return Promise.reject(error);
  }
);

export default api;