import { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, AUTH_ERROR, LOGOUT } from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const response = await axios.get('api/auth');

    dispatch({
      type: LOAD_USER,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = ({ username, password }) => async dispatch => {
  try {
    const response = await axios.post('api/auth', { username, password });

    dispatch(setAlert('Logged in successfully', 'success'));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });

  dispatch(setAlert('Logged out successfully', 'success'));
};
