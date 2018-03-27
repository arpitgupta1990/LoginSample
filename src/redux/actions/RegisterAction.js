import axios from 'axios';
import * as validate from '../../helper/validate/ValidateInput';

import {
    REGISTER_LOADING, R_EMAIL_CHANGED, R_PASSWORD_CHANGED, R_CONFIRM_PASSWORD_CHANGED,
    REGISTER_ERROR, REGISTER_SUCCESS, R_NAME_CHANGED
} from '../types';
import keys from '../../config/keys';

export const passwordChanged = (text) => {
    let isValid = false;
    if (text.length > 5) {
        isValid = true;
    }
    return {
        type: R_PASSWORD_CHANGED,
        payload: {
            password: text,
            isValid: isValid
        }
    };
};
export const confirmPasswordChanged = (text) => {
    return {
        type: R_CONFIRM_PASSWORD_CHANGED,
        payload: text
    };
};
export const emailChanged = (text) => {
    let isValid = false;
    if (isNaN(text) && validate.validateEmail(text)) {
        isValid = true;
    }
    if (isNaN(text) === false && text.length > 5) {
        isValid = true;
    }
    return {
        type: R_EMAIL_CHANGED,
        payload: {
            email: text,
            isValid: isValid
        }
    };
};
export const nameChanged = (text) => {
    let isValid = false;
    if (text.length > 2) {
        isValid = true;
    }
    return {
        type: R_NAME_CHANGED,
        payload: {
            name: text,
            isValid: isValid
        }
    };
};
const registerUserSuccess = (dispatch, user) => {
    dispatch({
        type: REGISTER_SUCCESS,
        payload: user
    });
};
const registerUserFail = (dispatch, error) => {
    dispatch({
        type: REGISTER_ERROR,
        payload: error
    });
};
const registerLoading = (dispatch) => {
    dispatch({
        type: REGISTER_LOADING
    });
};
export const doRegister = (name, id, pass, pushToken) => {
    const axiosInstance = axios.create({
        baseURL: keys.baseURL,
        timeout: 5 * 1000
    });
    return (dispatch) => {
        registerLoading(dispatch);
        axiosInstance.post(`/auth/register/email`, {
            name: name,
            email: id,
            password: pass,
            pushToken: pushToken
        }).then(response => {
            if (response.status >= 200 && response.status < 400) {
                // registerUserSuccess(dispatch, response.data);
                registerUserSuccess(dispatch, { name: name, email: id });
            } else {
                // registerUserFail(dispatch, response.error);
                registerUserSuccess(dispatch, { name: name, email: id });
            }
        }).catch((error) => {
            // registerUserFail(dispatch, error);
            registerUserSuccess(dispatch, { name: name, email: id });
        });
    };
};

