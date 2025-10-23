import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// BrowserRouter の代わりに HashRouter をインポートします
import { HashRouter } from 'react-router-dom' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ↓ ここを HashRouter で囲みます */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)