import { LOGIN_LOADING, EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_ERROR, LOGIN_SUCCESS, USER_LOGOUT } from '../types';

const INITIAL_STATE = {
  loginId: "",
  password: "",
  error: "",
  status: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED: {
      return { ...state, loginId: action.payload };
    }
    case PASSWORD_CHANGED: {
      return { ...state, password: action.payload };
    }
    case LOGIN_LOADING: {
      return { ...state, status: 'loading' };
    }
    case LOGIN_SUCCESS: {
      return { ...INITIAL_STATE, status: 'success', user: action.payload };
    }
    case LOGIN_ERROR: {
      return { ...INITIAL_STATE, error: action.payload };
    }
    case USER_LOGOUT: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
};
