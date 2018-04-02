import axios from 'axios';
import keys from '../../config/keys';
import { USER_LOGGED_IN, USER_LOGOUT } from '../types';

export const userLoggedIn = (user) => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    };
};
export const userLogout = () => {
    return {
        type: USER_LOGOUT
    };
};
export const logout = (token) => {
    const axiosInstance = axios.create({
        baseURL: keys.baseURL,
        timeout: 5 * 1000,
        headers: { Authorization: token }
    });
    return (dispatch) => {
        dispatch(userLogout());
        axiosInstance.get('/account/logout')
            .then(response => {
                if (response.status >= 200 && response.status < 400) {
                    console.log('status updated in server');
                } else {
                    console.log('server status updation failed');
                }
            }).catch((error) => {
                console.log('failed' + error);
            });
    };
};
