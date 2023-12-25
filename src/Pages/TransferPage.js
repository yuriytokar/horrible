import '../styles/transfer.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransferPage = () => {
  const [transferData, setTransferData] = useState({
    recipientCardNumber: '',
    amount: '',
  });
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUserData(JSON.parse(loggedInUser));
    }
  }, []);

  const handleInputChange = (event) => {
    setTransferData({ ...transferData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData) {
      alert("Please log in to continue.");
      return;
    }

    if (parseFloat(transferData.amount) > parseFloat(userData.balance)) {
      alert("Insufficient balance.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/users?card.number=${transferData.recipientCardNumber}`);
      const recipient = response.data[0];

      if (!recipient) {
        alert("Recipient not found.");
        return;
      }

      // Оновлення балансу отримувача
      const updatedRecipient = { 
        ...recipient, 
        balance: parseFloat(recipient.balance || 0) + parseFloat(transferData.amount)
      };
      await axios.put(`http://localhost:8000/users/${recipient.id}`, updatedRecipient);

      // Оновлення балансу відправника
      const updatedSender = { 
        ...userData, 
        balance: parseFloat(userData.balance) - parseFloat(transferData.amount)
      };
      await axios.put(`http://localhost:8000/users/${userData.id}`, updatedSender);

      // Створення запису про транзакцію
      const transactionRecord = {
        senderCardNumber: userData.card.number,
        recipientCardNumber: transferData.recipientCardNumber,
        amount: transferData.amount,
        date: new Date().toISOString().split('T')[0] 
      };

      // Відправка запису про транзакцію на сервер
      await axios.post('http://localhost:8000/transactions', transactionRecord);

      localStorage.setItem('user', JSON.stringify(updatedSender));
      alert("Transfer successful.");
      navigate('/transactions'); 
    } catch (error) {
      console.error('Error during transfer:', error);
      alert('Error during transfer');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="transfer-form-container">
      <button onClick={handleBack} className="back-button">Back</button>
      <h2>Transfer Money</h2>
      {userData && (
        <div className="user-balance">
          <p>Current Balance: ${userData.balance || '0.00'}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="recipientCardNumber"
          placeholder="Recipient's Card Number"
          value={transferData.recipientCardNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transferData.amount}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className='transfer-button'>Transfer</button>
      </form>
    </div>
  );
};

export default TransferPage;
