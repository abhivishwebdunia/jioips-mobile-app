import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import Spinner from 'react-native-loading-spinner-overlay';
// Another way to import. This is recommended to reduce bundle size
const override = css`
  top: 50%;
  left: 50%;
  position: fixed;
  display: block;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
  text-align: center;
`

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

class LoaderComponent extends Component {
  constructor(props) {
    super(props)
    console.log('this.props', this.props)
    this.state = {
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('LOADER COMPOSNENT RECIREFE PROPS', this.props, nextProps)
    if(this.props.loader.loading !== nextProps.loader.loading)
    {
        this.setState({loading:nextProps.loader.loading});
    }
  }
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    return (
      <View>
        
        {this.state.loading && (
          <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={{
            color: '#FFF'
          }}
          />
          // <View style={[styles.loading]}>
          //   <ActivityIndicator size="large" color="#0000ff" />
          // </View>
        )}
      </View>
    )
  }
}

LoaderComponent.propTypes = propTypes
LoaderComponent.defaultProps = defaultProps

function mapStateToProps(state) {
  return { loader: state.loader }
}

export default connect(mapStateToProps)(LoaderComponent)
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex:9999999,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex:9999999,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
