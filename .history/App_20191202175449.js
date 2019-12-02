
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './stores'
import RootScreen from './components/RootScreen';
import AppNavigator from '../navigators/AppNavigator';

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
        <AppNavigator></AppNavigator>
      </Provider>
    )
   

  }


}

AppRegistry.registerComponent("jioips-mobile-app", () => App)
