import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import CrearPartidoV from '../components/CrearPartidoV';
import ItemPartidos from '../components/ItemPartidos';
import { cargarEquipos } from '../services/equipos.js';
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
         hora: '',
         id: '',
         minuto: '',
         puntosEquiDos: '00',
         puntosEquiUno: '00',
      };
   }
   componentDidMount() {
      /*this.setState({
         // listaPartidos: this.props.navigation.state.params.partidos,
         listaFechas: this.convertirFechaLista(
            this.props.navigation.state.params.fechas
         ),
         fecha: this.props.navigation.state.params.id,
      });*/
      // var lista = global.listaCategorias;
      var categ = global.categoria;

      cargarEquipos(categ, listaEquipos => {
         this.setState({
            listaEquip: this.convertirEquiposLista(listaEquipos),
         });
      });
      cargarPartidos(
         categ,
         this.props.navigation.state.params.id,
         listaPartidos => {
            console.log('listaPartidos: ' + listaPartidos);
            this.setState({
               listaPartidos: listaPartidos,
               listaFechas: this.convertirFechaLista(
                  this.props.navigation.state.params.fechas
               ),
               fecha: this.props.navigation.state.params.id,
            });
         }
      );
   }
   guardar = (equipo1, equipo2, hora, minutos, fechas) => {
      const partido = {
         equipoDos: equipo2,
         equipoUno: equipo1,
         fecha: fechas,
         hora: hora,
         id: equipo1 + '_' + equipo2,
         minuto: minutos,
         puntosEquiDos: '00',
         puntosEquiUno: '00',
      };
      //const listaCategorias = global.listaCategorias;
      const categ = global.categoria;
      const fechaId = this.state.fecha;
      const id = equipo1 + '_' + equipo2;
      guardarPartido(categ, fechaId, id, partido);
   };
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
   render() {
      return (
         <ScrollView style={styles.viewBody}>
            <View style={[styles.container, border('#B34A3E')]}>
               <Text>Partidos</Text>
               <CrearPartidoV
                  equipos={this.state.listaEquip}
                  fechas={this.state.listaFechas}
                  guardar={this.guardar}
                  style={border('#36B32E')}
               ></CrearPartidoV>
               <FlatList
                  data={this.state.listaPartidos}
                  //ItemSeparatorComponent={this.separador}
                  renderItem={({ item }) => (
                     <ItemPartidos
                        equipos={this.state.listaEquip}
                        fechas={this.state.listaFechas}
                        partidos={item}
                        eliminar={this.eliminar}
                        guardar={this.guardar}
                     />
                  )}
                  keyExtractor={item => item}
               />
            </View>
         </ScrollView>
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
