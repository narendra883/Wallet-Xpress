import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import RegistrationForm from './Pages/RegistrationForm';
import LoginForm from './Pages/LoginForm';
import HomePage from './Pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        
      </Routes>
    </Router>
  );
};

export default App;
