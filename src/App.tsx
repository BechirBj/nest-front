// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Header from './Components/Header/Header';
import UsersPage from './Pages/UsersPage';
import { AuthProvider } from './Routes/AuthContext';
import ProtectedRoute from './Routes/ProtectedRoute';
import InterFaces from './Pages/InterFaces';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Interfaces" element={<InterFaces />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/UsersPage" element={<ProtectedRoute roles="admin"><UsersPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
