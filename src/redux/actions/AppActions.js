import axios from 'axios';
import keys from '../../config/keys';
import { USER_LOGGED_IN, USER_LOGOUT, SET_CURRENT_COORDINATED, CHANGE_LOCATION_SHARING_SETTING } from '../types';

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
export const setCurrentCoordinates = () => {
    return {
        type: SET_CURRENT_COORDINATED
    };
};
export const setLocationSharingSetting = () => {
    return {
        type: CHANGE_LOCATION_SHARING_SETTING,
    };
};
export const logout = (token) => {
    const axiosInstance = axios.create({
        baseURL: keys.baseURL,
        timeout: 20 * 1000,
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
export const userLoggedInViaOAuth = (user, pushToken) => {
    const axiosInstance = axios.create({
        baseURL: keys.baseURL,
        timeout: 20 * 1000,
        headers: { Authorization: user.jwtToken }
    });
    axiosInstance.put('/account/pushToken', {
        pushToken: pushToken
    }).then(response => {
        if (response.status >= 200 && response.status < 400) {
            console.log('Token Updated');
        } else {
            console.log('server error');
        }
    }).catch((error) => {
        console.log('failed' + error);
    });
    return {
        type: USER_LOGGED_IN,
        payload: user
    };
};