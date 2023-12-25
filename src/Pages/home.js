import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'

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

  const handleTransfer = () => {
    navigate('/transfer'); 
  };

  const handleViewTransactions = () => {
    navigate('/transactions');
  };


  return (
    <div className="home-page-container">
      <h2>nice day to make it rain, huh?</h2>
      {userData && (
        <div className="card-container">
          <Cards
            number={userData.card?.number || '#### #### #### ####'}
            name={`Balance: ${userData.balance || '0.00'}`} 
            expiry={userData.card?.expiry || '##/##'}
            cvc={userData.card?.cvc || '###'}
            focused={null}
          />
          <button onClick={handleTransfer} className="transfer-buttn">Transfer Money</button>
          <button onClick={handleViewTransactions}className="transactions">View Transaction History</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
