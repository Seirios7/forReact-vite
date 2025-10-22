// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ContentPage from './pages/ContentPage';
import './App.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('login-page-active');
    } else {
      document.body.classList.remove('login-page-active');
    }
  }, [location]);

  return (
    // ★ 修正点①: コンテンツが背景より手前に来るようにスタイルを追加
    <div 
      className="app-container" 
      style={{ position: 'relative', zIndex: 1 }}
    > 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* ★ 修正点②: 元の正しいパスに戻しました */}
        <Route path="/contents/:year/:month/:day" element={<ContentPage />} />
      </Routes>
    </div>
  );
}

export default App;