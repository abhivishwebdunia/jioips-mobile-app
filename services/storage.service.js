import { AsyncStorage } from 'react-native';

export const storageService = {
  setData,
  getData,
  setLogin,
  getLogin,
  isLoggedIn,
  logoutSession,
  deleteData,
  logCurrentStorage
}

function setData(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  AsyncStorage.setItem(key, value);
  logCurrentStorage();
}

function getData(key, value) {
  logCurrentStorage();
  return AsyncStorage.getItem(key, value);
  
}

function setLogin(loginData) {
  this.setData('authData', loginData)
  this.setData('authToken', loginData.token)
  logCurrentStorage()
}

function getLogin() {}

function logoutSession() {
  this.deleteData('authData')
  this.deleteData('authToken')
  logCurrentStorage()
}

function isLoggedIn() {
  if (AsyncStorage.getItem('authData')) {
    return true
  }
  return false
}

function deleteData(key) {
  AsyncStorage.removeItem(key)
  logCurrentStorage()
}


function logCurrentStorage() {
  AsyncStorage.getAllKeys().then((keyArray) => {
    AsyncStorage.multiGet(keyArray).then((keyValArray) => {
      let myStorage: any = {};
      for (let keyVal of keyValArray) {
        myStorage[keyVal[0]] = keyVal[1]
      }

      console.log('CURRENT STORAGE: ', myStorage);
    })
  });
}
