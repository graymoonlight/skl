import api from '../axios/axios';

export const login = async credentials => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Ошибка входа');
  }
};

export const register = async userData => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Ошибка регистрации');
  }
};