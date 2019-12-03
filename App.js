
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './stores'
import AppNavigator from './navigators/AppNavigator';
import AlertComponent from './components/AlertComponent';
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
        <AppNavigator screenProps={{store}}></AppNavigator>
      </Provider>
    )
   

  }


}

AppRegistry.registerComponent("jioips-mobile-app", () => App)
