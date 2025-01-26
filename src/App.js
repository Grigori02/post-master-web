import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { NavigationBar } from './components/NavigationBar';
import { useSelector } from 'react-redux';
import UpsertPost from './pages/UpsertPost';

const App = () => {
  const isAuthenticated = useSelector(state => state.user?.token);
  return (
    <Router>
    <Container>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/:postId/edit" element={<UpsertPost />} />
        <Route path="/posts/new" element={<UpsertPost />} />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Container>
  </Router>
  );
};

export default App;
