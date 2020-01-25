import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Button,
   TouchableOpacity,
   Modal,
   TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
export default class ItemJugadoresVocalia extends Component {
   state = {
      modalVisible: false,
   };

   setModalVisible(visible) {
      this.setState({ modalVisible: visible });
   }
   render() {
      return (
         <View style={{ flexDirection: 'row' }}>
            <View>
               <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                     Alert.alert('Modal has been closed.');
                  }}
               >
                  <View
                     style={{
                        flexDirection: 'row',
                        margin: 10,
                        backgroundColor: '#f7f8fa',
                     }}
                  >
                     <View style={{ flexDirection: 'column', padding: 40 }}>
                        <View style={{ flexDirection: 'row' }}>
                           <View>
                              <TouchableHighlight
                                 style={styles.button}
                                 onPress={() => {
                                    this.props.sumarPuntos(
                                       1,
                                       this.props.jugador.numero,
                                       this.props.jugador.puntosQ1,
                                       this.props.jugador.puntosQ2,
                                       this.props.jugador.puntosQ3,
                                       this.props.jugador.puntosQ4
                                    );
                                    this.setModalVisible(
                                       !this.state.modalVisible
                                    );
                                 }}
                              >
                                 <Icon
                                    name="ios-basketball"
                                    type="ionicon"
                                    style={styles.button}
                                 />
                              </TouchableHighlight>
                           </View>
                           <View>
                              <TouchableHighlight
                                 style={styles.button}
                                 onPress={() => {
                                    this.props.sumarPuntos(
                                       2,
                                       this.props.jugador.numero,
                                       this.props.jugador.puntosQ1,
                                       this.props.jugador.puntosQ2,
                                       this.props.jugador.puntosQ3,
                                       this.props.jugador.puntosQ4
                                    );
                                    this.setModalVisible(
                                       !this.state.modalVisible
                                    );
                                 }}
                              >
                                 <Icon
                                    name="ios-basketball"
                                    type="ionicon"
                                    style={styles.button}
                                 />
                              </TouchableHighlight>
                           </View>
                        </View>
                        <View style={{ marginLeft: 70 }}>
                           <TouchableHighlight
                              style={styles.button}
                              title="1"
                              onPress={() => {
                                 this.props.sumarPuntos(
                                    3,
                                    this.props.jugador.numero,
                                    this.props.jugador.puntosQ1,
                                    this.props.jugador.puntosQ2,
                                    this.props.jugador.puntosQ3,
                                    this.props.jugador.puntosQ4
                                 );
                                 this.setModalVisible(!this.state.modalVisible);
                              }}
                           >
                              <Icon
                                 name="ios-basketball"
                                 type="ionicon"
                                 style={styles.button}
                              />
                           </TouchableHighlight>
                        </View>
                     </View>
                     <View>
                        <TouchableHighlight
                           onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                           }}
                        >
                           <Icon
                              name="close"
                              type="material-icons"
                              style={styles.button}
                           />
                        </TouchableHighlight>
                     </View>
                  </View>
               </Modal>
            </View>

            <Text style={styles.txt}>{this.props.jugador.nombre}</Text>
            <TouchableOpacity
               style={{
                  width: 35,
                  height: 35,
               }}
               hitSlop={{ top: 70, bottom: 70, left: 70, right: 70 }}
               onPress={() => {
                  this.setModalVisible(true);
               }}
            >
               <Icon
                  name="ios-basketball"
                  type="ionicon"
                  style={styles.button}
               />
            </TouchableOpacity>
            <TouchableOpacity
               style={{
                  borderWidth: 1,
                  width: 35,
                  height: 35,
                  marginLeft: 8,
               }}
               hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
               <Text style={{ padding: 5 }}> F</Text>
            </TouchableOpacity>
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
      borderWidth: 0,
      fontSize: 50,
      width: 80,
      height: 80,
      margin: 30,
      padding: 20,
      backgroundColor: '#ded7d7',
   },
   txt: { fontSize: 15, padding: 5, width: 120 },
});
