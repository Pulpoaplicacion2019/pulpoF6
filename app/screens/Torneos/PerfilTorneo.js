import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Avatar, Input, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { guardarTorneo, recuperarTorneo } from '../../services/torneos.js';
import { cargarCategorias } from '../../services/categorias.js';
import { guardarPerfiles } from '../../services/perfiles';
import FilaCategoria from '../../components/filaCategoria.js';
import DatePicker from 'react-native-datepicker';
import * as COLOR from '../../constants/colors.js';
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
         cedulaOrganizador: '',
         nombreOrganizador: '',
         apellidoOrganizador: '',
         correoOrganizador: '',
         telefonoOrganizador: '',
         favorito: 'false',
         uri: '',
         listaCategorias: [],
         listaCatTorneo: [],
         errMsjAño: null,
         errMsjTorneo: null,
         errMsjNombreOrganizador: null,
         errMsjApellidoOrganizador: null,
         errMsjTlfOrganizador: null,
         errMsjCorreo: null,
         errMsjCategorias: null,
         editarPantalla: true,
      };

      if (this.props.navigation.state.params.editar == 'N') {
         this.setState({
            editarPantalla: false,
         });
      }
   }

   componentDidMount() {
      if (this.props.navigation.state.params.editar == 'N') {
         this.setState({
            editarPantalla: false,
         });
      }
      recuperarTorneo(torneo => {
         if (torneo != null) {
            this.setState({
               anio: torneo.anio,
               nombreTorneo: torneo.nombreTorneo,
               fechaRegistro: torneo.fechaRegistro,
               estado: torneo.estado,
               date: torneo.fechaInicio,
               cedulaOrganizador: torneo.cedulaOrganizador,
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
   validar = () => {
      let año = this.state.anio;
      let torneo = this.state.nombreTorneo;
      let nOrganizador = this.state.nombreOrganizador;
      let aOrganizador = this.state.apellidoOrganizador;
      let tOrganizador = this.state.telefonoOrganizador;
      let cedulaOrganizador = this.state.cedulaOrganizador;
      let correo = this.state.correoOrganizador;
      let valCorreo = '';
      ('/^[-w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i');

      if (año == '') {
         this.setState({ errMsjAño: 'Campo Requerido' });
      } else {
         this.setState({ errMsjAño: null });
      }
      if (torneo == '') {
         this.setState({ errMsjTorneo: 'Campo Requerido' });
      } else {
         this.setState({ errMsjTorneo: null });
      }
      if (cedulaOrganizador == '') {
         this.setState({ errMsjCedulaOrganizador: 'Campo Requerido' });
      } else {
         this.setState({ errMsjCedulaOrganizador: null });
      }
      if (nOrganizador == '') {
         this.setState({ errMsjNombreOrganizador: 'Campo Requerido' });
      } else {
         this.setState({ errMsjNombreOrganizador: null });
      }
      if (aOrganizador == '') {
         this.setState({ errMsjApellidoOrganizador: 'Campo Requerido' });
      } else {
         this.setState({ errMsjApellidoOrganizador: null });
      }
      if (tOrganizador == '') {
         this.setState({ errMsjTlfOrganizador: 'Campo Requerido' });
      } else {
         this.setState({ errMsjTlfOrganizador: null });
      }
      if (correo == '') {
         this.setState({ errMsjCorreo: 'Campo Requerido' });
      } else if (
         /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
            correo
         )
      ) {
         this.setState({ errMsjCorreo: null });
         valCorreo = 'S';
      } else {
         this.setState({ errMsjCorreo: 'E-mail inválido' });
         valCorreo = 'N';
      }

      if (
         año != '' &&
         torneo != '' &&
         cedulaOrganizador != '' &&
         nOrganizador != '' &&
         aOrganizador != '' &&
         tOrganizador != '' &&
         correo != '' &&
         valCorreo == 'S'
      ) {
         this.guardar();
      }
   };
   guardar = () => {
      console.log('PerfilTorneo.js guardar');
      let cat = this.state.listaCatTorneo;
      let categorias = this.convertirCategorias(this.state.listaCatTorneo);
      console.log('categorias', cat.length);
      if (cat.length > 0) {
         this.setState({ errMsjCorreo: null });
         const torneo = {
            id: this.state.nombreTorneo + '_' + this.state.anio,
            anio: this.state.anio,
            categorias: categorias,
            estado: this.state.estado,
            favorito: this.state.favorito,
            nombreTorneo: this.state.nombreTorneo,
            fechaInicio: this.state.date,
            imagenTorneo: this.state.uri,
            cedulaOrganizador: this.state.cedulaOrganizador,
            nombreOrganizador: this.state.nombreOrganizador,
            apellidoOrganizador: this.state.apellidoOrganizador,
            correoOrganizador: this.state.correoOrganizador,
            telefonoOrganizador: this.state.telefonoOrganizador,
         };
         let infoPerfil = {
            cedula: this.state.cedulaOrganizador,
            nombre: this.state.nombreOrganizador,
            apellido: this.state.apellidoOrganizador,
            correo: this.state.correoOrganizador,
            telefono: this.state.telefonoOrganizador,
            rol: 'Organizador de Torneo',
            foto:
               'https://firebasestorage.googleapis.com/v0/b/pulpoapp2019-36a53.appspot.com/o/default%2Favatar-default.png?alt=media&token=6abbf4e5-5859-46d0-b5ae-d4bfc76a0739',
         };
         guardarTorneo(torneo);
         guardarPerfiles(infoPerfil);
         this.props.navigation.goBack();
      } else {
         this.setState({ errMsjCorreo: 'Ingrese Categorias' });
      }
   };
   convertirCategorias = categorias => {
      console.log('convertirCategorias', categorias);
      let objetoCategorias = {};
      categorias.forEach(item => {
         objetoCategorias[item] = item;
      });
      console.log('objetoCategorias', objetoCategorias);

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
         <View>
            <View
               style={{
                  backgroundColor: COLOR.COLOR_SECUNDARIO,
                  alignItems: 'center',
                  padding: 20,
               }}
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
            </View>
            <ScrollView>
               <View style={[styles.viewContainer]}>
                  <Input
                     keyboardType="numeric"
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Año'}
                     placeholder=""
                     disabled={this.state.editarPantalla}
                     onChangeText={text => this.setState({ anio: text })}
                     value={this.state.anio + ''}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjAño}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Nombre Torneo'}
                     disabled={this.state.editarPantalla}
                     placeholder=""
                     onChangeText={text =>
                        this.setState({ nombreTorneo: text })
                     }
                     value={this.state.nombreTorneo}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjTorneo}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Cédula Organizador'}
                     placeholder=""
                     onChangeText={value =>
                        this.setState({ cedulaOrganizador: value })
                     }
                     value={this.state.cedulaOrganizador}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjCedulaOrganizador}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Nombre Organizador'}
                     placeholder=""
                     onChangeText={text =>
                        this.setState({ nombreOrganizador: text })
                     }
                     value={this.state.nombreOrganizador}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjNombreOrganizador}
                  />

                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Apellido Organizador'}
                     placeholder=""
                     onChangeText={text =>
                        this.setState({ apellidoOrganizador: text })
                     }
                     value={this.state.apellidoOrganizador}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjApellidoOrganizador}
                  />
                  <Input
                     keyboardType="numeric"
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Telefono Organizador'}
                     placeholder=""
                     onChangeText={text =>
                        this.setState({ telefonoOrganizador: text })
                     }
                     value={this.state.telefonoOrganizador}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjTlfOrganizador}
                  />
                  <Input
                     containerStyle={[styles.inputStilo]}
                     inputContainerStyle={styles.inputContentEstilo}
                     labelStyle={styles.labelEstilo}
                     label={'Correo Organizador'}
                     placeholder=""
                     onChangeText={text =>
                        this.setState({ correoOrganizador: text })
                     }
                     value={this.state.correoOrganizador}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjCorreo}
                  />
                  <DatePicker
                     style={styles.date}
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
                  <Text style={{ color: 'red' }}>
                     {this.state.errMsjCategorias}
                  </Text>
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
               </View>
               <Text style={{ color: 'red' }}>
                  {this.state.errMsjCategorias}
               </Text>
               <Button
                  title="GUARDAR"
                  onPress={() => {
                     this.validar();
                  }}
               />
            </ScrollView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   progressBar: {
      backgroundColor: 'rgb(3, 154, 229)',
      height: 3,
      shadowColor: '#000',
   },
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
   date: {
      backgroundColor: '#ffff',
      borderWidth: 1,
      borderColor: COLOR.COLOR_GRIS_CLARO,
      borderRadius: 8,
      paddingStart: 5,
      padding: 2,
      marginTop: 20,
      marginLeft: 14,
      width: 350,
   },
});
