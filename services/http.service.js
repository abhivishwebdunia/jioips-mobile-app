import { AsyncStorage } from 'react-native'
import { history } from '../helpers'
import getEnvVars from '../environment';
const Config = getEnvVars();
import { checkResponse } from '../helpers/common'


import {storageService} from './storage.service';
import NavigationService from './NavigationService';
export const httpService = {
  apiGet,
  apiPost,
  apiDelete,
  apiPut,
  rawApi,
  logout,
}

async function getHeaders() {
  let headers = { 'content-type': 'application/json', accept: 'application/json', customerid: '2' }

  // headers['x-api-key'] = getEnvVars().REACT_APP_API_KEY
  let authToken = await AsyncStorage.getItem('authToken')

  if (authToken) {
    headers['token'] = authToken
  }
  let organizationId = await AsyncStorage.getItem('organizationId')

  if (organizationId) {
    headers['organizationId'] = organizationId
  }
  let phoneId = await AsyncStorage.getItem('phoneId')

  if (phoneId) {
    headers['phoneId'] = phoneId
  }
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
async function apiGet(endPoint, queryParams) {
  endPoint = getEnvVars().apiUrl + endPoint
  if (queryParams) {
    let par = Object.keys(queryParams)
      .map((key) => key + '=' + queryParams[key])
      .join('&')
    endPoint += '?' + par
  }
  const requestOptions = {
    method: 'GET',
    headers: await getHeaders(),
    cache: 'no-cache',
  }

  return fetch(endPoint, requestOptions).then(handleResponse)
}

async function apiPost(endPoint, data) {
  const requestOptions = {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(data),
  }
  console.log('Process env', Config)
  endPoint = getEnvVars().apiUrl + endPoint
  console.log('ENDOOPIBT', endPoint)
  return fetch(endPoint, requestOptions).then(handleResponse)
}

function apiPut(endPoint, data) {
  const requestOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }
  endPoint = getEnvVars().apiUrl + endPoint
  return fetch(endPoint, requestOptions).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function apiDelete(endPoint) {
  const requestOptions = {
    method: 'DELETE',
    headers: getHeaders(),
  }
  endPoint = getEnvVars().apiUrl + endPoint
  return fetch(endPoint, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  try {
    return response.text().then(async(text) => {
      const data = text && JSON.parse(text)
      let newResp = checkResponse(data);
      console.log("newRespds",newResp);

      if ((newResp.success == false && newResp.statusCode == 20038)) {
        // auto logout if 401 response returned from api
        await storageService.logoutSession();
        console.log("navigate to log");
        NavigationService.navigate('Login');
        
      }

      return Promise.resolve(newResp)
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
