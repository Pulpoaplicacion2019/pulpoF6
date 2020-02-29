import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Image, Icon } from 'react-native-elements';
import styles from '../Styles/styles';
export default class ItemPerfiles extends Component {
   constructor(props) {
      super(props);
   }
   goModificarPerfil = () =>
      this.props.navigation.navigate('ModificarPerfil', {
         id: this.props.datos.cedula,
      });
   render() {
      return (
         <View style={styles.itemPerfil}>
            <View>
               <Image
                  style={{ width: 100, height: 120 }}
                  source={{
                     uri: this.props.datos.foto,
                  }}
               />
            </View>
            <View style={{ marginLeft: 30 }}>
               <Icon
                  name="edit"
                  type="material-icons"
                  style={styles.button}
                  onPress={() => this.goModificarPerfil()}
               />
               <Text>Cédula: {this.props.datos.cedula}</Text>
               <Text>Nombre: {this.props.datos.nombre}</Text>
               <Text>Apellido: {this.props.datos.apellido}</Text>
               <Text>Teléfono: {this.props.datos.telefono}</Text>
               <Text>Correo: {this.props.datos.correo}</Text>
               <Text>Rol: {this.props.datos.rol}</Text>
            </View>
         </View>
      );
   }
}
