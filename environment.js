import Constants from "expo-constants";
import { Platform } from "react-native";
import config from './config';



const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
     console.log("LOCAL DEV",__DEV__);
   return config.local;
 } else{
    console.log("OTHER DEV",env);
    return config[env]; 
 }
};
export default getEnvVars;