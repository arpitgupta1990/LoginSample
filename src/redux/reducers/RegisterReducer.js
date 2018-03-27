import {
  REGISTER_LOADING, R_EMAIL_CHANGED, R_PASSWORD_CHANGED,
  R_CONFIRM_PASSWORD_CHANGED, REGISTER_ERROR, REGISTER_SUCCESS, USER_LOGOUT, R_NAME_CHANGED
} from '../types';

const INITIAL_STATE = {
  R_name: '',
  R_loginId: "",
  R_password: "",
  R_confirmPassword: "",
  isNameValid: false,
  isLoginIdValid: false,
  isConformPasswordValid: false,
  isPasswordValid: false,
  error: "",
  status: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case R_NAME_CHANGED: {
      return { ...state, R_name: action.payload.name, isNameValid: action.payload.isValid };
    }
    case R_EMAIL_CHANGED: {
      return { ...state, R_loginId: action.payload.email, isLoginIdValid: action.payload.isValid };
    }
    case R_PASSWORD_CHANGED: {
      return { ...state, R_password: action.payload.password, isPasswordValid: action.payload.isValid };
    }
    case R_CONFIRM_PASSWORD_CHANGED: {
      return { ...state, R_confirmPassword: action.payload, isConformPasswordValid: (state.R_password === action.payload) };
    }
    case REGISTER_LOADING: {
      return { ...state, status: 'loading' };
    }
    case REGISTER_SUCCESS: {
      return { ...INITIAL_STATE, status: 'success', user: action.payload };
    }
    case REGISTER_ERROR: {
      return { ...INITIAL_STATE, error: action.payload };
    }
    case USER_LOGOUT: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
};
