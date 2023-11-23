import React, { useState } from 'react';
import '../styles/form.css';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Додана стейт-змінна для відстеження обраної мови
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (formData.phone === '' || formData.phone === null) {
      validationErrors.phone = selectedLanguage === 'en' ? 'Enter your phone number' : 'Введіть номер телефону';
    } else if (formData.phone.length <= 9) {
      validationErrors.phone = selectedLanguage === 'en' ? 'Invalid phone number' : 'Неіснуючий номер телефону';
    }

    if (formData.password === '' || formData.password === null) {
      validationErrors.password = selectedLanguage === 'en' ? 'Enter your password' : 'Введіть пароль';
    } else if (formData.password.length < 6) {
      validationErrors.password = selectedLanguage === 'en' ? 'Password is too short' : 'Занадто короткий пароль';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8000/users', formData)
        .then(result => {
          console.log(result);
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="register-container">
      <div className="language-selector">
        <label htmlFor="language">Select language:</label>
        <select id="language" onChange={handleLanguageChange} value={selectedLanguage}>
          <option value="en">English</option>
          <option value="uk">Українська</option>
        </select>
      </div>

      <h2 className="headline">
        {selectedLanguage === 'en' ? 'T&S Banking - Registration' : 'T&S Банкінг - Реєстрація'}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          {selectedLanguage === 'en' ? 'Phone Number:' : 'Номер телефону:'}
          <input
            placeholder={selectedLanguage === 'en' ? 'Enter your phone number' : 'Введіть свій номер телефону'}
            type="text"
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
          />
        </label>
        <br />
        <label className="form__password">
          {selectedLanguage === 'en' ? 'Password:' : 'Пароль:'}
          <input
            placeholder={selectedLanguage === 'en' ? 'Choose a strong password' : 'Вигадайте надійний пароль'}
            type={isPasswordVisible ? 'text' : 'password'}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
          <span className="form__eye" onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </label>
        <br />
        <button type="submit" className="register-button">
          {selectedLanguage === 'en' ? 'Register' : 'Зареєструватися'}
        </button>
      </form>
      <p className="login-note">
        {selectedLanguage === 'en' ? 'Already have an account?' : 'Вже маєте акаунт?'}{' '}
        <Link to="/">{selectedLanguage === 'en' ? 'Log In' : 'Увійдіть'}</Link>
      </p>
      <span className="text-danger">
        {errors.phone && `${errors.phone}! `} {errors.password && `${errors.password}! `}
      </span>
    </div>
  );
};

export default RegisterPage;
