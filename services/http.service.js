import { AsyncStorage } from 'react-native'
import { history } from '../Helpers'
import Config from 'react-native-config'
import { checkResponse } from '../Helpers/common'
export const httpService = {
  apiGet,
  apiPost,
  apiDelete,
  apiPut,
  rawApi,
  logout,
}

function getHeaders() {
  let headers = { 'content-type': 'application/json', accept: 'application/json', customerid: '2' }

  // headers['x-api-key'] = Config.REACT_APP_API_KEY
  // let authToken = AsyncStorage.getItem('authToken')

  // if (authToken) {
  //   headers['x-access-token'] = authToken
  // }
  return headers
}

function logout() {
  AsyncStorage.clear()
}

function rawApi(endPoint, method, headers = null) {
  headers = headers || {}
  const requestOptions = {
    method: method,
    headers: headers,
    cache: 'no-cache',
  }

  return fetch(endPoint, requestOptions).then(handleResponse)
}
function apiGet(endPoint, queryParams) {
  endPoint = Config.REACT_APP_API_URL + endPoint
  if (queryParams) {
    let par = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&')
    endPoint += '?' + par
  }
  const requestOptions = {
    method: 'GET',
    headers: getHeaders(),
    cache: 'no-cache',
  }

  return fetch(endPoint, requestOptions).then(handleResponse)
}

function apiPost(endPoint, data) {
  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }
  console.log('Process env', Config)
  endPoint = Config.REACT_APP_API_URL + endPoint
  console.log('ENDOOPIBT', endPoint)
  return fetch(endPoint, requestOptions).then(handleResponse)
}

function apiPut(endPoint, data) {
  const requestOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }
  endPoint = Config.REACT_APP_API_URL + endPoint
  return fetch(endPoint, requestOptions).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function apiDelete(endPoint) {
  const requestOptions = {
    method: 'DELETE',
    headers: getHeaders(),
  }
  endPoint = Config.REACT_APP_API_URL + endPoint
  return fetch(endPoint, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  try {
    return response.text().then((text) => {
      const data = text && JSON.parse(text)
      let newResp = checkResponse(data);
      console.log("newResp",newResp);

      if (response.status === 401) {
        // auto logout if 401 response returned from api
        AsyncStorage.clear()
      }
      return Promise.resolve(newResp)
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
