import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    let isvalid = true;

    if (formData.phone === '' || formData.phone === null) {
      isvalid = false;
      validationErrors.phone = 'Введіть номер телефону';
    } else if (formData.phone.length <= 9) {
      isvalid = false;
      validationErrors.phone = 'Неіснуючий номер телефону';
    }
    if (formData.password === '' || formData.password === null) {
      isvalid = false;
      validationErrors.password = 'Введіть пароль';
    } else if (formData.phone.length > 9 && formData.password.length > 0){
      validationErrors.password = "Введено хибні дані";
    }

    

  axios.get('http://localhost:8000/users')
  .then(result => {
    result.data.map(user => {
      if (user.phone === formData.phone) {
        if (user.password === formData.password) {
          navigate('/home')
        } else {
          isvalid = false;
          validationErrors.password = 'Невірний пароль';          
        }
      }
    })
    setErrors(validationErrors)
    setValid(isvalid)
  })
  .catch(err => console.log(err));
  };

  return (
    <div className="login-container">
      <h2>T&S</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Номер телефону:
          <input type="tel" onChange={(event) => setFormData({ ...formData, phone: event.target.value }) }/>
           
        </label>
        <br />
        <label className="form__password">
          Пароль:
          <input
            type={isPasswordVisible ? "text" : "password"}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
          <span className='form__eye' onClick={() => setIsPasswordVisible(prev => !prev)}>
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </label>
        <br />
        <button type="submit" className="login-button">
          Увійти
        </button>
      </form>
      <p className="register-note">Ще не зареєстровані? <Link to="/Register">Зареєструйтесь!</Link></p>
      <br/>
      <span className="text-danger">
        {errors.phone && `${errors.phone}! `} {errors.password && `${errors.password}! `}
      </span>
    </div>
  );
};

export default LoginPage;
