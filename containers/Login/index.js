import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import ValidationComponent from 'react-native-form-validator'

import { AuthActions, alertActions } from '../../actions';
import LoaderComponent from '../../components/LoaderComponent';

import getEnvVars from '../../environment';
import { styles } from './style';

class Login extends ValidationComponent {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userPassword: '',
    }
    console.log(getEnvVars());
  }

  componentWillReceiveProps(nextProps) {

    console.log("login props", this.props, nextProps);
    if (this.props.authentication && this.props.authentication.loggedIn !== nextProps.authentication.loggedIn && nextProps.authentication.loggedIn === true) {
      this.props.navigation.push("HomePage");
    }
  }

  doLogin = () => {

    let { userName, userPassword } = this.state
    this.validate({
      userName: { required: true, minlength: 6 },
      userPassword: { required: true, minlength: 6 },
    })

    if (this.isFormValid()) {
      this.props.dispatch(AuthActions.login(userName, userPassword))

    }

  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    const resizeMode = 'cover';
    const text = 'LOGIN';


    return (

      <View
        style={{
          flex: 1,
          backgroundColor: '#eee',
        }}
      >

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

        </View>


        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <KeyboardAwareScrollView>
          
            <LoaderComponent></LoaderComponent>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/logo.png')} style={styles.image} />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 22,
                }}
              >
                {text}
              </Text>
            </View>

            <View style={styles.main}>
              <TextInput underlineColorAndroid='transparent' name="userName" onChangeText={(e) => this.handleChange('userName', e)} style={styles.input} placeholder="Username" />
              {this.isFieldInError('userName') && <Text>{this.getErrorsInField('userName')[0]}</Text>}
              <TextInput underlineColorAndroid='transparent' name="userPassword" onChangeText={(e) => this.handleChange('userPassword', e)} style={styles.input} placeholder="Password" secureTextEntry={true} />
              {this.isFieldInError('userPassword') && <Text>{this.getErrorsInField('userPassword')[0]}</Text>}
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doLogin()} >
                <Text style={styles.buttonText}> Login </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer2} onPress={() => this.navigateToRegisterPage()}>
                <Text style={styles.buttonText}> Register </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <Text style={styles.copyright}>Copyright © The Code 2019</Text>



      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    isLogged: false,
    hasError: false,
  }
}



export default connect(mapStateToProps)(Login)


