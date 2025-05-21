import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import styles from '../../styles/pages/auth/Register.module.css'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    login: ''
  });
  
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Неверный формат email';

    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 6) newErrors.password = 'Минимум 6 символов';

    if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
    if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
    
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Телефон обязателен';
    else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Неверный формат телефона';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('/auth/register', formData);
      navigate('/login', { state: { successMessage: 'Регистрация успешна! Войдите в систему' } });
    } catch (error) {
      const message = error.response?.data?.error || 'Ошибка регистрации';
      setServerError(message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.registrationContainer}>
      <h2>Регистрация</h2>
      {serverError && <div className="error-message">{serverError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Логин:</label>
          <input
            type="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className={errors.login ? 'error' : ''}
          />
          {errors.login && <span className="error-text">{errors.login}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Имя:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Фамилия:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Телефон:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+71234567890"
            className={errors.phoneNumber ? 'error' : ''}
          />
          {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
        </div>

        <button type="submit" className="submit-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;