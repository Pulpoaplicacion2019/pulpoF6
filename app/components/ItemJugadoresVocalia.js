import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Button,
   TouchableOpacity,
   Modal,
   TouchableHighlight,
   Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { COLOR_CHRISTMAS_RED, COLOR_BLANCO } from '../constants/colors';
import ModalSuplentes from '../modales/VacaliaSuplentes.js';

export default class ItemJugadoresVocalia extends Component {
   state = {
      modalVisible: false,
      modalVisibleSuplente: false,
   };

   setModalVisible(visible) {
      this.setState({ modalVisible: visible });
   }
   setModalVisibleSuplentes(visible) {
      console.log('Visible:', visible);
      this.setState({ modalVisibleSuplente: visible });
      console.log(this.state.modalVisibleSuplente);
   }

   render() {
      return (
         <View style={{ flexDirection: 'row' }}>
            <View>
               <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                     Alert.alert('Modal has been closed.');
                  }}
               >
                  <View
                     style={[
                        {
                           flex: 1,
                           alignItems: 'center',
                           backgroundColor: 'rgba(35, 35, 35, 0.9)',
                           padding: 150,
                        },
                     ]}
                  >
                     <View
                        style={[
                           {
                              flexDirection: 'column',
                              borderRadius: 5,
                              padding: 5,
                              backgroundColor: '#fff',
                           },
                        ]}
                     >
                        <View
                           style={{
                              height: 50,
                              backgroundColor: COLOR_CHRISTMAS_RED,
                              alignItems: 'center',
                           }}
                        >
                           <Text style={{ color: COLOR_BLANCO, fontSize: 30 }}>
                              Puntos
                           </Text>
                        </View>
                        <View style={[{ flexDirection: 'row' }]}>
                           <View style={{ alignItems: 'center' }}>
                              <TouchableHighlight
                                 style={[
                                    styles.button,
                                    {
                                       justifyContent: 'center',
                                    },
                                 ]}
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
                                    size={20}
                                 />
                              </TouchableHighlight>
                              <Text>1</Text>
                           </View>
                           <View style={{ alignItems: 'center' }}>
                              <TouchableHighlight
                                 style={[
                                    styles.button,
                                    {
                                       justifyContent: 'center',
                                    },
                                 ]}
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
                                    size={30}
                                 />
                              </TouchableHighlight>
                              <Text>2</Text>
                           </View>

                           <View style={{ alignItems: 'center' }}>
                              <TouchableHighlight
                                 style={[
                                    styles.button,
                                    {
                                       justifyContent: 'center',
                                    },
                                 ]}
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
                                    this.setModalVisible(
                                       !this.state.modalVisible
                                    );
                                 }}
                              >
                                 <Icon
                                    name="ios-basketball"
                                    type="ionicon"
                                    style={styles.button}
                                    size={40}
                                 />
                              </TouchableHighlight>
                              <Text>3</Text>
                           </View>
                        </View>
                        <View style={[{ paddingTop: 20 }]}>
                           <Button
                              small
                              title="Cancelar"
                              onPress={() => {
                                 this.setModalVisible(!this.state.modalVisible);
                              }}
                           />
                        </View>
                     </View>
                  </View>
               </Modal>
            </View>
            <View
               style={{
                  flex: 1,
                  alignContent: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
               }}
            >
               <View
                  style={{
                     flex: 4,
                     flexDirection: 'row',
                     alignItems: 'center',
                  }}
               >
                  <View>
                     <Text style={{ fontWeight: 'bold', width: 30 }}>
                        {this.props.jugador.numero}
                     </Text>
                  </View>
                  <View>
                     <Text style={styles.txt}>{this.props.jugador.nombre}</Text>
                  </View>
               </View>
               <View style={[{ flex: 1 }]}>
                  <TouchableOpacity
                     style={{
                        borderWidth: 1,
                        width: 35,
                        height: 35,
                        marginLeft: 8,
                     }}
                     hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                     onPress={() => this.setModalVisibleSuplentes(true)}
                  >
                     <Icon
                        name="account-arrow-right"
                        type="material-community"
                        style={styles.button}
                     />
                  </TouchableOpacity>
                  <ModalSuplentes
                     isModalVisible={this.state.modalVisibleSuplente}
                     suplente={valorSuplente => {
                        this.setState({ modalVisibleSuplente: valorSuplente });
                     }}
                     listaSuplente={this.props.listaSuplentes}
                     numJugador={this.props.jugador.numero}
                     refJugadores={this.props.jugador.refJugadores}
                  />
               </View>
               <View
                  style={[
                     {
                        flex: 2,
                        flexDirection: 'row',
                        alignContent: 'flex-end',
                        justifyContent: 'flex-end',
                     },
                  ]}
               >
                  <TouchableOpacity
                     style={{
                        borderWidth: 1,
                        width: 35,
                        height: 35,
                     }}
                     hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                     <Icon
                        name="arrow-up-bold"
                        type="material-community"
                        style={styles.button}
                     />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}

const border = color => {
   return { borderColor: color, borderWidth: 2 };
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 20,
   },
   button: {
      borderWidth: 0,
      fontSize: 50,
      width: 50,
      height: 50,
      marginTop: 30,
      marginHorizontal: 20,
      backgroundColor: '#ded7d7',
   },
   txt: { fontSize: 15, padding: 5 },
});
