import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/history.css'

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/transactions');
        setTransactions(response.data);
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
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Date: {transaction.date}</p>
            <p>Sender: {transaction.senderCardNumber}</p>
            <p>Recipient: {transaction.recipientCardNumber}</p>
            <p>Amount: ${transaction.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPage;
