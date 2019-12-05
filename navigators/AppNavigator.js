import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator,createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Splash from '../containers/Splash';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home';
import DrawerContainer from '../containers/DrawerContainer';
import Profile from '../containers/Profile';
import MyPage2 from '../containers/MyPage2';
import MyPage3 from '../containers/MyPage3';
import MyPage4 from '../containers/MyPage4';
import MyPage5 from '../containers/MyPage5';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// /**
//  * The root screen contains the application's navigation.
//  *
//  * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
//  */



// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AuthStack = createStackNavigator({
  Login: { screen: Login, navigationOptions: { headerTitle: "Login" } },


  RegisterPage: {
    screen: Register, navigationOptions: { headerTitle: "Register" }

  },


});

const HeaderLeft =(navigation)=> <View><TouchableOpacity onPress={() => { navigation.toggleDrawer() }}><Icon name='menu' size={35} /></TouchableOpacity></View>

const DrawerStack = createDrawerNavigator({
  HomePage:  {
    screen: createStackNavigator({

      HomePage: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "Home Page",
          headerLeft: HeaderLeft(navigation)
        })
      },
    
    })
  },
  Profile: { screen: createStackNavigator({

    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Profile",
        headerLeft: HeaderLeft(navigation)
      })
    },
  
  })
} ,
  MyPage2: { screen: createStackNavigator({

    MyPage2: {
      screen: MyPage2,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage2",
        headerLeft: HeaderLeft(navigation)
      })
    },
  
  })
} ,
  MyPage3: { screen: createStackNavigator({

    MyPage3: {
      screen: MyPage3,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage3",
        headerLeft: HeaderLeft(navigation)
      })
    },
  
  })
} ,
  MyPage4: { screen: createStackNavigator({

    MyPage4: {
      screen: MyPage4,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage4",
        headerLeft: HeaderLeft(navigation)
      })
    },
  
  })
} ,
  MyPage5: { screen: createStackNavigator({

    MyPage5: {
      screen: MyPage5,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage5",
        headerLeft: HeaderLeft(navigation)
      })
    },
  
  })
} ,
},
  {
    gesturesEnabled: false,
    contentComponent: DrawerContainer
  })



export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: Splash,
      App: DrawerStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Splash',
    }
  )
);
// const MainNavigator = createStackNavigator({
//   Splash: { screen: Splash },
//   Login: { screen: Login },
// });

// const AppNavigator = createAppContainer(MainNavigator);

// export default AppNavigator;
// export default createAppContainer(StackNavigator)
