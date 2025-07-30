import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';


import ComingSoon from './components/pages/ComingSoon';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import { AuthContext } from './contexts/AuthContext';


createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
      
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<App/>} />
            <Route path="jobs" element={<ComingSoon />} />
            <Route path="companies" element={<ComingSoon />} />
            <Route path="resources" element={<ComingSoon />} />
          </Route>
        </Routes>
       
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
