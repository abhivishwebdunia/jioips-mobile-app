import { AppRegistry } from 'react-native';
import { KeepAwake, registerRootComponent } from 'expo';
import App from './App';
import { name as appName } from './app.json';

console.log("APP NAME",appName);

registerRootComponent(appName, () => App);
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import App from './App';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App);