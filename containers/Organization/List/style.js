import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    listItem: {
      flex: 1,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#d6d7da",
      padding: 6
    },
    imageWrapper: {
      padding: 5
    },
    title: {
      fontSize: 20,
      textAlign: "left",
      margin: 6
    },
    subtitle: {
      fontSize: 10,
      textAlign: "left",
      margin: 6
    },
  
  
    card: {
      height: '100%',
      alignSelf: 'stretch',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      borderRadius: 5
    },
    cardTitle: {
      fontSize: 22,
      color: '#000000',
      textAlign: 'center',
    },
    
    cardText: {
      fontSize: 18,
      color: 'grey',
    }
    
    
    });
