import { AppRegistry } from 'react-native';
import App from './App/App';
import { name as appName } from './app.json';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.Blob = null;
AppRegistry.registerComponent(appName, () => App);