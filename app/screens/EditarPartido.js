import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import {
   guardarPartido,
   cargarPartidos,
   eliminarPartidos,
} from '../services/partidos.js';
import { cargarEquipos } from '../services/equipos.js';
import * as COLOR from '../constants/colors.js';

export default class EditarPartido extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listaEquip: [],
         listaPartidos: [],
         listaFechas: [],
         equipoDos: '',
         equipoUno: '',
         fecha: '',
         fechaPartido: '',
         hora: '',
         id: '',
         minuto: '',
         jugadores1: [],
         jugadores2: [],
         puntosEquiDos: '',
         puntosEquiUno: '',
      };
   }
   componentDidMount() {
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
   guardar = () => {
      let equipo1 = this.state.equipoUno;
      let equipo2 = this.state.equipoDos;
      let fecha = this.state.fechaPartido;
      let hora = this.state.hora;
      let min = this.state.minuto;
      if (equipo1 == '') {
         equipo1 = this.props.navigation.state.params.partidos.equipoUno;
      }
      if (equipo2 == '') {
         equipo2 = this.props.navigation.state.params.partidos.equipoDos;
      }
      if (fecha == '') {
         fecha = this.props.navigation.state.params.partidos.fecha;
      }
      if (hora == '') {
         hora = this.props.navigation.state.params.partidos.hora;
      }
      if (min == '') {
         min = this.props.navigation.state.params.partidos.minuto;
      }

      const partido = {
         equipoDos: equipo2,
         equipoUno: equipo1,
         fechaPartido: fecha,
         hora: hora,
         id: this.props.navigation.state.params.partidos.id,
         minuto: min,
         jugadores1: this.props.navigation.state.params.partidos.jugadores1,
         jugadores2: this.props.navigation.state.params.partidos.jugadores2,
         puntosEquiDos: this.props.navigation.state.params.partidos
            .puntosEquiDos,
         puntosEquiUno: this.props.navigation.state.params.partidos
            .puntosEquiUno,
      };
      //const listaCategorias = global.listaCategorias;
      const categ = global.categoria;
      const fechaId = this.props.navigation.state.params.fechaId;
      const id = this.props.navigation.state.params.partidos.id;
      guardarPartido(categ, fechaId, id, partido);
   };
   render() {
      const horas = [
         { value: '6' },
         { value: '7' },
         { value: '8' },
         { value: '9' },
         { value: '10' },
         { value: '11' },
         { value: '12' },
         { value: '13' },
         { value: '14' },
         { value: '15' },
         { value: '16' },
         { value: '17' },
         { value: '18' },
         { value: '19' },
         { value: '20' },
         { value: '21' },
         { value: '22' },
         { value: '23' },
      ];
      const min = [
         { value: '5' },
         { value: '10' },
         { value: '15' },
         { value: '20' },
         { value: '25' },
         { value: '30' },
         { value: '35' },
         { value: '40' },
         { value: '45' },
         { value: '50' },
         { value: '55' },
         { value: '60' },
      ];

      return (
         <View style={[border('#00D300'), styles.viewBody]}>
            <View style={{ flex: 1 }}>
               <Dropdown
                  label="Fecha"
                  value={this.props.navigation.state.params.partidos.fecha}
                  data={this.state.listaFechas}
                  onChangeText={value => this.setState({ fechaPartido: value })}
                  selectedItemColor={COLOR.COLOR_CHRISTMAS_RED}
                  animationDuration={200}
               />
            </View>
            <View style={[styles.time]}>
               <View style={{ flex: 1 }}>
                  <Dropdown
                     label="Hora"
                     value={this.props.navigation.state.params.partidos.hora}
                     data={horas}
                     onChangeText={value => this.setState({ hora: value })}
                  />
               </View>
               <View style={{ flex: 1, marginLeft: 10 }}>
                  <Dropdown
                     label="Min"
                     value={this.props.navigation.state.params.partidos.minuto}
                     data={min}
                     onChangeText={value => this.setState({ minuto: value })}
                  />
               </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
               <View style={{ flex: 1 }}>
                  <Dropdown
                     label="Equipo1"
                     value={
                        this.props.navigation.state.params.partidos.equipoUno
                     }
                     data={this.state.listaEquip}
                     onChangeText={value => this.setState({ equipoUno: value })}
                  />
               </View>
               <View style={{ flex: 1, marginLeft: 50 }}>
                  <Dropdown
                     label="Equipo2"
                     value={
                        this.props.navigation.state.params.partidos.equipoDos
                     }
                     data={this.state.listaEquip}
                     onChangeText={value => this.setState({ equipoDos: value })}
                  />
               </View>
            </View>
            <View style={{ width: 50, marginLeft: 10, marginTop: 30 }}>
               <TouchableOpacity
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  onPress={() => {
                     this.guardar();
                  }}
               >
                  <Icon
                     name="check"
                     type="material-icons"
                     style={styles.button}
                  />
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const border = color => {
   return { borderColor: color, borderWidth: 2 };
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginRight: 20,
   },
   time: {
      flex: 1,
      flexDirection: 'row',
   },
   viewBody: {
      flex: 1,
      backgroundColor: COLOR.COLOR_BLANCO,
      flexDirection: 'column',
      marginLeft: 2,
      marginRight: 2,
      marginBottom: 10,
      borderRadius: 5,
      paddingHorizontal: 15,
   },
});
