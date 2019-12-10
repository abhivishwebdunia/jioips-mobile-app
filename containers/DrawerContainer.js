import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {storageService} from '../services/storage.service';
import { AuthActions } from '../actions';
import { connect } from 'react-redux'
let iconSize = 25;

class DrawerContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state={userData:null};
  }

  async componentWillMount(){

    const userData = await storageService.getData('authData');
    this.setState({userData:userData});
    
  }


  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logout = () => async() => {
    this.props.dispatch(AuthActions.logout());
    await storageService.logoutSession();
    this.props.navigation.navigate('Auth');
  }


  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>

            <ImageBackground
              style={{
                flex: 1,
                width: '100%',
                height: 170,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
              source={require('../assets/bg_drawer.png')}>

              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity>
                  <Image source={require("../assets/logo.png")}
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 75,
                      height: 75,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>

                {this.state.userData && <TouchableOpacity style={styles.drawerMenu} onPress={this.navigateToScreen('Profile')}><Text style={{ color: 'white', fontSize: 14, marginTop: 10 }}>
                  {this.state.userData.userDisplayName} ({this.state.userData.organizationName})
                </Text></TouchableOpacity>}
                {this.state.userData && <Text style={{ color: 'white', fontSize: 14 }}>
                  {this.state.userData.userEmail}
                </Text>}

              </View>

            </ImageBackground>



            <View style={styles.navSectionStyle}>
              <TouchableOpacity style={styles.drawerMenu} onPress={this.navigateToScreen('HomePage')}>
                <Icon name='home' size={iconSize} style={styles.drawerIcon} />
                <Text style={styles.navItemStyle} >Dashboard</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionHeadingStyle}> Section 1 </Text>

            <View style={styles.navSectionStyle}>

              {/* <TouchableOpacity style={styles.drawerMenu} onPress={this.navigateToScreen('Profile')}>
                <Icon name='account' size={iconSize} style={styles.drawerIcon} />
                <Text style={styles.navItemStyle} >Profile</Text>
              </TouchableOpacity> */}

              <TouchableOpacity style={styles.drawerMenu} onPress={this.navigateToScreen('Organizations')}>
                <Icon name='clipboard-text' size={iconSize} style={styles.drawerIcon} />
                <Text style={styles.navItemStyle}>Organizations</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.drawerMenu} onPress={this.navigateToScreen('MyPage3')}>
                <Icon name='animation' size={iconSize} style={styles.drawerIcon} />
                <Text style={styles.navItemStyle}>Page 3</Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.sectionHeadingStyle}> Section 2 </Text>

            <View style={styles.navSectionStyle}>

              <TouchableOpacity style={styles.drawerMenu} onPress={this.navigateToScreen('MyPage4')}>
                <Icon name='rss' size={iconSize} style={styles.drawerIcon} />
                <Text style={styles.navItemStyle} >Page 4</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.drawerMenu} onPress={this.logout()}>
                <Icon name='application' size={iconSize} style={styles.drawerIcon} />
                <Text style={styles.navItemStyle} >Logout</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.drawerMenu}>
            <Icon name='logout' size={iconSize} style={styles.drawerIcon} />
            <Text style={styles.navItemStyle} >Code For Fun !</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  navItemStyle: {
    padding: 15,
    marginLeft: 20,

  },
  navSectionStyle: {
    marginLeft: 20,
  },

  drawerIcon: {
    color: "grey"
  },

  drawerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#E0E0E0',
    color: '#003759'
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#fcc358',
  }
})


const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    
  }
}



export default connect(mapStateToProps)(DrawerContainer)