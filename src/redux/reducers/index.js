import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppState from './AppStateReducer';
import Register from './RegisterReducer';

export default combineReducers({
    auth: AuthReducer,
    appState: AppState,
    register: Register,
});
