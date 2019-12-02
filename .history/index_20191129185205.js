import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.Blob = null;
console.log("appName",appName);
AppRegistry.registerComponent(appName, () => App);