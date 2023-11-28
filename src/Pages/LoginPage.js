import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
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
  const [translations, setTranslations] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const navigate = useNavigate();

  let actions = valid;
  if(actions === 'wqrwqrqwr'){
    console.log('hehe, it happaned')

  }

  const saveLanguageToStorage = (language) => {
    localStorage.setItem('selectedLanguage', language);
  };

  const getLanguageFromStorage = () => {
    return localStorage.getItem('selectedLanguage') || 'en';
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    saveLanguageToStorage(language);
  };

  const setInitialLanguage = () => {
    const storedLanguage = getLanguageFromStorage();
    setSelectedLanguage(storedLanguage);
  };

  useEffect(() => {
    setInitialLanguage();
    
    axios.get('http://localhost:8000/db')
      .then(result => {
        setTranslations(result.data.translations);
      })
      .catch(err => console.log(err)); // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    let isvalid = true;

    if (formData.phone === '' || formData.phone === null) {
      isvalid = false;
      validationErrors.phone = translations[selectedLanguage]?.invalidPhone || 'Enter your phone number';
    } else if (formData.phone.length <= 9) {
      isvalid = false;
      validationErrors.phone = translations[selectedLanguage]?.invalidPhone || 'Invalid phone number';
    }

    if (formData.password === '' || formData.password === null) {
      isvalid = false;
      validationErrors.password = translations[selectedLanguage]?.invalidCredentials || 'Enter your password';
    } else if (formData.phone.length > 9 && formData.password.length > 0) {
      validationErrors.password = translations[selectedLanguage]?.invalidCredentials || "Invalid credentials";
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
              validationErrors.password = translations[selectedLanguage]?.incorrectPassword || 'Incorrect password';
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
          {translations[selectedLanguage]?.phonePlaceholder}
          <input type="tel" onChange={(event) => setFormData({ ...formData, phone: event.target.value })} />
        </label>
        <br />
        <label className="form__password">
          {translations[selectedLanguage]?.passwordPlaceholder}
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
          />
          <span className="form__eye" onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </label>
        <br />
        <button type="submit" className="login-button">
          {translations[selectedLanguage]?.loginButton}
        </button>
      </form>
      <p className="register-note">
        {translations[selectedLanguage]?.notRegistered}{' '}
        <Link to="/Register">{translations[selectedLanguage]?.registerNow}</Link>
      </p>
      <br />
      <span className="text-danger">
        {errors.phone && `${errors.phone}! `} {errors.password && `${errors.password}! `}
      </span>
    </div>
  );
};

export default LoginPage;
