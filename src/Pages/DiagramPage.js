import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DiagramPage.css';

function DiagramPage() {
  const [activeTab, setActiveTab] = useState('Statistics');
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/operations');
        setOperations(response.data);
      } catch (error) {
        console.error('Error fetching operations', error);
      }
    };
    fetchOperations();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mainDia">
      <nav>
        <ul>
          <li className={activeTab === 'Statistics' ? 'active' : ''} onClick={() => handleTabChange('Statistics')}>
            Statistics
          </li>
          <li className={activeTab === 'Graphs' ? 'active' : ''} onClick={() => handleTabChange('Graphs')}>
            Graphs
          </li>
          <li className={activeTab === 'Diagram' ? 'active' : ''} onClick={() => handleTabChange('Diagram')}>
            Diagram
          </li>
        </ul>
      </nav>

      {activeTab === 'Statistics' && (
        <div className="diagram-content">
          <div className="firstline">
            <div className="diagram-window transferStatistics">
              <h2>Transfer Statistics</h2>
              <p>Amount: {operations[0].amount}</p>
              <p>Count: {operations[0].count}</p>
            </div>
            <div className="diagram-window top-upStatistics">
              <h2>Top-up Statistics</h2>
              <p>Amount: {operations[1].amount}</p>
              <p>Count: {operations[1].count}</p>
            </div>
          </div>
          <div className="secondline">
            <div className="diagram-window depositStatistics">
              <h2>Deposit Statistics</h2>
              <p>Amount: {operations[2].amount}</p>
              <p>Count: {operations[2].count}</p>
            </div>
            <div className="diagram-window withdrawStatistics">
              <h2>Withdraw Statistics</h2>
              <p>Amount: {operations[3].amount}</p>
              <p>Count: {operations[3].count}</p>
            </div>
          </div>
        </div>
      )}


      {activeTab === 'Graphs' && (
        <div>
          {/* Вміст для вкладки Graphs */}
          <h2>Content for Graphs</h2>
        </div>
      )}

      {activeTab === 'Diagram' && (
        <div>
          {/* Вміст для вкладки Diagram */}
          <h2>Content for Diagram</h2>
        </div>
      )}
    </div>
  );
}

export default DiagramPage;
