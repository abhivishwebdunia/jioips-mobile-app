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
import LoaderComponent from '../../components/LoaderComponent';
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

    console.log("login props", this.props, nextProps);
    if (this.props.authentication && this.props.authentication.loggedIn !== nextProps.authentication.loggedIn && nextProps.authentication.loggedIn === true) {
      this.props.navigation.navigate("App");
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


