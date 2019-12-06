import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import { Card, CardItem, Body } from "native-base";
import { styles } from './style';
import Background from '../Layout/Background';
import {storageService,httpService} from '../../services';
import { loading, alertActions } from '../../actions';
import {
  PieChart
} from "react-native-chart-kit";

class Home extends Component {
  
  
  constructor(props)
  {
    super(props);
    this.state = {orgId:null,orgList:[],userCount:[
      {
        name: "Ios",
        count: 0,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Android",
        count: 0,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Windows",
        count:0,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Linux",
        count:0,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Mac",
        count:0,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ]};
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
        console.log("userCount");
        this.getUserCount();
      }
      dispatch(loading(false));
    },(error)=>{
      dispatch(alertActions.error(error.toString()));
      dispatch(loading(false));
    });
  }

  getUserCount(){
    console.log("userCount");
    const {dispatch} = this.props;
    dispatch(loading(true));
    httpService.apiGet('/admin-dashboard/0?action=1&suborg='+this.state.orgId).then(async (response)=>{
      console.log("user count response",response);
      if(response.success)
      {
        let data = [];

        console.log("Object.keys(response.data)",Object.keys(response.data))
        await Object.keys(response.data).map((v)=>{
          console.log("VV",v);
        });
        this.setState({userCount:response.data});

        
      }
      dispatch(loading(false));
    },(error)=>{
      dispatch(alertActions.error(error.toString()));
      dispatch(loading(false));
    });
  }

  onSelectOrg = (itemValue, itemIndex) => () => {
    console.log("on select org",itemValue);
    this.setState({orgId: itemValue});
    setTimeout(()=>{
      this.getUserCount();
    },500);
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
          onValueChange={this.onSelectOrg}>
            {this.state.orgList.map((data)=><Picker.Item label={data.organizationName} value={data.organizationId} key={data.organizationId} />)}
          </Picker>}
          
          <Card borderRadius={10} style={styles.card}>
            
            <CardItem>
              <Body>
              <Text h4>USER LOGIN STATUS</Text> 
              {/* <PieChart
                data="{data}"
                width="{screenWidth}"
                height="{220}"
                chartConfig="{chartConfig}"
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />  */}
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
