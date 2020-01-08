import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import CrearPartidoV from '../components/CrearPartidoV';
import ItemPartidos from '../components/ItemPartidos';
import { cargarEquipos } from '../services/equipos.js';
import { guardarPartido, cargarPartidos } from '../services/partidos.js';
export default class Partidos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listaEquip: [],
         listaPartidos: [],
         equipoDos: '',
         equipoUno: '',
         fecha: '2020-01-08',
         hora: '',
         id: '',
         minuto: '',
         puntosEquiDos: '00',
         puntosEquiUno: '00',
      };
   }
   componentDidMount() {
      var lista = global.listaCategorias;
      var categ = lista[0];
      const fecha = 'Fecha' + 1;
      cargarEquipos(categ, listaEquipos => {
         this.setState({
            listaEquip: this.convertirEquiposLista(listaEquipos),
         });
      });
      cargarPartidos(categ, fecha, listaPartidos => {
         console.log('listaPartidos: ' + listaPartidos);
         this.setState({
            listaPartidos: listaPartidos,
         });
      });
   }
   guardar = (equipo1, equipo2, hora, minutos) => {
      const partido = {
         equipoDos: equipo2,
         equipoUno: equipo1,
         fecha: '2020-01-08',
         hora: hora,
         id: equipo1 + '_' + equipo2,
         minuto: minutos,
         puntosEquiDos: '00',
         puntosEquiUno: '00',
      };
      const listaCategorias = global.listaCategorias;
      const categ = listaCategorias[0];
      const fecha = 'Fecha' + 1;
      const id = equipo1 + '_' + equipo2;
      guardarPartido(categ, fecha, id, partido);
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
   render() {
      return (
         <ScrollView>
            <View style={styles.container}>
               <Text>Partidos</Text>
               <CrearPartidoV
                  equipos={this.state.listaEquip}
                  guardar={this.guardar}
               ></CrearPartidoV>
               <FlatList
                  data={this.state.listaPartidos}
                  renderItem={({ item }) => (
                     <ItemPartidos
                        equipos={this.state.listaEquip}
                        partidos={item}
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
});
