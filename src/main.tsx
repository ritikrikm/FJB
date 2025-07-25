import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';

import './index.css';
import ComingSoon from './components/pages/ComingSoon.tsx';



createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/jobs" element={<ComingSoon />} />
        <Route path="/companies" element={<ComingSoon />} />
        <Route path="/resources" element={<ComingSoon />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
