
import React from 'react';
import { Provider } from 'react-redux'
import { store } from './Stores'
import RootScreen from './components/RootScreen';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.Blob = null;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }



  render() {

   

  }


}


AppRegistry.registerComponent(appName, () => App)