
const initialState = {
  token: localStorage.getItem('token') || null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const {token} = action.payload;
      localStorage.setItem('token', token);
      return { ...state, token };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

export default userReducer;
