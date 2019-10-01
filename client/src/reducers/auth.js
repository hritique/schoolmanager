import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);

      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
