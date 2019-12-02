import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style'
import ValidationComponent from 'react-native-form-validator'
import Config from 'react-native-config'
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import LoaderComponent from '../../Components/LoaderComponent'
import { alertActions } from '../../Actions'

class DashboardScreen extends ValidationComponent {
  constructor(props) {
    super(props)
    console.log('props', this.props)
    this.state = {}
    console.log('CONFIG', Config)
  }

  componentDidMount() {
    console.log('componentDidMount Dashboard')
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <LoaderComponent></LoaderComponent>

          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Dashboard</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}

export default connect(mapStateToProps)(DashboardScreen)
