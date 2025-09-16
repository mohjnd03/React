import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // import router
import "./index.css";
import HomePage from './HomePage';   // your home page
import App from './App';             // your task adding page
import YourTasks from './YourTasks'; // your tasks viewing page
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* HomePage will be the default landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Other pages */}
        <Route path="/tasks" element={<App />} />
        <Route path="/your-tasks" element={<YourTasks />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
