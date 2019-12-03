import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator,createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Splash from '../containers/Splash';
import Login from '../containers/Login';
import RegisterPage from '../containers/RegisterPage';
import HomePage from '../containers/HomePage';
import DrawerContainer from '../containers/DrawerContainer';
import MyPage1 from '../containers/MyPage1';
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
// const StackNavigator = createStackNavigator(
//   {
//     // Create the application routes here (the key is the route name, the value is the target screen)
//     // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    
//     LoginScreen: LoginScreen,
//     ForgotPasswordScreen: ForgotPasswordScreen,
//     DashboardScreen: DashboardScreen,
//     // The main application screen is our "ExampleScreen". Feel free to replace it with your
//     // own screen and remove the example.
//   },
//   {
//     // By default the application will show the splash screen
//     initialRouteName: 'LoginScreen',
//     // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
//     headerMode: 'none',
//   }
// )




// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AuthStack = createStackNavigator({
  Login: { screen: Login, navigationOptions: { headerTitle: "Login" } },


  RegisterPage: {
    screen: RegisterPage, navigationOptions: { headerTitle: "Register" }

  },


});



const DrawerStack = createDrawerNavigator({
  HomePage:  {
    screen: createStackNavigator({

      HomePage: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "Home Page",
          headerLeft: <View><TouchableOpacity onPress={() => { navigation.toggleDrawer() }}><Icon name='menu' size={35} /></TouchableOpacity></View>
        })
      },
    
    })
  },
  MyPage1: { screen: createStackNavigator({

    MyPage1: {
      screen: MyPage1,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage1",
        headerLeft: <View><TouchableOpacity onPress={() => { navigation.toggleDrawer() }}><Icon name='menu' size={35} /></TouchableOpacity></View>
      })
    },
  
  })
} ,
  MyPage2: { screen: createStackNavigator({

    MyPage2: {
      screen: MyPage2,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage2",
        headerLeft: <View><TouchableOpacity onPress={() => { navigation.toggleDrawer() }}><Icon name='menu' size={35} /></TouchableOpacity></View>
      })
    },
  
  })
} ,
  MyPage3: { screen: createStackNavigator({

    MyPage3: {
      screen: MyPage3,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage3",
        headerLeft: <View><TouchableOpacity onPress={() => { navigation.toggleDrawer() }}><Icon name='menu' size={35} /></TouchableOpacity></View>
      })
    },
  
  })
} ,
  MyPage4: { screen: createStackNavigator({

    MyPage4: {
      screen: MyPage4,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage4",
        headerLeft: <View><TouchableOpacity onPress={() => { navigation.toggleDrawer() }}><Icon name='menu' size={35} /></TouchableOpacity></View>
      })
    },
  
  })
} ,
  MyPage5: { screen: createStackNavigator({

    MyPage5: {
      screen: MyPage5,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "MyPage5",
        headerLeft: <View><TouchableOpacity onPress={() => { navigation.toggleDrawer() }}><Icon name='menu' size={35} /></TouchableOpacity></View>
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
