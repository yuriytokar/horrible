import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log('Attempting login with phone number:', phoneNumber, 'and password:', password);
  };

  return (
    <div className="login-container">
      <h2>T&S</h2>
      <form>
        <label>
          Номер телефону:
          <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </label>
        <br />
        <label className="form__password">
          Пароль:
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <span className='form__eye' onClick={() => setIsPasswordVisible(prev => !prev)}>
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </label>
        <br />
        <button type="button" onClick={handleLogin} className="login-button">
          Увійти
        </button>
      </form>
      <p className="register-note">Ще не зареєстровані? <Link to="/Register">Зареєструйтесь!</Link></p>
    </div>
  );
};

export default LoginPage;
