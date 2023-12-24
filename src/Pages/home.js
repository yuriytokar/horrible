import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserData(foundUser);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="home-page-container">
      <h2>Welcome to Your Dashboard</h2>
      {userData && (
        <div className="card-container">
          <Cards
            number={userData.card?.number || '#### #### #### ####'}
            name={`Balance: ${userData.balance || '0.00'}`} // Відображення балансу замість імені власника
            expiry={userData.card?.expiry || '##/##'}
            cvc={userData.card?.cvc || '###'}
            focused={null}
          />
          <div className="user-info">
            <p>Cardholder: {userData.card?.name || 'No Name Provided'}</p>
            <p>Card Number: {userData.card?.number}</p>
            <p>Expiry: {userData.card?.expiry}</p>
            <p>CVC: {userData.card?.cvc}</p>
            <p>Balance: {userData.balance || '0.00'}</p> {/* Відображення балансу */}
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
