import React from 'react';
import { Link } from "react-router-dom";
import '../styles/BlockedPage.css'; 

function BlockedPage() {

  return (
    <div className="container">
      <div className="page">
        <p className="text">Вас було заблоковано</p>
        <p className="text">Щоб спробувати увійти знову, натисніть <Link to="/" className="link">Сюди!</Link></p>
      </div>
    </div>
  );
}

export default BlockedPage;
