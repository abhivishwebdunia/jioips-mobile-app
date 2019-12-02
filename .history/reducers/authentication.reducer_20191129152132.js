import { authConstants } from '../Constants';
import { AsyncStorage } from 'react-native';
let user = false;
let initialState = {
  loggedIn: user ? true : false,
  loggingIn: false,
  authData: user,
  success: null,
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return { ...state, loggingIn: true }
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        success: true,
        authData: action.data,
      }
    case authConstants.LOGIN_FAILURE:
      return { ...state, loggedIn: false, success: false, authData: {}, loggingIn: false }
    case authConstants.LOGOUT:
      return { ...state, success: null, authData: null }
    default:
      return state
  }
}
