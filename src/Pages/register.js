import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [translations, setTranslations] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('ua');
  const navigate = useNavigate();

  const saveLanguageToStorage = (language) => {
    localStorage.setItem('selectedLanguage', language);
  };

  const getLanguageFromStorage = () => {
    return localStorage.getItem('selectedLanguage') || 'ua';
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
        const translations = result.data.translations;
        setTranslations(translations);
      })
      .catch(err => console.log(err));
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (formData.phone === '' || formData.phone === null) {
      validationErrors.phone = translations[selectedLanguage].phonePlaceholder;
    } else if (formData.phone.length <= 9) {
      validationErrors.phone = translations[selectedLanguage].invalidPhone;
    }

    if (formData.password === '' || formData.password === null) {
      validationErrors.password = translations[selectedLanguage].passwordPlaceholder;
    } else if (formData.password.length < 6) {
      validationErrors.password = translations[selectedLanguage].passwordShort;
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.get(`http://localhost:8000/users?phone=${formData.phone}`)
        .then(result => {
          if (result.data.length === 0) {
            axios.post('http://localhost:8000/users', formData)
              .then(result => {
                localStorage.setItem('isRegistered', 'true');
                navigate('/'); 
              })
              .catch(err => console.log(err));
          } else {
            setErrors({
              ...validationErrors,
              phone: translations[selectedLanguage].phoneAlreadyExists,
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="register-container">
      <div className="language-selector">
        <select id="language" onChange={handleLanguageChange} value={selectedLanguage}>
          <option value="en">EN</option>
          <option value="ua">UA</option>
        </select>
      </div>

      <h2 className="headline">
        {translations[selectedLanguage]?.registerHeadline}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          {translations[selectedLanguage]?.phonePlaceholder}
          <input
            placeholder={translations[selectedLanguage]?.enterPhoneNumber}
            type="text"
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
          />
        </label>
        <br />
        <label className="form__password">
          {translations[selectedLanguage]?.passwordPlaceholder}
          <input
            placeholder={translations[selectedLanguage]?.chooseStrongPassword}
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
          {translations[selectedLanguage]?.registerButton}
        </button>
      </form>
      <p className="login-note">
        {translations[selectedLanguage]?.alreadyHaveAccount}{' '}
        <Link to="/">{translations[selectedLanguage]?.logIn}</Link>
      </p>
      <span className="text-danger">
        {errors.phone && `${errors.phone}! `} {errors.password && `${errors.password}! `}
      </span>
    </div>
  );
};

export default RegisterPage;
