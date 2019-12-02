import React, { Component } from 'react'
import NavigationService from '../../Services/NavigationService'
import AppNavigator from '../../Navigators/AppNavigator'
import { View, RefreshControl } from 'react-native'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { BottomNavigation } from 'react-native-material-ui'
import AlertComponent from '../../Components/AlertComponent';

class RootScreen extends Component {
  constructor(props) {
    super(props);
    console.log("rootscreen",this.props);
    this.state = { active: 'login',refreshing:false }
  }

  navigateScreen(key, text) {
    this.setState({ active: key })
    this.props.navigation.push(text);
  }

  _onRefresh = () => {
    this.setState({refreshing: true}, () => {
      console.log("sdsdsdsd");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._onRefresh}
     />
        
        <AlertComponent></AlertComponent>
        <AppNavigator
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(RootScreen)
