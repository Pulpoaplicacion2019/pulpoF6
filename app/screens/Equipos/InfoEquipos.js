import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   ScrollView,
   FlatList,
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { recuperarEquipo } from '../../services/equipos.js';
import { cargarJugadores } from '../../services/jugadores';
import ItemJugadoresEquipo from '../../components/ItemJugadoresEquipo';
import * as COLOR from '../../constants/colors.js';

export default class InfoEquipos extends Component {
   state = {
      uri: '',
      id: '',
      nombreEquipo: '',
      categoria: '',
      nombreRepresentante: '',
      apellidoRepresentante: '',
      telefono: '',
      mail: '',
      imagenEquipo: '',
      equipoDatos: '',
      listaJugadores: [],
   };

   pintarImagen = uriCargado => {
      this.setState({ uri: uriCargado });
   };

   componentDidMount() {
      let equipoDatos = this.props.navigation.getParam('equipo', null);
      this.setState({
         equipoDatos: equipoDatos,
      });
      recuperarEquipo(equipoDatos, equipo => {
         if (equipo != null) {
            this.setState({
               id: equipo.id,
               nombreEquipo: equipo.nombreEquipo,
               categoria: equipo.categoria,
               nombreRepresentante: equipo.nombreRepresentante,
               apellidoRepresentante: equipo.apellidoRepresentante,
               telefono: equipo.telefono,
               mail: equipo.mail,
               imagenEquipo: equipo.imagenEquipo,
               uri: equipo.imagenEquipo,
            });
         }
      });
      cargarJugadores(equipoDatos, listaJugadores => {
         this.setState({ listaJugadores: listaJugadores });
      });
   }
   renderEditButton = () => {
      let usuario = global.usuario;
      let equipoActual = this.state.id;
      let listaEquipos = global.listaEquipos;
      if (listaEquipos) {
         let permiso = this.buscarPermiso(listaEquipos, equipoActual);
         console.log('renderActionButton' + usuario);
         console.log('torneoActual' + equipoActual);
         if (usuario && permiso != -1) {
            return (
               <TouchableOpacity
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  onPress={() =>
                     this.props.navigation.navigate('CrearEquipos', {
                        equipo: this.state.equipoDatos,
                     })
                  }
               >
                  <Icon
                     name="edit"
                     type="material-icons"
                     style={styles.button}
                  />
               </TouchableOpacity>
            );
         }
      }
   };
   renderEditButtonJ = () => {
      let usuario = global.usuario;
      let equipoActual = this.state.id;
      let listaEquipos = global.listaEquipos;
      if (listaEquipos) {
         let permiso = this.buscarPermiso(listaEquipos, equipoActual);
         console.log('renderActionButton' + usuario);
         console.log('torneoActual' + equipoActual);
         if (usuario && permiso != -1) {
            return (
               <Icon
                  name="edit"
                  type="material-icons"
                  style={styles.button}
                  onPress={() =>
                     this.props.navigation.navigate('CrudJugadores', {
                        equipo: this.state.equipoDatos,
                     })
                  }
               />
            );
         }
      }
   };
   buscarPermiso = (lista, id) => {
      let posicion = -1;
      let iteracion = 0;
      if (lista) {
         lista.forEach(element => {
            if (element == id) {
               posicion = iteracion;
            }
            iteracion++;
         });
      }
      return posicion;
   };
   render() {
      return (
         <View>
            <ScrollView>
               <Avatar
                  size="xlarge"
                  rounded
                  title="CR"
                  source={this.state.uri ? { uri: this.state.uri } : null}
                  activeOpacity={0.7}
                  containerStyle={{
                     marginLeft: 110,
                     marginTop: 20,
                     marginBottom: 30,
                  }}
               />
               {this.renderEditButton()}

               <Text style={styles.txt}>
                  {' '}
                  Nombre Equipo: {this.state.nombreEquipo + ''}{' '}
               </Text>
               <Text style={styles.txt}>
                  {' '}
                  Nombre Representante: {this.state.nombreRepresentante +
                     ''}{' '}
               </Text>
               <Text style={styles.txt}>
                  {' '}
                  Apellido Representante:{' '}
                  {this.state.apellidoRepresentante + ''}{' '}
               </Text>
               <Text style={styles.txt}>
                  {' '}
                  Teléfono Representante: {this.state.telefono + ''}{' '}
               </Text>
               <Text style={styles.txt}>
                  {' '}
                  Correo Representante: {this.state.mail + ''}{' '}
               </Text>

               <View style={styles.viewContainer}>
                  <View style={styles.header}>
                     <Text style={styles.labelEstilo}>
                        JUGADORES DEL EQUIPO
                     </Text>
                     {this.renderEditButtonJ()}
                  </View>
                  <View style={styles.header}>
                     <Text style={styles.labelEstilo}>CÉDULA</Text>
                     <Text style={styles.labelEstilo}>NOMBRE</Text>
                     <Text style={styles.labelEstilo}>APELLIDO</Text>
                     <Text style={styles.labelEstilo}>NÚMERO</Text>
                  </View>
                  <FlatList
                     data={this.state.listaJugadores}
                     renderItem={({ item }) => (
                        <ItemJugadoresEquipo
                           nav={this.props.navigation}
                           jugador={item}
                           equipo={this.state.equipo}
                           visible={false}
                        />
                     )}
                     keyExtractor={item => item}
                  />
               </View>
            </ScrollView>
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
   txt: {
      fontSize: 15,
      marginLeft: 50,
      padding: 5,
   },
   viewContainer: {
      flex: 1,
      backgroundColor: COLOR.COLOR_SNOWY_MOUNT,
      padding: 20,
   },
   inputStilo: {
      padding: 2,
      marginTop: 20,
   },
   labelEstilo: {
      color: COLOR.COLOR_SECUNDARIO,
      fontWeight: 'bold',
      padding: 5,
   },
   inputContentEstilo: {
      backgroundColor: '#ffff',
      borderWidth: 1,
      borderColor: COLOR.COLOR_GRIS_CLARO,
      borderRadius: 8,
      paddingStart: 5,
   },
   header: {
      flexDirection: 'row',
   },
});
