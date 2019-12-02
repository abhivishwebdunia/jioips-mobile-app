
import React from 'react';
import { Provider } from 'react-redux'
import { store } from './stores'
import RootScreen from './components/RootScreen';
import { AppRegistry } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }



  render() {
    return (
      <Provider store={store}>
        <RootScreen />
      </Provider>
    )
   

  }


}
