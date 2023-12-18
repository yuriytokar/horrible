import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/DiagramPage.css';

function DiagramPage() {
  const [activeTab, setActiveTab] = useState('Diagram');
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
              {operations.length > 0 && (
                <>
                  <p>Used money: {operations[0].used_money}</p>
                  <p>Count: {operations[0].count}</p>
                </>
              )}
            </div>
            <div className="diagram-window top-upStatistics">
              <h2>Top-up Statistics</h2>
              {operations.length > 1 && (
                <>
                  <p>Used money: {operations[1].used_money}</p>
                  <p>Count: {operations[1].count}</p>
                </>
              )}
            </div>
          </div>
          <div className="secondline">
            <div className="diagram-window depositStatistics">
              <h2>Deposit Statistics</h2>
              {operations.length > 2 && (
                <>
                  <p>Used money: {operations[2].used_money}</p>
                  <p>Count: {operations[2].count}</p>
                </>
              )}
            </div>
            <div className="diagram-window withdrawStatistics">
              <h2>Withdraw Statistics</h2>
              {operations.length > 3 && (
                <>
                  <p>Used money: {operations[3].used_money}</p>
                  <p>Count: {operations[3].count}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Graphs' && (
        <div className="firstgraphs">
            <LineChart width={600} height={300} data={operations}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Додаємо чотири секції графіка на основі полів used_money */}
            <Line type="monotone" dataKey="used_money" name="Operations" stroke="#8884d8" />
            </LineChart>
        </div>
      )}
      
      {activeTab === 'Diagram' && (
        <div className='linediagram'>
          <div className='firstdiagram'>
          </div>
          <div className='seconddiagram'>
            {/* Додайте інші елементи або графіки для другої секції, якщо необхідно */}
          </div>
        </div>
      )}
    </div>
  );
}

export default DiagramPage;
