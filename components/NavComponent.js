import React, { Component } from 'react'
import { View, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { BottomNavigation } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation';

class NavComponent extends Component {
  constructor(props) {
    super(props)
    console.log('NavComponent', this.props)
    this.state = { active: (this.props.navkey)?this.props.navkey:'login'}
  }

  navigateScreen(key, text) {
    this.props.navigation.push(text)
  }

  render() {
    return (
      <View>
        <BottomNavigation active={this.state.active} hidden={false}>
          <BottomNavigation.Action
            key="login"
            icon="login"
            label="Login"
            onPress={() => this.navigateScreen('login', 'LoginScreen')}
          />
          <BottomNavigation.Action
            key="forgot-password"
            icon="people"
            label="Forgot Password"
            onPress={() => this.navigateScreen('forgot-password', 'ForgotPasswordScreen')}
          />
        </BottomNavigation>
      </View>
    )
  }
}

export default withNavigation(NavComponent)
