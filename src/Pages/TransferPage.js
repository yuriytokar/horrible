import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/transfer.css'

const TransferPage = () => {
  const [transferData, setTransferData] = useState({
    recipientCardNumber: '',
    amount: '',
  });
  const [userData, setUserData] = useState(null);

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
      const updatedSender = { ...userData, balance: parseFloat(userData.balance) - parseFloat(transferData.amount) };
      await axios.put(`http://localhost:8000/users/${userData.id}`, updatedSender);

      const response = await axios.get(`http://localhost:8000/users?card.number=${transferData.recipientCardNumber}`);
      const recipient = response.data[0];

      if (!recipient) {
        alert("Recipient not found.");
        return;
      }

      const updatedRecipient = { ...recipient, balance: parseFloat(recipient.balance || 0) + parseFloat(transferData.amount) };
      await axios.put(`http://localhost:8000/users/${recipient.id}`, updatedRecipient);

      alert("Transfer successful.");
      localStorage.setItem('user', JSON.stringify(updatedSender)); 
      setUserData(updatedSender);
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Error during transfer');
    }
  };

  return (
    <div className="transfer-form-container">
      <h2>Transfer Money</h2>
      {userData && (
        <div className="user-balance">
          <p>Current Balance: {userData.balance || '0.00'}</p>
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
        <button className = "transfer-button" type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default TransferPage;
