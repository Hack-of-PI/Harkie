import { SET_USER_DETAILS, SET_AUTH_DETAILS, SET_LOGGED_IN, SET_IS_ONBOARDED, LOGOUT, SET_SESSION_ID } from '../actionTypes'

export const setUserDetails = (details) => {
    return {
        type: SET_USER_DETAILS,
        details
    }
}

export const setLoggedIn = val => {
    return {
        type: SET_LOGGED_IN,
        val
    }
}

export const setIsOnboarded = val => {
    return {
        type: SET_IS_ONBOARDED,
        val
    }
}

export const setAuthDetails = auth => {
    return {
        type: SET_AUTH_DETAILS,
        auth
    }
}
export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const setSessionId = val => {
    return {
        type: SET_SESSION_ID,
        sessionId: val
    }
}