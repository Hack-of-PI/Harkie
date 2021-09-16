import { SET_USER_DETAILS, SET_AUTH_DETAILS, SET_LOGGED_IN, SET_IS_ONBOARDED, LOGOUT, SET_SESSION_ID } from '../actionTypes';

const initialState = {
    isLoggedIn: false,
    user: {},
    isOnBoarded: false,
    sessionId: ""
}

export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SET_USER_DETAILS:
            let newUserDetails = Object.assign({}, state.user);
            newUserDetails = { ...newUserDetails, ...action.details };
            return {
                ...state,
                user: newUserDetails
            };
        case SET_AUTH_DETAILS:
            return { ...state, auth: action.auth }
        case SET_LOGGED_IN:
            return { ...state, isLoggedIn: action.val }
        case SET_IS_ONBOARDED:
            return { ...state, isOnBoarded: action.val }
        case LOGOUT:
            return initialState
        case SET_SESSION_ID:
            return {
                ...state,
                sessionId: action.sessionId
            }
        default:
            return state;
    }
}