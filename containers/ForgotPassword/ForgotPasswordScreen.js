import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style'
import ValidationComponent from 'react-native-form-validator'
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import { AuthActions } from '../../Actions'
import { Button } from 'react-native-elements'
import LoaderComponent from '../../Components/LoaderComponent'
import NavComponent from '../../Components/NavComponent'
class ForgotPasswordScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    console.log("props", this.props);
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {


    console.log("componentDidMount frogoto");
  }

  doSubmit = () => {
    console.log("doSubmit");
    let { username, password } = this.state
    this.validate({
      username: { required: true, minlength: 6 },
      password: { required: true, minlength: 6 },
    })

    if (this.isFormValid()) {
      this.props.dispatch(AuthActions.login(username, password))

    }

  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          
          <View style={styles.loginScreenContainer}>
          <NavComponent  navkey="forgot-password"></NavComponent>  
            <LoaderComponent></LoaderComponent>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>JIOIPS</Text>
              <Text style={styles.logoText2}>Forgot Password</Text>

              <TextInput
                placeholder="Username"
                keyboardShouldPersistTaps="always"
                placeholderColor="#c4c3cb"
                autoFocus={true}
                value={this.state.username}
                onChangeText={(e) => this.handleChange('username', e)}
                name="username"
                style={styles.loginFormTextInput}
              />
              {this.isFieldInError('username') && <Text>{this.getErrorsInField('username')[0]}</Text>}

              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.doSubmit()}
                title="Submit"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    isLogged: false,
    hasError: false,
  }
}



export default connect(mapStateToProps)(ForgotPasswordScreen)
