import axios from './axios/axios';

export const getBookings = async () => {
  try {
    const response = await axios.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке бронирований:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении бронирования:', error);
    throw error;
  }
};