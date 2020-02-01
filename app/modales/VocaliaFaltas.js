import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Modal,
   TouchableHighlight,
   Alert,
   FlatList,
} from 'react-native';
import { Icon, Input, Avatar, Button, CheckBox } from 'react-native-elements';
import { COLOR_CHRISTMAS_RED, COLOR_BLANCO } from '../constants/colors';
import { guardarEstadoJugador } from '../services/vocalia.js';
let modalVisibleFaltas;

export default class ModalFaltas extends Component {
   constructor() {
      super();
      this.state = {};
   }
   render() {
      let { isModalVisible } = this.props;
      modalVisibleFaltas = this.props.isModalVisible;
      console.log('isModalVisible', modalVisibleFaltas);
      console.log('lista en Modal Render', this.props.numJugador);
      return (
         <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
         >
            <View>
               <Text>Modal para las faltas</Text>
            </View>
            <Button
               small
               title="Cancelar"
               onPress={() => {
                  console.log(isModalVisible);
                  this.props.falta(!isModalVisible);
               }}
            />
         </Modal>
      );
   }
}
