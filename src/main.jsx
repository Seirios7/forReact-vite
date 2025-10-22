// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // 追記

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ↓ AppをBrowserRouterで囲む */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
