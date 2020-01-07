import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
   Container,
   Header,
   Title,
   Content,
   Footer,
   FooterTab,
   Left,
   Right,
   Body,
} from 'native-base';
import { Icon } from 'react-native-elements';
import ItemEquipos from '../components/ItemEquipos';

export default class FilaCategoria extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.txt}>{this.props.categoria}</Text>
            <Button
               style={styles.button}
               title="E"
               onPress={() => {
                  this.props.fnEliminar(this.props.categoria);
               }}
            ></Button>
         </View>
      );
   }
}

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
