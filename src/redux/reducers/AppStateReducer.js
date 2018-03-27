import {
    APP_INFO_SCREEN_SEEN, AFTER_APP_INFO_SCREEN_SEEN,
    USER_LOGGED_IN, USER_LOGOUT, SET_CURRENT_COORDINATED, USER_UPDATED, CIRCLE_UPDATED,
    SET_HELP_ALERT_UPDATED, SET_DRIVING_ALERT_UPDATED, SET_BATTERY_ALERT_UPDATED, SET_PUSH_NOTIFICATION_TOKEN,
    CHANGE_LOCATION_SHARING_SETTING, DEDICATED_CIRCLE_UPDATED
} from '../types';
import { REHYDRATE } from 'redux-persist/es/constants';

const INITIAL_STATE = {
    os: '',
    version: '',
    deviceId: '',
    appInfoSeen: false,
    user: null,     // null
    loginTime: 0,
    token: '',
    afterAppInfoScreenSeen: false,
    currentCoordinates: [],   // longitude, latitude
    pushToken: null,
    isLocationSharingActive: true,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE: {
            return { ...state, ...action.payload.appState } || [];        // check here i changed from 'action.payload.appState || []'
        }
        case 'RESET': {
            return { ...INITIAL_STATE };
        }
        case APP_INFO_SCREEN_SEEN: {
            return { ...state, appInfoSeen: true };
        }
        case AFTER_APP_INFO_SCREEN_SEEN: {
            return { ...state, afterAppInfoScreenSeen: true };
        }
        case USER_LOGGED_IN: {
            return { ...state, user: action.payload, token: action.payload.jwtToken };
        }
        case USER_UPDATED: {
            return { ...state, user: action.payload };
        }
        case USER_LOGOUT: {
            return { ...state, user: '', token: '' };
        }
        case SET_CURRENT_COORDINATED: {
            return { ...state, currentCoordinates: action.payload };
        }
        case CIRCLE_UPDATED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    circleIds: action.payload.circleIds,
                    circleIdsInProcess: action.payload.circleIdsInProcess
                }
            };
        }
        case DEDICATED_CIRCLE_UPDATED: {
            const updatedCircle = [];
           state.user.circleIds.map((circle) => {
                if (circle['_id'] === action.payload.circleId) {
                    updatedCircle.push(action.payload.circleData);
                } else{
                    updatedCircle.push(circle);
                }
            });
            return {
                ...state,
                user: {
                    ...state.user,
                    circleIds: updatedCircle,
                }
            };
        }
        case SET_HELP_ALERT_UPDATED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    helpAlertCircleId: action.payload
                }
            };
        }
        case SET_DRIVING_ALERT_UPDATED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    drivingAlertCircleId: action.payload
                }
            };
        }
        case SET_BATTERY_ALERT_UPDATED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    batteryAlertCircleId: action.payload
                }
            };
        }
        case SET_PUSH_NOTIFICATION_TOKEN: {
            return {
                ...state,
                pushToken: action.payload
            };
        }
        case CHANGE_LOCATION_SHARING_SETTING: {
            return { ...state, isLocationSharingActive: !state.isLocationSharingActive };
        }
        default: {
            return state;
        }
    }
};
