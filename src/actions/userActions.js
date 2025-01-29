import axios from 'axios';

export const registerUser = (userData, cb) => async (dispatch) => {
  try {
    const {data, status} = await axios.post(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/users/register`, userData);
    cb({status, message: data.message})
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response?.data });
    cb({ message: error.response.data.message})
  }
};

export const loginUser = (userData, cb) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/users/login`, userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    cb();
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
