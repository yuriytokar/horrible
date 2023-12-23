import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentForm.css';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const isRegistered = localStorage.getItem('isRegistered');
    const paymentCompleted = localStorage.getItem('paymentCompleted');

    if (paymentCompleted) {
      navigate('/home'); 
    } else if (!loggedInUser && !isRegistered) {
      navigate('/'); 
    } else if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserData(foundUser);
      setState({
        number: foundUser.card?.number || '',
        expiry: foundUser.card?.expiry || '',
        cvc: foundUser.card?.cvc || '',
        name: foundUser.card?.name || '',
      });
    } else {
      setUserData({ card: {} });
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
      ...userData,
      card: {
        name: state.name,
        number: state.number,
        expiry: state.expiry,
        cvc: state.cvc,
      },
    };

    try {
      if (userData.id) {
        await axios.put(`http://localhost:8000/users/${userData.id}`, updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        localStorage.setItem('paymentCompleted', 'true'); 
        localStorage.removeItem('isRegistered');
        navigate('/home'); 
      }
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
          required
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <input
          type="number"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;