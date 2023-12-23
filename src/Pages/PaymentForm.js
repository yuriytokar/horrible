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

  const handleSubmit = async (evt) => {
    evt.preventDefault();

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
      console.log('User data updated successfully.');

      // Update localStorage with user data
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      localStorage.removeItem('isRegistered'); // Removing registration flag
      navigate('/home');
    } catch (error) {
      console.error('Error updating user data:', error);
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;
