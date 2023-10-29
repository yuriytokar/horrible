import React, { useState } from 'react';
import '../styles/form.css';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const RegisterPage = () => {
  const [phone, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    try {
 

      console.log('Registration successful!', /* response з API */);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="headline">T&S Banking - Реєстрація</h2>
      <form>
        <label>
          Номер телефону:
          <input
            placeholder="Введіть свій номер телефону"
            type="text"
            value={phone}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label className="form__password">
          Пароль:
          <input
            placeholder="Вигадайте надійний пароль"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="form__eye" onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </label>
        <br />
        <button type="button" onClick={handleRegister} className="register-button">
          Зареєструватися
        </button>
      </form>
      <p className="login-note">
        Вже маєте акаунт? <Link to="/">Увійдіть</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
