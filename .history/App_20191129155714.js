import React from 'react';
import { AppRegistry } from 'react-native';
import Splash from './components/Splash';
import Login from './components/Login';
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