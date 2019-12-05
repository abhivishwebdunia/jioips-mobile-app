import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LoaderComponent from '../../components/LoaderComponent';
let resizeMode = 'cover';

class Background extends Component {

  render() {
    return (
        
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >

          <Image
            style={{
              flex: 1,
              resizeMode,
            }}
            source={require('../../assets/bg_app.png')}
          />
          <LoaderComponent></LoaderComponent>
        </View>
      


    );
  }
}


export default Background;


