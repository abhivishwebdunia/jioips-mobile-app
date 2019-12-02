import React from 'react'
import { Text, View,Image } from 'react-native'
import styles from './SplashScreenStyle'
import {storageService} from '../../Services/storage.service'
export default class SplashScreen extends React.Component {
  
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let data = storageService.isLoggedIn;
    this.props.navigation.navigate(data ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          {/* You will probably want to insert your logo here */}
          <Image source={require('../../Assets/Images/logo.png')}></Image>
        </View>
      </View>
    )
  }
}
