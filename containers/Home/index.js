import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Picker } from 'react-native';
import { connect } from 'react-redux'
import { Card, CardItem, Body } from "native-base";
import { styles } from './style';
import Background from '../Layout/Background';
import {httpService} from '../../services';
import { loading, alertActions } from '../../actions';
import LoaderComponent from '../../components/LoaderComponent';
let resizeMode = 'cover';

class Home extends Component {
  
  
  constructor(props)
  {
    super(props);
  }

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(loading(true));
    httpService.apiGet('/organization/1?start=0&limit=100').then((response)=>{
      console.log("response",response);
      dispatch(loading(false));
    },(error)=>{
      dispatch(alertActions.error(error.toString()));
      dispatch(loading(false));
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#eee',
        }}
      >

       <Background></Background>
       {/* <LoaderComponent></LoaderComponent> */}
        <View style={styles.container}>

          <Card borderRadius={10} style={styles.card}>
            <CardItem>
              <Body>
                
              </Body>
            </CardItem>

          </Card>


        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication:state.authentication,
  }
}



export default connect(mapStateToProps)(Home)
