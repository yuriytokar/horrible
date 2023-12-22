import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line
import { BarChart, Pie, PieChart, Bar, Sector, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/DiagramPage.css';

function DiagramPage() {
  const [activeTab, setActiveTab] = useState('Statistics');
  const [operations, setOperations] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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

  if (operations.length === 0) {
    return <p>Loading...</p>; 
  }
 
  const datagraphs01 = [
    { name: operations[0].type, UM: operations[0].used_money},
    { name: operations[1].type, UM: operations[1].used_money},
    { name: operations[2].type, UM: operations[2].used_money},
    { name: operations[3].type, UM: operations[3].used_money}
  ];

  const datagraphs02 = [
    { name: operations[0].type, Profitability: parseFloat(((operations[0].money_earned)/(operations[0].count)).toFixed(2)) },
    { name: operations[1].type, Profitability: parseFloat(((operations[1].money_earned)/(operations[1].count)).toFixed(2)) },
    { name: operations[2].type, Profitability: parseFloat(((operations[2].money_earned)/(operations[2].count)).toFixed(2)) },
    { name: operations[3].type, Profitability: parseFloat(((operations[3].money_earned)/(operations[3].count)).toFixed(2)) },
  ];


  const datadiagram01 = [
    { name: operations[0].type, value: operations[0].used_money },
    { name: operations[1].type, value: operations[1].used_money },
    { name: operations[2].type, value: operations[2].used_money },
    { name: operations[3].type, value: operations[3].used_money },
  ];

  const datadiagram02 = [
    { name: operations[0].type, value: parseFloat(((operations[0].money_earned)/(operations[0].count)).toFixed(2)) },
    { name: operations[1].type, value: parseFloat(((operations[1].money_earned)/(operations[1].count)).toFixed(2)) },
    { name: operations[2].type, value: parseFloat(((operations[2].money_earned)/(operations[2].count)).toFixed(2)) },
    { name: operations[3].type, value: parseFloat(((operations[3].money_earned)/(operations[3].count)).toFixed(2)) },
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g className='g1'>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#ffffff">{`UM ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
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
                <div className="flex-container">
                  <div className="left-column">
                    <p>Used money: {operations[0].used_money}</p>
                    <p>Count: {operations[0].count}</p>
                  </div>
                  <div className="right-column">
                    <p>Money earned: {operations[0].money_earned}</p>
                    <p>Profitability: {parseFloat(((operations[0].money_earned) / (operations[0].count)).toFixed(2))}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="diagram-window top-upStatistics">
              <h2>Top-up Statistics</h2>
              {operations.length > 1 && (
                <div className="flex-container">
                  <div className="left-column">
                    <p>Used money: {operations[1].used_money}</p>
                    <p>Count: {operations[1].count}</p>
                  </div>
                  <div className="right-column">
                    <p>Money earned: {operations[1].money_earned}</p>
                    <p>Profitability: {parseFloat(((operations[1].money_earned) / (operations[1].count)).toFixed(2))}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="secondline">
            <div className="diagram-window depositStatistics">
              <h2>Deposit Statistics</h2>
              {operations.length > 2 && (
                <div className="flex-container">
                  <div className="left-column">
                    <p>Used money: {operations[2].used_money}</p>
                    <p>Count: {operations[2].count}</p>
                  </div>
                  <div className="right-column">
                    <p>Money earned: {operations[2].money_earned}</p>
                    <p>Profitability: {parseFloat(((operations[2].money_earned) / (operations[2].count)).toFixed(2))}</p>
                  </div>
              </div>
              )}
            </div>
            <div className="diagram-window withdrawStatistics">
              <h2>Withdraw Statistics</h2>
              {operations.length > 3 && (
                <div className="flex-container">
                  <div className="left-column">
                    <p>Used money: {operations[3].used_money}</p>
                    <p>Count: {operations[3].count}</p>
                  </div>
                  <div className="right-column">
                    <p>Money earned: {operations[3].money_earned}</p>
                    <p>Profitability: {parseFloat(((operations[3].money_earned) / (operations[3].count)).toFixed(2))}</p>
                  </div>
              </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Graphs' && (     
        <div className='linegraphs'>
          <div className='firstgraphs'>
          <p>The funds that have passed through operations.</p>
            <ResponsiveContainer width="100%" height="70%">
            <BarChart
            width={500}
            height={300}
            data={datagraphs01}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "#fff" }}/>
            <YAxis tick={{ fill: "#fff" }}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="UM" stackId="a" fill="#8884d8" barSize={50}/>
            </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='secondgraphs'>
          <p>The funds that have passed through operations.</p>
            <ResponsiveContainer width="100%" height="70%">
            <BarChart
            width={500}
            height={300}
            data={datagraphs02}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "#fff" }}/>
            <YAxis tick={{ fill: "#fff" }}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="Profitability" stackId="a" fill="#9ACD32" barSize={50}/>
            </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {activeTab === 'Diagram' && (
        <div className='linediagram'>
          <div className='firstdiagram'>
            <p>The ratio of funds that have passed through operations.</p>
            <PieChart width={600} height={400}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={datadiagram01}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </div>
          <div className='seconddiagram'>
            <p>The ratio of money earned by the bank per unit of operation.</p>
            <PieChart width={600} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={datadiagram02}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#9ACD32"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiagramPage;
