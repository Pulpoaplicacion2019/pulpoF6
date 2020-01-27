import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Image,
   FlatList,
   AsyncStorage,
   Dimensions,
   cScrollView,
} from 'react-native';
import { Avatar, Input, Icon, Button } from 'react-native-elements';
import { guardarTorneo, recuperarTorneo } from '../../services/torneos.js';

import DatePicker from 'react-native-datepicker';

export default class PerfilTorneo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         anio: '',
         date: this.date,
         nombreTorneo: '',
         fechaRegistro: '',
         estado: 'A',
         fechaInicio: '',
         nombreOrganizador: '',
         apellidoOrganizador: '',
         correoOrganizador: '',
         telefonoOrganizador: '',
         favorito: 'false',
         uri: '',
         listaCatTorneo: [],
      };
   }

   componentDidMount() {
      recuperarTorneo(torneo => {
         if (torneo != null) {
            this.setState({
               anio: torneo.anio,
               nombreTorneo: torneo.nombreTorneo,
               fechaRegistro: torneo.fechaRegistro,
               estado: torneo.estado,
               date: torneo.fechaInicio,
               nombreOrganizador: torneo.nombreOrganizador,
               apellidoOrganizador: torneo.apellidoOrganizador,
               correoOrganizador: torneo.correoOrganizador,
               telefonoOrganizador: torneo.telefonoOrganizador,
               favorito: torneo.favorito,
               uri: torneo.imagenTorneo,
               listaCatTorneo: this.convertirCategoriasLista(torneo.categorias),
            });
         }
      });
   }
   convertirCategoriasLista = objetoCategorias => {
      let listaCategorias = [];
      Object.keys(objetoCategorias).forEach(item => {
         listaCategorias.push(item);
      });
      return listaCategorias;
   };
   onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
   };

   pintarImagen = uriCargado => {
      this.setState({ uri: uriCargado });
   };
   renderEditButton = () => {
      let usuario = global.usuario;
      let torneoActual = global.idTorneo;
      let listaTorneos = global.listaTorneos;
      let permiso = this.buscarPermiso(listaTorneos, torneoActual);
      console.log('renderActionButton' + usuario);
      console.log('torneoActual' + torneoActual);
      if (usuario && permiso != -1) {
         return (
            <TouchableOpacity
               hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
               onPress={() => this.props.navigation.navigate('PerfilTorneo')}
            >
               <Icon name="edit" type="material-icons" style={styles.button} />
            </TouchableOpacity>
         );
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

            <Text style={styles.txt}> Año: {this.state.anio + ''} </Text>
            <Text style={styles.txt}>
               {' '}
               Nombre Torneo: {this.state.nombreTorneo + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Nombre Organizador: {this.state.nombreOrganizador + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Apellido Organizador: {this.state.apellidoOrganizador + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Teléfono Organizador: {this.state.telefonoOrganizador + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Correo Organizador: {this.state.correoOrganizador + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Fecha Inicio: {this.state.date + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Categorias: {this.state.listaCatTorneo + ''}{' '}
            </Text>
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
});
