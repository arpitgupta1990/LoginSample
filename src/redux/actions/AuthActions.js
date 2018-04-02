import axios from 'axios';

import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_LOADING } from '../types';
import keys from '../../config/keys';

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user
    });
};
const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_ERROR,
        payload: error
    });
};
const loginLoading = (dispatch) => {
    dispatch({
        type: LOGIN_LOADING
    });
};

export const doLogin = (id, pass, pushToken) => {
    const axiosInstance = axios.create({
        baseURL: keys.baseURL,
        timeout: 5 * 1000
    });
    return (dispatch) => {
        loginLoading(dispatch);
        axiosInstance.post('/auth/login/email', {
            password: pass,
            email: id,
            pushToken: pushToken
        }).then(response => {
            if (response.status >= 200 && response.status < 400) {
                loginUserSuccess(dispatch, response.data);
            }
        }).catch((error) => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                loginUserFail(dispatch, error.response.data);
            } else {
                loginUserFail(dispatch, error.message);
            }
        });
    };
};