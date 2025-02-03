import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClientView from './pages/ClientView';
import Menu from './pages/Menu';
import Demo from './pages/Demo';

function App() {
  return (
    <BrowserRouter basename="/poc-gestorQR">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/table/:tableId" element={<ClientView />} />
        <Route path="/table/:tableId/menu" element={<Menu />} />
        <Route path="/demo/*" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;