import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userActions';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(registerUser(userData, ({status, message}) => {
      setLoading(false);
      if (status === 200) {
        navigate('/login');
       } else {
        setError(message || 'Registration failed');
       }
    }));

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center">Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="name"
        variant="outlined"
        name='name'
        fullWidth
        value={userData['name']}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        name='email'
        fullWidth
        value={userData['email']}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        name='password'
        fullWidth
        value={userData['password']}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default RegisterPage;