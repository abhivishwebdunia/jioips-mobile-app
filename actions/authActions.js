import { authConstants } from '../constants'
import { httpService, encryptDecrypt, storageService } from '../services'
import { loading, alertActions } from '.'
import { history } from '../helpers'
import getEnvVars from '../environment';
export const AuthActions = {
  login,
  logout,
  register,
}

function login(username, password) {
  console.log('username', username)
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(request({ username }))
    password = encryptDecrypt.sha512Encrypt(password)
    let params = { userName: username, userPassword: password, appId: getEnvVars().appId }
    console.log('PARAMS', params)
    httpService.apiPost('/login', params).then(
      (user) => {
        console.log('user', user)
        if (user.success) {
          dispatch(success(user))
          storageService.setLogin(user.data)
 
        }else{
          dispatch(failure(user.message))
          dispatch(alertActions.error(user.message))  
        }
        dispatch(loading(false))
        dispatch(alertActions.clear());  
      },
      (error) => {
        
        console.log('lgin error', error)
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
        dispatch(loading(false))
        console.log('lgin error ', error)
        dispatch(alertActions.clear());
      }
    )
  }

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user }
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user }
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error }
  }
}

function logout() {
  httpService.logout()
  return { type: authConstants.LOGOUT }
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user))

    httpService.apiPost('', user).then(
      (user) => {
        dispatch(success())
        history.push('/login')
        dispatch(alertActions.success('Registration successful'))
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      }
    )
  }

  function request(user) {
    return { type: authConstants.REGISTER_REQUEST, user }
  }
  function success(user) {
    return { type: authConstants.REGISTER_SUCCESS, user }
  }
  function failure(error) {
    return { type: authConstants.REGISTER_FAILURE, error }
  }
}
