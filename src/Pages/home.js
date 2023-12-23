import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
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

  const cardholderName = userData && userData.card && userData.card.name ? userData.card.name : 'No Name Provided';

  const handleLogout = () => {
    localStorage.removeItem('user'); // Вилогінювання користувача
    navigate('/'); // Перенаправлення на сторінку входу
  };

  return (
    <div className="home-page-container">
      <h2>Welcome to Your Dashboard</h2>
      {userData && (
        <div className="card-container">
          <Cards
            number={userData.card?.number || '#### #### #### ####'}
            name={cardholderName}
            expiry={userData.card?.expiry || '##/##'}
            cvc={userData.card?.cvc || '###'}
            focused={null}
          />
          <div className="user-info">
            <p>Cardholder: {cardholderName}</p>
            <p>Card Number: {userData.card?.number}</p>
            <p>Expiry: {userData.card?.expiry}</p>
            <p>CVC: {userData.card?.cvc}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
