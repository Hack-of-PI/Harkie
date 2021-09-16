import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOGOUT } from './actionTypes'
import userReducer from './reducers/user';

const appReducer = combineReducers({
    user: userReducer,
})

const rootReducer = (state = {}, action) => {
    if (action.type == LOGOUT) {
        AsyncStorage.removeItem(`persist:root`);
        state = {}
    }
    return appReducer(state, action);
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
export let store = {};

if (__DEV__) {
    middlewares.push(logger);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    store = createStore(
        persistedReducer,
        applyMiddleware(...middlewares)
    );
} else {
    store = createStore(
        persistedReducer,
        compose(applyMiddleware(...middlewares))
    );
}

export const persistor = persistStore(store);