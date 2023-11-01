import React, { useState } from 'react';
import '../styles/form.css';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (formData.phone === '' || formData.phone === null) {
      validationErrors.phone = 'Введіть номер телефону';
    } else if (formData.phone.length <= 9) {
      validationErrors.phone = 'Неіснуючий номер телефону';
    }
    if (formData.password === '' || formData.password === null) {
      validationErrors.password = 'Введіть пароль';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Занадто короткий пароль';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8000/users', formData)
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
  };

  return (
    <div className="register-container">
      <h2 className="headline">T&S Banking - Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Номер телефону:
          <input
            placeholder="Введіть свій номер телефону"
            type="text"
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
          />
        </label>
        <br />
        <label className="form__password">
          Пароль:
          <input
            placeholder="Вигадайте надійний пароль"
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
          Зареєструватися
        </button>
      </form>
      <p className="login-note">
        Вже маєте акаунт? <Link to="/">Увійдіть</Link>
      </p>
      <span className="text-danger">
        {errors.phone && `${errors.phone}; `} {errors.password && errors.password}
      </span>
    </div>
  );
};

export default RegisterPage;
