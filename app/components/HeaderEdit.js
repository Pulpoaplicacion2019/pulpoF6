import React, { Component } from 'react';
import {
   Platform,
   Text,
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';

const HeaderEdit = props => {
   return (
      <View style={styles.container}>
         <Text style={styles.txt}>
            {props.nav.getParam('nombreTorneo', 'NO-ID')}
         </Text>
         <TouchableOpacity
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            onPress={() => props.nav.navigate('InfoPerfilTorneo')}
         >
            <Icon name="edit" type="material-icons" style={styles.button} />
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 20,
   },
   button: {
      flex: 1,
      borderWidth: 1,
      marginRight: 30,
      borderColor: 'black',
   },
   txt: { flex: 2, fontSize: 20 },
});

export default HeaderEdit;
