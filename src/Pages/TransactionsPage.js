import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/history.css'
import { useNavigate } from 'react-router-dom';


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        const cardNumber = loggedInUser.card?.number;

        if (cardNumber) {
          const response = await axios.get('http://localhost:8000/transactions');
          const relatedTransactions = response.data.filter(transaction => 
            transaction.senderCardNumber === cardNumber || 
            transaction.recipientCardNumber === cardNumber
          );
          setTransactions(relatedTransactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      <button onClick={handleBack} className="back-button">Back</button>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            Date: {transaction.date}, 
            Sender: {transaction.senderCardNumber}, 
            Recipient: {transaction.recipientCardNumber}, 
            Amount: ${transaction.amount}
          </li>
        
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
