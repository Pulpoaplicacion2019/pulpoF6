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
      this.setState({
         listaPartidos: this.props.navigation.state.params.partidos,
         listaFechas: this.convertirFechaLista(
            this.props.navigation.state.params.fechas
         ),
         fecha: this.props.navigation.state.params.id,
      });
      // var lista = global.listaCategorias;
      var categ = global.categoria;

      cargarEquipos(categ, listaEquipos => {
         this.setState({
            listaEquip: this.convertirEquiposLista(listaEquipos),
         });
      });
      /*cargarPartidos(categ, fecha, listaPartidos => {
         console.log('listaPartidos: ' + listaPartidos);
         this.setState({
            listaPartidos: listaPartidos,
         });
      });*/
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
      //const listaCategorias = global.listaCategorias;
      const categ = global.categoria;
      const fecha = this.state.fecha;
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
   render() {
      return (
         <ScrollView>
            <View style={styles.container}>
               <Text>Partidos</Text>
               <CrearPartidoV
                  equipos={this.state.listaEquip}
                  fechas={this.state.listaFechas}
                  guardar={this.guardar}
               ></CrearPartidoV>
               <FlatList
                  data={this.state.listaPartidos}
                  renderItem={({ item }) => (
                     <ItemPartidos
                        equipos={this.state.listaEquip}
                        fechas={this.state.listaFechas}
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
