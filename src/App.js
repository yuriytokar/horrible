import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/register'; 
import Home from './Pages/home';
import './styles/App.css'; 

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
    
  );
};

export default App;
