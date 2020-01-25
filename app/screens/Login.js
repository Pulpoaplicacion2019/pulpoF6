import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { cargarPermisos } from '../services/permisos';
export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = { usuario: '', contrasenia: '' };
   }
   guardar = () => {
      global.usuario = this.state.usuario;
      let usuario = global.usuario;
      usuario = usuario.replace('.com', 'com');
      console.log('usuario', global.usuario);
      console.log('usuario', usuario);
      cargarPermisos(usuario, listaPermisos => {
         console.log('listaPermisos', listaPermisos);
      });
   };
   static navigationOptions = ({ navigation }) => ({
      headerTitle: 'Login',
      headerLeft: Platform.select({
         ios: (
            <Icon
               name="ios-log-out"
               type="ionicon"
               containerStyle={styles.icon}
               onPress={() => navigation.navigate('MisTorneosScreen')}
            />
         ),
         android: (
            <Icon
               name="md-menu"
               type="ionicon"
               containerStyle={styles.icon}
               onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
         ),
      }),
   });
   render() {
      return (
         <View style={styles.viewBody}>
            <Input
               placeholder="Correo"
               onChangeText={text => this.setState({ usuario: text })}
               value={this.state.usuario}
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
               placeholder="Contraseña"
               onChangeText={text => this.setState({ contrasenia: text })}
               value={this.state.contrasenia}
               leftIcon={
                  <Icon
                     name="chevron-down-box"
                     type="material-community"
                     size={20}
                     color="black"
                  />
               }
            />
            <Button
               title="Iniciar Sesión"
               onPress={() => {
                  this.guardar();
                  this.props.navigation.navigate('MisTorneos');
                  global.objTorneos.setState({ user: this.state.usuario });
               }}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   viewBody: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
   },
});
