import React ,{ Component }from "react";
import { Platform,Text, StyleSheet,TouchableOpacity,View  } from "react-native";
import { Icon } from "react-native-elements";
import { createDrawerNavigator,DrawerActions}from "react-navigation-drawer";

const MenuHeader = props => {

    return (
	<View style = {styles.container}>
		<TouchableOpacity hitSlop={{top: 50, bottom: 50, left: 50, right: 50}} onPress={() => props.nav.dispatch(DrawerActions.toggleDrawer())}>
			<Icon name="md-menu" type="ionicon" style = {styles.button} />
			
		</TouchableOpacity>
	
	</View>
	 
    );
  
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'flex-start',
	  paddingLeft:10,
	  flexDirection: 'row'
   },
   button: {
      borderWidth: 1,
      padding: 25,
      borderColor: 'black',
	 
   }
})

export default MenuHeader;