import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../components/Splash';
import Login from '../components/Login';
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

// const AppStack = createStackNavigator({ DashboardScreen: DashboardScreen });
// const AuthStack = createStackNavigator({ LoginScreen: LoginScreen,
//   ForgotPasswordScreen: ForgotPasswordScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: Splash,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Splash',
    }
  )
);
// export default createAppContainer(StackNavigator)
