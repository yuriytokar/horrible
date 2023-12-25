import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './Pages/AdminHome';
import BlockedPage from './Pages/BlockedPage';
import DiagramPage from './Pages/DiagramPage';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/register'; 
import Home from './Pages/home';
import './styles/App.css'; 
import PaymentForm from './Pages/PaymentForm';
import TransferPage from './Pages/TransferPage';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/BlockedPage" element={<BlockedPage />} />
        <Route path="/DiagramPage" element={<DiagramPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment" element={<PaymentForm/>} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
    
  );
};

export default App;
