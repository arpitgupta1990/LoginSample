import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers/index';

export const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(
            ReduxThunk,
            logger
        ),
        autoRehydrate()
    )
);
persistStore(store, { storage: AsyncStorage, whitelist: ['appState'] });
