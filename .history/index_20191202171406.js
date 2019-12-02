import { AppRegistry } from 'react-native';
import { KeepAwake, registerRootComponent } from 'expo';
import App from './App';
import { name as appName } from './app.json';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.Blob = null;
console.log("APP NAME",appName);
registerRootComponent(appName, () => App);