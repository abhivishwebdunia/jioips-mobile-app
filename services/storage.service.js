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
  AsyncStorage.setItem(key, value.toString());
  logCurrentStorage();
}

async function getData(key) {
  logCurrentStorage();
  let data  = await AsyncStorage.getItem(key);
  try{
    data = JSON.parse(data); 
  }catch(err)
  {

  }
  
  return data;
}

function setLogin(loginData) {
  this.setData('authData', loginData)
  this.setData('authToken', loginData.token)
  this.setData('phoneId', loginData.phoneLongId);
  this.setData('organizationId', loginData.rootOrgId);
  this.setData('organizationName', loginData.organizationName);
  logCurrentStorage()
}

function getLogin() {}

async function logoutSession() {
  await this.deleteData('authData')
  await this.deleteData('authToken')
  await this.deleteData('phoneId');
  await this.deleteData('organizationId');
  await this.deleteData('organizationName');
  logCurrentStorage()
}

async function isLoggedIn() {

  const authData = await AsyncStorage.getItem('authData');
  const authToken = await AsyncStorage.getItem('authToken');
  const phoneId = await AsyncStorage.getItem('phoneId');
  console.log("IS LOGGED IN",authData)
  if (authData && authData != null && authToken && phoneId) {
    return true
  }
  return false
}

async function deleteData(key) {
  await AsyncStorage.removeItem(key)
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
