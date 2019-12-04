import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert';
import {alertActions } from '../actions';
const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

class AlertComponent extends Component {
  constructor(props) {
    super(props)
    console.log('AlertComponent.props', this.props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps AlertComponent', this.props, nextProps)
    if(this.props.alert === null && this.props.alert !== nextProps.alert)
    {
      this.dropDownAlertRef.alertWithType(nextProps.alert.type, nextProps.alert.heading, nextProps.alert.message);
       
    }
  }
  render() {
    // eslint-disable-next-line
        const { children, ...attributes } = this.props;

    return (
      <View>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </View>
    )
  }
}

AlertComponent.propTypes = propTypes
AlertComponent.defaultProps = defaultProps

function mapStateToProps(state) {
  return { alert: state.alert }
}

export default connect(mapStateToProps)(AlertComponent)
