import { USER_LOGGED_IN, USER_LOGOUT, USER_UPDATED } from '../types';
import { REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
    os: '',
    version: '',
    deviceId: '',
    user: null,     // null
    loginTime: 0,
    token: '',
    pushToken: null
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE: {
            return { ...state, ...action.payload.appState } || [];        // check here i changed from 'action.payload.appState || []'
        }
        case 'RESET': {
            return { ...INITIAL_STATE };
        }
        case USER_LOGGED_IN: {
            return { ...state, user: action.payload };
        }
        case USER_UPDATED: {
            return { ...state, user: action.payload };
        }
        case USER_LOGOUT: {
            return { ...state, user: '', token: '' };
        }
        default: {
            return state;
        }
    }
};
