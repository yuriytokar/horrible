import React, { useState } from 'react';
import '../styles/DiagramPage.css';

function DiagramPage() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
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
        <div>
          {/* Вміст для вкладки Statistics */}
          <h2>Content for Statistics</h2>
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
