import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   ScrollView,
   TextInput,
} from 'react-native';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import { recuperarEquipo } from '../../services/equipos.js';

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
   }
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
            <TouchableOpacity
               hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
               onPress={() =>
                  this.props.navigation.navigate('CrearEquipos', {
                     equipo: this.state.equipoDatos,
                  })
               }
            >
               <Icon name="edit" type="material-icons" style={styles.button} />
            </TouchableOpacity>

            <Text style={styles.txt}>
               {' '}
               Nombre Equipo: {this.state.nombreEquipo + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Nombre Representante: {this.state.nombreRepresentante + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Apellido Representante: {this.state.apellidoRepresentante +
                  ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Teléfono Representante: {this.state.telefono + ''}{' '}
            </Text>
            <Text style={styles.txt}>
               {' '}
               Correo Representante: {this.state.mail + ''}{' '}
            </Text>
            <TouchableOpacity
               hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
               onPress={() =>
                  this.props.navigation.navigate('CrudJugadores', {
                     equipo: this.state.equipoDatos,
                  })
               }
            >
               <Text style={styles.txt}>JUGADORES</Text>
               <Icon name="edit" type="material-icons" style={styles.button} />
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
   txt: {
      fontSize: 15,
      marginLeft: 50,
      padding: 5,
   },
});
