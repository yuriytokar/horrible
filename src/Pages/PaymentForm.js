import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../styles/PaymentForm.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const { state: routerState } = useLocation();
  const userData = routerState ? routerState.user : null;

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  useEffect(() => {
    // Отримання даних користувача з файлу db.json
    // Додайте власну логіку для отримання даних платежу тут
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Перевірка, чи є авторизований користувач
    if (!userData) {
      console.error('User is not authenticated.');
      return;
    }

    // Оновлення даних користувача в db.json
    const updatedUserData = {
      ...userData,
      card: {
        name: state.name,
        number: state.number,
        expiry: state.expiry,
        cvc: state.cvc,
      },
    };

    try {
      // Оновлення даних користувача на сервері
      await axios.put(`http://localhost:8000/users/${userData.id}`, updatedUserData);
      console.log('User data updated successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="payment-form-container">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="number"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div className="user-info">
          {userData && (
            <>
              <p>Cardholder: {userData.card.name}</p>
              <p>Card Number: {userData.card.number}</p>
              <p>Expiry: {userData.card.expiry}</p>
              <p>CVC: {userData.card.cvc}</p>
            </>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;
