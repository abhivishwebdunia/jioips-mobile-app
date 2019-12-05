import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import ValidationComponent from 'react-native-form-validator'

import { AuthActions, alertActions } from '../../actions';
import Background from '../Layout/Background';
import { Formik } from 'formik';
import * as yup from 'yup';
import getEnvVars from '../../environment';
import { styles } from './style';

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .label('Username')
    .min(6)
    .required(),
  userPassword: yup
    .string()
    .label('Password')
    .required()
    .min(6)
    .max(15),
});

class Login extends Component {

  constructor(props) {
    super(props)
    this.state={
      userName: '',
      userPassword: '',
    }
    console.log(getEnvVars());
  }

  componentWillReceiveProps(nextProps) {

    
    if (this.props.authentication && this.props.authentication.loggedIn !== nextProps.authentication.loggedIn && nextProps.authentication.loggedIn === true) {
      console.log("login props", this.props, nextProps);
      this.props.navigation.push("HomePage");
    }
  }


  doLogin = (values, actions) => {
    this.props.dispatch(AuthActions.login(values.userName, values.userPassword))

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

        <Background></Background>

        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <KeyboardAwareScrollView>

            
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
            <Formik
              initialValues={{
                userName: '',
                userPassword: '',
              }}
              onSubmit={this.doLogin}
              validationSchema={validationSchema}
            >
              {formikProps => (

                <React.Fragment>
                  <View style={styles.main}>
                    <TextInput underlineColorAndroid='transparent' name="userName" value={formikProps.values.userName} onChangeText={formikProps.handleChange('userName')}
                      onBlur={formikProps.handleBlur('email')} style={styles.input} placeholder="Username" />
                    
                      {formikProps.touched.userName && formikProps.errors.userName && <Text style={{ color: 'red' }}>{formikProps.errors.userName}</Text>}
                    
                    <TextInput underlineColorAndroid='transparent' name="userPassword" value={formikProps.values.userPassword} onChangeText={formikProps.handleChange('userPassword')}
                      onBlur={formikProps.handleBlur('userPassword')} style={styles.input} placeholder="Password" secureTextEntry={true} />
                    {formikProps.touched.userPassword && formikProps.errors.userPassword && <Text style={{ color: 'red' }}>{formikProps.errors.userPassword}</Text>}
                    <TouchableOpacity style={styles.buttonContainer} onPress={formikProps.handleSubmit} >
                      <Text style={styles.buttonText}> Login </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer2} onPress={() => this.props.navigation.navigate('RegisterPage')}>
                      <Text style={styles.buttonText}> Register </Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )}
            </Formik>
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


