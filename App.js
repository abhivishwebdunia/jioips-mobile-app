
import React from 'react';
import { AppRegistry,View,Image } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './stores'
import NavigationService from './services/NavigationService';
import AppNavigator from './navigators/AppNavigator';
import AlertComponent from './components/AlertComponent';
import LoaderComponent from './components/LoaderComponent';
let resizeMode = 'cover';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
    console.log("appName");
  }



  render() {
    return (
      <Provider store={store}>
        <AlertComponent></AlertComponent>
        <LoaderComponent></LoaderComponent>
       
        <AppNavigator ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} screenProps={{store}}></AppNavigator>
      </Provider>
    )
   

  }


}

AppRegistry.registerComponent("jioips-mobile-app", () => App)
