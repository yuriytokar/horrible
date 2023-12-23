import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import axios from 'axios';
import '../styles/PaymentForm.css'
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');

    if (!loggedInUser) {
      navigate('/');
    } else {
      const foundUser = JSON.parse(loggedInUser);
      setState({
        number: foundUser.card?.number || '',
        expiry: foundUser.card?.expiry || '',
        cvc: foundUser.card?.cvc || '',
        name: foundUser.card?.name || '',
      });
    }
  }, [navigate]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const validateForm = () => {
    const errors = {};

    if (state.number.length !== 16) {
      errors.number = 'Номер картки повинен містити 16 цифр';
    }

    if (state.cvc.length !== 3) {
      errors.cvc = 'CVC повинен містити 3 символи';
    }

    

    return errors;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      alert('Будь ласка, виправте наступні помилки:\n' + Object.values(validationErrors).join('\n'));
      return;
    }

    const updatedUserData = {
      ...JSON.parse(localStorage.getItem('user')),
      card: {
        name: state.name,
        number: state.number,
        expiry: state.expiry,
        cvc: state.cvc,
      },
    };

    try {
      if (updatedUserData.id) {
        await axios.put(`http://localhost:8000/users/${updatedUserData.id}`, updatedUserData);
      }
      console.log('Дані користувача оновлені успішно.');

      // Оновлення localStorage з даними користувача
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      localStorage.removeItem('isRegistered'); // Видалення прапорця реєстрації
      navigate('/home');
    } catch (error) {
      console.error('Помилка при оновленні даних користувача:', error);
    }
  };

  return (
    <div className="payment-form-container">
      <Cards
        number={state.number}
        name={state.name}
        expiry={state.expiry}
        cvc={state.cvc}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="number"
          placeholder="Номер картки"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength="16"
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY Термін дії"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength="5"
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength="3"
        />
        <input
          type="text"
          name="name"
          placeholder="Ім'я власника карти"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <button type="submit">Відправити</button>
      </form>
    </div>
  );
};

export default PaymentForm;
