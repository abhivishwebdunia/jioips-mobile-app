import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './style';
import { connect } from 'react-redux'

import { AuthActions, alertActions } from '../../actions';
import LoaderComponent from '../../components/LoaderComponent';
import getEnvVars from '../../environment';
import { Formik,ErrorMessage } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup
      .string()
      .label('Name')
      .min(6)
      .required(),
    organizationName: yup
      .string()
      .label('Organization Name')
      .min(6)
      .required(),  
    userDisplayName: yup
      .string()
      .label('Display Name')
      .min(6)
      .required(),  
    userName: yup
      .string()
      .label('Userame')
      .min(6)
      .required(),  
      userEmail: yup
      .string()
      .label('Email')
      .min(6)
      .email()
      .required(),  
    name: yup
      .string()
      .label('Name')
      .min(6)
      .required(),  
    password: yup
      .string()
      .label('Password')
      .required()
      .min(6)
      .max(15),
    confirmPassword: yup
      .string()
      .label('Confirm Password')
      .required()
      .min(6)
      .max(15),
    userPhone: yup
      .string()
      .label('Phone No')
      .required()
      .matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),     
  });

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
          formData:{
                name: '',
                organizationName: '',
                userDisplayName:'',
                userName:'',
                userEmail:'',
                password:'',
                confirmPassword:'',
                userPhone:''
            }
        }
        console.log(getEnvVars());
      }
    
      componentWillReceiveProps(nextProps) {
    
        console.log("register props", this.props, nextProps);
        if (this.props.registration && this.props.registration.registered !== nextProps.registration.registered && nextProps.registration.registered === true) {
          this.props.navigation.navigate("Login");
        }
      }
    
      doSubmit = (values,actions) => {
        
      }
   

    render() {
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
                            resizeMode: 'cover',
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
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/logo.png')} style={styles.image} />

                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 22,
                                }}
                            >
                                Sign up to create your account
                            </Text>
                        </View>
                        <Formik
              initialValues={this.state.formData}
              onSubmit={this.doSubmit}
              validationSchema={validationSchema}
            >
              {formikProps => (

                <React.Fragment>
                        <View style={styles.main}>
                            <Text>Name</Text>
                            <TextInput underlineColorAndroid='transparent' value={formikProps.values.name} name="name" onChangeText={formikProps.handleChange('name')} onBlur={formikProps.handleBlur('name')} style={styles.input} placeholder="Name" />
                            
                            <ErrorMessage component={Text} style={{color:'red'}} name="name"></ErrorMessage>
                            <Text>Display Name</Text>
                            <TextInput underlineColorAndroid='transparent' value={formikProps.values.organizationName} name="organizationName" onChangeText={formikProps.handleChange('organizationName')}  onBlur={formikProps.handleBlur('organizationName')} style={styles.input} placeholder="Organzaiotn Name" />
                            <ErrorMessage component={Text} style={{color:'red'}} name="organizationName"></ErrorMessage>


                            <Text>Organization Name</Text>
                            <TextInput underlineColorAndroid='transparent' value={formikProps.values.userDisplayName} name="userDisplayName" onChangeText={formikProps.handleChange('userDisplayName')}  onBlur={formikProps.handleBlur('userDisplayName')} style={styles.input} placeholder="Display Name" />
                            <ErrorMessage component={Text} style={{color:'red'}} name="userDisplayName"></ErrorMessage>

                            <Text>Email</Text>
                            <TextInput underlineColorAndroid='transparent' value={formikProps.values.userEmail} name="userEmail" onChangeText={formikProps.handleChange('userEmail')}  onBlur={formikProps.handleBlur('userEmail')} style={styles.input} placeholder="Email" />
                            <ErrorMessage component={Text} style={{color:'red'}} name="userEmail"></ErrorMessage>
                            
                            
                            <Text>Password</Text>
                            <TextInput underlineColorAndroid='transparent' value={formikProps.values.password} name="password" onChangeText={formikProps.handleChange('password')}  onBlur={formikProps.handleBlur('password')} style={styles.input} placeholder="Password" />
                            <ErrorMessage component={Text} style={{color:'red'}} name="password"></ErrorMessage>
                            
                            
                            <Text>Confirm Password</Text>
                            <TextInput underlineColorAndroid='transparent' value={formikProps.values.confirmPassword} name="confirmPassword" onChangeText={formikProps.handleChange('confirmPassword')}  onBlur={formikProps.handleBlur('confirmPassword')} style={styles.input} placeholder="Confirm Password" />
                            <ErrorMessage component={Text} style={{color:'red'}} name="confirmPassword"></ErrorMessage>
                            
                            
                            <Text>UserName</Text>
                            <TextInput underlineColorAndroid='transparent' disabled value={formikProps.values.userName} name="userName" onChangeText={formikProps.handleChange('userName')}  onBlur={formikProps.handleBlur('userName')} style={styles.input} placeholder="User Name" />
                            <ErrorMessage component={Text} style={{color:'red'}} name="userName"></ErrorMessage>
                            
                            
                            <Text>Phone No</Text>
                            <TextInput underlineColorAndroid='transparent' value={formikProps.values.userPhone} name="userPhone" onChangeText={formikProps.handleChange('userPhone')}  onBlur={formikProps.handleBlur('userPhone')} style={styles.input} placeholder="Phone No" />
                            <ErrorMessage component={Text} style={{color:'red'}} name="userPhone"></ErrorMessage>
                            
                            {/* <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                                <Switch onValueChange={this.toggleSwitch1} onTintColor="#fcc358"
                                    value={this.state.switch1Value} />
                                <Text style={{ alignSelf: 'center', textAlign: 'left' }}>J'accepte les termes et conditions</Text>

                            </View> */}
                            <TouchableOpacity style={styles.buttonContainer} onPress={formikProps.handleSubmit}>
                                <Text style={styles.buttonText}> Register </Text>
                            </TouchableOpacity>

                        </View>
                        </React.Fragment>
              )}
            </Formik>
                    </KeyboardAwareScrollView>
                </View>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      registration: state.registration,
    }
  }
  
  
  
  export default connect(mapStateToProps)(Register)
  
