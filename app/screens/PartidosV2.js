import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Container, Content, Header } from 'native-base';
import CrearPartidoV from '../components/CrearPartidoV';
import ItemPartidoV2 from '../components/ItemPartidoV2';
import { cargarEquipos } from '../services/equipos.js';
import ActionButton from 'react-native-action-button';
import {
   guardarPartido,
   cargarPartidos,
   eliminarPartidos,
} from '../services/partidos.js';
import * as COLOR from '../constants/colors.js';
export default class Partidos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listaEquip: [],
         listaPartidos: [],
         listaFechas: [],
         equipoDos: '',
         equipoUno: '',
         fecha: '',
         fechaId: '',
         hora: '',
         id: '',
         minuto: '',
         puntosEquiDos: '00',
         puntosEquiUno: '00',
      };
      var categ = global.categoria;

      cargarPartidos(
         categ,
         this.props.navigation.state.params.id,
         listaPartidos => {
            console.log('listaPartidos: ' + listaPartidos);
            this.setState({
               listaPartidos: listaPartidos,
            });
         }
      );
   }
   componentDidMount() {
      console.log('FechaId', this.props.navigation.state.params.id);
      console.log('Fechas', this.props.navigation.state.params.fechas);
   }

   convertirEquiposLista = equipos => {
      let listaEquipos = [];
      equipos.map((item, index) => {
         console.log('item:   ' + item);
         listaEquipos.push({
            value: item.nombreEquipo,
         });
      });

      console.log('objetoCategoriasconver  ' + equipos);

      console.log('listaCategoriasconver ' + listaEquipos);
      return listaEquipos;
   };
   eliminar = partido => {
      const categ = global.categoria;
      const fecha = this.state.fecha;
      console.log('eliminarpartido ');
      eliminarPartidos(categ, fecha, partido, listaPartidos => {
         console.log('listaPartidos: ' + listaPartidos);
         this.setState({
            listaPartidos: listaPartidos,
         });
      });
   };
   convertirFechaLista = fechas => {
      let listaF = [];
      fechas.map((item, index) => {
         console.log('item:   ' + item);
         listaF.push({
            value: item,
         });
      });

      return listaF;
   };
   separador = () => {
      return (
         <View
            style={{
               height: 10,
               width: '100%',
               backgroundColor: 'red',
            }}
         />
      );
   };
   renderActionButton = () => {
      return (
         <ActionButton
            buttonColor="#00A680"
            onPress={() => {
               this.props.navigation.navigate('CrearPartido', {
                  fechaId: this.props.navigation.state.params.id,
                  fechas: this.convertirFechaLista(
                     this.props.navigation.state.params.fechas
                  ),
               });
            }}
         />
      );
   };
   render() {
      return (
         <Container style={styles.viewBody}>
            <Content>
               <Text>Partidos</Text>

               <FlatList
                  data={this.state.listaPartidos}
                  //ItemSeparatorComponent={this.separador}
                  renderItem={({ item }) => (
                     <ItemPartidoV2
                        equipos={this.state.listaEquip}
                        fechas={this.state.listaFechas}
                        partidos={item}
                        eliminar={this.eliminar}
                        guardar={this.guardar}
                        nav={this.props.navigation}
                        fechaId={this.props.navigation.state.params.id}
                     />
                  )}
                  keyExtractor={item => item}
               />
            </Content>

            {this.renderActionButton()}
         </Container>
      );
   }
}

const border = color => {
   return { borderColor: color, borderWidth: 2 };
};

const styles = StyleSheet.create({
   container: {
      marginTop: 30,
   },
   button: {
      flex: 1,
      borderWidth: 1,
      marginRight: 30,
   },
   txt: { flex: 2, fontSize: 20 },
   viewBody: {
      flex: 1,
      backgroundColor: COLOR.COLOR_SNOWY_MOUNT,
   },
});
