import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import { Card, CardItem, Body } from "native-base";
import { styles } from './style';
import Background from '../Layout/Background';
import {storageService,httpService} from '../../services';
import { loading, alertActions } from '../../actions';

class Home extends Component {
  
  
  constructor(props)
  {
    super(props);
    this.state = {orgId:null,orgList:[]};
  }

  async componentWillMount(){
    const authData = await storageService.getData('authData');
    this.setState({orgId:authData.organizationId});
    const {dispatch} = this.props;
    dispatch(loading(true));
    httpService.apiGet('/organization/1?start=0&limit=100').then((response)=>{
      console.log("response",response);
      if(response.success)
      {
        this.setState({orgList:response.data.subOrganizationDetails});
      }
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
       <KeyboardAwareScrollView>
        <View style={styles.container}>
          {this.state.orgList.length > 0 && <Picker
          selectedValue={this.state.orgId}
          style={{height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
            {this.state.orgList.map((data)=><Picker.Item label={data.organizationName} value={data.organizationId} key={data.organizationId} />)}
          </Picker>}
          
          <Card borderRadius={10} style={styles.card}>
            
            <CardItem>
              <Body>
              <Text h4>Alert For Last 2 Days</Text>  
              </Body>
            </CardItem>

          </Card>

          <Card borderRadius={10} style={styles.card}>
            
            <CardItem>
              <Body>
              <Text h4>Battery Statistics</Text>  
              </Body>
            </CardItem>

          </Card>


        </View>
        </KeyboardAwareScrollView>
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
