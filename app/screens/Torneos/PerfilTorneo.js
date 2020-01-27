import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   Image,
   FlatList,
   KeyboardAvoidingView,
   ScrollView,
} from 'react-native';
import { Avatar, Input, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { guardarTorneo, recuperarTorneo } from '../../services/torneos.js';
import { cargarCategorias } from '../../services/categorias.js';
import FilaCategoria from '../../components/filaCategoria.js';
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
         listaCategorias: [],
         listaCatTorneo: [],
      };
   }

   /*listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
     var torneoFirebase =snap.val();
     this.setState({
    	torneo:torneoFirebase
      });
        });
  }*/

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
      cargarCategorias(listaCategorias => {
         this.setState({ listaCategorias: listaCategorias });
      });
   }

   guardar = () => {
      console.log('PerfilTorneo.js guardar');
      let categorias = this.convertirCategorias(this.state.listaCatTorneo);
      const torneo = {
         anio: this.state.anio,
         apellidoOrganizador: this.state.apellidoOrganizador,
         correoOrganizador: this.state.correoOrganizador,
         estado: this.state.estado,
         favorito: this.state.favorito,
         nombreTorneo: this.state.nombreTorneo,
         fechaInicio: this.state.date,
         id: this.state.nombreTorneo + '_' + this.state.anio,
         imagenTorneo: this.state.uri,
         nombreOrganizador: this.state.nombreOrganizador,
         telefonoOrganizador: this.state.telefonoOrganizador,
         categorias: categorias,
      };
      guardarTorneo(torneo);
      this.props.navigation.goBack();
   };
   convertirCategorias = categorias => {
      let objetoCategorias = {};
      categorias.forEach(item => {
         objetoCategorias[item] = item;
      });
      return objetoCategorias;
   };
   convertirCategoriasLista = objetoCategorias => {
      let listaCategorias = [];
      console.log('objetoCategoriasconver  ' + objetoCategorias);
      Object.keys(objetoCategorias).forEach(item => {
         console.log('itemconver ' + item);
         listaCategorias.push(item);
      });
      console.log('listaCategoriasconver ' + listaCategorias);
      return listaCategorias;
   };
   elegirCategoria = value => {
      const categorias = this.state.listaCatTorneo;
      const position = this.buscarCategoria(categorias, value);
      if (position == -1) {
         categorias.push(value);
         this.setState({ listaCatTorneo: categorias });
      }
   };

   onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
   };

   pintarImagen = uriCargado => {
      this.setState({ uri: uriCargado });
   };

   buscarCategoria = (categorias, categoria) => {
      let posicion = -1;
      let iteracion = 0;
      console.log('buscar: ' + categorias.length);
      categorias.forEach(element => {
         console.log('element: ' + element);
         if (element == categoria) {
            posicion = iteracion;
         }
         iteracion++;
      });
      return posicion;
   };

   eliminar = categoria => {
      const categorias = this.state.listaCatTorneo;
      let i = this.buscarCategoria(categorias, categoria);
      console.log('posicion ' + i);
      categorias.splice(i, 1);

      this.setState({ listaCatTorneo: categorias });
   };
   render() {
      return (
         <ScrollView>
            <KeyboardAvoidingView
               behavior="position"
               style={styles.container}
               enabled
               keyboardVerticalOffset={1}
            >
               <Avatar
                  size="xlarge"
                  rounded
                  title="CR"
                  source={this.state.uri ? { uri: this.state.uri } : null}
                  onEditPress={() =>
                     this.props.navigation.navigate('CargarImagen', {
                        url: 'torneos',
                        fn: this.pintarImagen,
                        imagenActual: { uri: this.state.uri },
                     })
                  }
                  activeOpacity={0.7}
                  showEditButton={true}
                  editButton={{
                     underlayColor: '#000',
                     color: '#6E2665',
                     name: 'mode-edit',
                     type: 'material',
                     containerStyle: '#6E2665',
                     reverse: true,
                     size: 30,
                  }}
               />

               <Input
                  placeholder="Año"
                  onChangeText={text => this.setState({ anio: text })}
                  value={this.state.anio + ''}
                  leftIcon={
                     <Icon
                        name="chevron-down-box"
                        type="material-community"
                        size={20}
                        color="black"
                     />
                  }
               />
               <Input
                  placeholder="Nombre Torneo"
                  onChangeText={text => this.setState({ nombreTorneo: text })}
                  value={this.state.nombreTorneo}
                  leftIcon={
                     <Icon
                        name="account-group"
                        type="material-community"
                        size={20}
                        color="black"
                     />
                  }
               />
               <Input
                  placeholder="Nombre Organizador"
                  onChangeText={text =>
                     this.setState({ nombreOrganizador: text })
                  }
                  value={this.state.nombreOrganizador}
                  leftIcon={
                     <Icon
                        name="account-arrow-right"
                        type="material-community"
                        size={20}
                        color="black"
                     />
                  }
               />

               <Input
                  placeholder="Apellido Organizador"
                  onChangeText={text =>
                     this.setState({ apellidoOrganizador: text })
                  }
                  value={this.state.apellidoOrganizador}
                  leftIcon={
                     <Icon
                        name="account-arrow-right"
                        type="material-community"
                        size={20}
                        color="black"
                     />
                  }
               />
               <Input
                  placeholder="Telefono Organizador"
                  onChangeText={text =>
                     this.setState({ telefonoOrganizador: text })
                  }
                  value={this.state.telefonoOrganizador}
                  leftIcon={
                     <Icon
                        name="phone-in-talk"
                        type="material-community"
                        size={20}
                        color="black"
                     />
                  }
               />
               <Input
                  placeholder="Correo Organizador"
                  onChangeText={text =>
                     this.setState({ correoOrganizador: text })
                  }
                  value={this.state.correoOrganizador}
                  leftIcon={
                     <Icon
                        name="chevron-down-box"
                        type="material-community"
                        size={20}
                        color="black"
                     />
                  }
               />
               <DatePicker
                  style={{ width: 200 }}
                  date={this.state.date}
                  mode="date"
                  placeholder="Fecha Inicio"
                  format="YYYY-MM-DD"
                  minDate="2016-05-01"
                  maxDate="2100-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                     dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                     },
                     dateInput: { marginLeft: 36 },
                     // ... You can check the source to find the other keys.
                  }}
                  onDateChange={date => {
                     this.setState({ date: date });
                  }}
               />
               <Dropdown
                  label="Categorias"
                  data={this.state.listaCategorias}
                  onChangeText={this.elegirCategoria}
               />
               <FlatList
                  data={this.state.listaCatTorneo}
                  renderItem={({ item }) => (
                     <FilaCategoria
                        categoria={item}
                        fnEliminar={this.eliminar}
                     />
                  )}
                  keyExtractor={item => item}
               />

               <Button title="GUARDAR" onPress={this.guardar} />
            </KeyboardAvoidingView>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   btn: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 20,
      backgroundColor: 'rgb(3, 154, 229)',
      marginTop: 20,
      alignItems: 'center',
   },
   disabledBtn: {
      backgroundColor: 'rgba(3,155,229,0.5)',
   },
   btnTxt: {
      color: '#fff',
   },
   image: {
      marginTop: 20,
      minWidth: 200,
      height: 200,
      resizeMode: 'contain',
      backgroundColor: '#ccc',
   },

   img: {
      flex: 1,
      height: 100,
      margin: 5,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: '#eee',
      backgroundColor: '#ccc',
   },
   progressBar: {
      backgroundColor: 'rgb(3, 154, 229)',
      height: 3,
      shadowColor: '#000',
   },
});
