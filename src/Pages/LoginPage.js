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
  const [selectedLanguage, setSelectedLanguage] = useState('ua'); // Додана стейт-змінна для відстеження обраної мови
  const navigate = useNavigate();

  let actions = valid;
  if(actions === 'wqrwqrqwr'){
    console.log('hehe, it happaned')

  }

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    let isvalid = true;

    if (formData.phone === '' || formData.phone === null) {
      isvalid = false;
      validationErrors.phone = selectedLanguage === 'en' ? 'Enter your phone number' : 'Введіть номер телефону';
    } else if (formData.phone.length <= 9) {
      isvalid = false;
      validationErrors.phone = selectedLanguage === 'en' ? 'Invalid phone number' : 'Неіснуючий номер телефону';
    }

    if (formData.password === '' || formData.password === null) {
      isvalid = false;
      validationErrors.password = selectedLanguage === 'en' ? 'Enter your password' : 'Введіть пароль';
    } else if (formData.phone.length > 9 && formData.password.length > 0) {
      validationErrors.password = selectedLanguage === 'en' ? "Invalid credentials" : "Введено хибні дані";
    }

    axios.get('http://localhost:8000/users')
      .then(result => {
        result.data.map(user => {
          if (user.phone === formData.phone) {
            if (user.password === formData.password) {
              if (user.blocked) {
                navigate('/BlockedPage');
              } else {
                navigate('/home');
              }
            } else {
              isvalid = false;
              validationErrors.password = selectedLanguage === 'en' ? 'Incorrect password' : 'Невірний пароль';
            }
          }
          return null;
        });
        setErrors(validationErrors);
        setValid(isvalid);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="language-selector">
        <select id="language" onChange={handleLanguageChange} value={selectedLanguage}>
          <option value="en">EN</option>
          <option value="ua">UA</option>
        </select>
      </div>

      <h2>T&S</h2>
      <form onSubmit={handleSubmit}>
        <label>
          {selectedLanguage === 'en' ? 'Phone Number:' : 'Номер телефону:'}
          <input type="tel" onChange={(event) => setFormData({ ...formData, phone: event.target.value })} />
        </label>
        <br />
        <label className="form__password">
          {selectedLanguage === 'en' ? 'Password:' : 'Пароль:'}
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
          {selectedLanguage === 'en' ? 'Log In' : 'Увійти'}
        </button>
      </form>
      <p className="register-note">
        {selectedLanguage === 'en' ? "Not registered?" : "Ще не зареєстровані?"} <Link to="/Register">{selectedLanguage === 'en' ? 'Register now!' : 'Зареєструйтесь!'}</Link>
      </p>
      <br />
      <span className="text-danger">
        {errors.phone && `${errors.phone}! `} {errors.password && `${errors.password}! `}
      </span>
    </div>
  );
};

export default LoginPage;
