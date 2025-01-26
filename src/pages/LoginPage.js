import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData, () => {
      navigate('/');
    }));
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" align="center">Login</Typography>
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        fullWidth
        value={userData['email']}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        fullWidth
        value={userData['password']}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginPage;
