import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import { guardarJugador, recuperarJugador } from '../../services/jugadores.js';

// importación archivo de colores
import * as COLOR from '../../constants/colors.js';

const styles = StyleSheet.create({
   viewContainer: {
      flex: 1,
      backgroundColor: COLOR.COLOR_SNOWY_MOUNT,
      padding: 20,
      //alignItems: 'center',
   },
   inputStilo: {
      padding: 2,
      marginTop: 20,
   },
   labelEstilo: { color: COLOR.COLOR_SECUNDARIO },
   inputContentEstilo: {
      backgroundColor: '#ffff',
      borderWidth: 1,
      borderColor: COLOR.COLOR_GRIS_CLARO,
      borderRadius: 8,
      paddingStart: 5,
   },
});
const border = color => {
   return { borderColor: color, borderWidth: 2 };
};

export default class CrearJugadores extends Component {
   state = {
      uri: '',
      id: '',
      nombre: '',
      apellido: '',
      cedula: '',
      mail: '',
      numero: '',
      jugadorInfo: {},
   };
   validar = () => {
      let primerNombre = this.state.nombre;
      let primerApellido = this.state.apellido;
      let telefono = this.state.telefono;
      let correo = this.state.mail;
      let numeroJugador = this.state.numero;
      let idJugador = this.state.cedula;
      let existeJugador = -1;
      let modo = this.props.navigation.getParam('modo', null);
      let listaJugadores = this.props.navigation.getParam(
         'listaJugadores',
         null
      );

      if (primerNombre == '') {
         this.setState({ errMsjNombre: 'Campo Requerido' });
      } else {
         this.setState({ errMsjNombre: null });
      }
      if (primerApellido == '') {
         this.setState({ errMsjApellido: 'Campo Requerido' });
      } else {
         this.setState({ errMsjApellido: null });
      }
      if (telefono == '') {
         this.setState({ errMsjTelefono: 'Campo Requerido' });
      } else {
         this.setState({ errMsjTelefono: null });
      }
      if (numeroJugador == '') {
         this.setState({ errMsjNumero: 'Campo Requerido' });
      } else {
         this.setState({ errMsjNumero: null });
      }
      if (correo == '') {
         this.setState({ errMsjCorreo: 'Campo Requerido' });
      } else {
         this.setState({ errMsjCorreo: null });
      }
      if (idJugador == '') {
         this.setState({ errMsjCedula: 'Campo Requerido' });
      } else {
         if (modo == 'C') {
            existeJugador = buscar(listaJugadores, idJugador);
            if (existeJugador != -1) {
               this.setState({ errMsjCedula: 'Jugador ya existe' });
            } else {
               this.setState({ errMsjCedula: null });
            }
         } else {
            this.setState({ errMsjCedula: null });
         }
      }

      if (
         primerNombre != '' &&
         primerApellido != '' &&
         telefono != '' &&
         numeroJugador != '' &&
         correo != '' &&
         idJugador != '' &&
         existeJugador == -1
      ) {
         this.guardar();
      }
   };
   guardar = () => {
      let jugador = {
         cedula: this.state.cedula,
         primerNombre: this.state.nombre,
         primerApellido: this.state.apellido,
         telefono: this.state.telefono,
         mail: this.state.mail,
         numero: this.state.numero,
      };
      guardarJugador(this.state.equipo, jugador);
      this.props.navigation.goBack();
   };

   componentDidMount() {
      let jugadorId = this.props.navigation.getParam('jugadorId', null);
      let equipo = this.props.navigation.getParam('equipo', null);
      this.setState({
         equipo: equipo,
      });
      let infoJugador = {
         categoria: equipo.categoria,
         equipo: equipo.id,
         cedula: jugadorId,
      };
      recuperarJugador(infoJugador, jugador => {
         if (jugador != null) {
            this.setState({
               cedula: jugador.cedula,
               nombre: jugador.primerNombre,
               apellido: jugador.primerApellido,
               telefono: jugador.telefono,
               mail: jugador.mail,
               numero: jugador.numero,
            });
         }
      });
   }
   render() {
      return (
         <ScrollView>
            <View style={[styles.viewContainer]}>
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Cédula'}
                  placeholder=""
                  onChangeText={value => this.setState({ cedula: value })}
                  value={this.state.cedula}
                  errorStyle={{ color: 'red' }}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Nombre Jugador'}
                  placeholder=""
                  onChangeText={value => this.setState({ nombre: value })}
                  value={this.state.nombre}
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjNombre}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Apellido del jugador'}
                  placeholder=""
                  onChangeText={value => this.setState({ apellido: value })}
                  value={this.state.apellido}
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjApellido}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Correo'}
                  placeholder=""
                  onChangeText={value => this.setState({ mail: value })}
                  value={this.state.mail}
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjCorreo}
               />
               <Input
                  containerStyle={[styles.inputStilo]}
                  inputContainerStyle={styles.inputContentEstilo}
                  labelStyle={styles.labelEstilo}
                  label={'Número del Jugador'}
                  onChangeText={value => this.setState({ numero: value })}
                  value={this.state.numero}
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.state.errMsjNumero}
               />

               <View
                  style={{
                     marginTop: 20,
                     height: 100,
                  }}
               >
                  <Button
                     large
                     icon={{ name: 'cached' }}
                     title="Guardar"
                     onPress={this.validar}
                     buttonStyle={{
                        backgroundColor: COLOR.COLOR_CHRISTMAS_RED,
                        borderRadius: 0,
                     }}
                  />
               </View>
            </View>
         </ScrollView>
      );
   }
}
