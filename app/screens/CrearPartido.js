import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { guardarPartido, cargarJugadores } from '../services/partidos.js';
import { cargarEquipos } from '../services/equipos.js';
import * as COLOR from '../constants/colors.js';

export default class CrearPartido extends Component {
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
         puntosEqui1Total: '',
         puntosEqui2Total: '',
         errMsjFecha: null,
         errMsjHora: null,
         errMsjMinuto: null,
         errMsjEquipo1: null,
         errMsjEquipo2: null,
         url1: '',
         url2: '',
      };
      var categ = global.categoria;

      cargarEquipos(categ, listaEquipos => {
         this.setState({
            listaEquip: this.convertirEquiposLista(listaEquipos),
         });
      });
   }
   componentDidMount() {
      console.log('listaFechas', this.props.navigation.state.params.fechas);
      console.log('fechaID', this.props.navigation.state.params.fechaId);
   }
   convertirEquiposLista = equipos => {
      let listaEquipos = [];
      equipos.map((item, index) => {
         console.log('item:   ', item);
         listaEquipos.push({
            value: item.nombreEquipo,
         });
      });

      console.log('objetoCategoriasconver  ' + equipos);

      console.log('listaCategoriasconver ' + listaEquipos);
      return listaEquipos;
   };
   validar = () => {
      let fecha = this.state.fechaPartido;
      let hora = this.state.hora;
      let min = this.state.minuto;
      let equipo1 = this.state.equipoUno;
      let equipo2 = this.state.equipoDos;

      if (fecha == '') {
         this.setState({ errMsjFecha: 'Campo Requerido' });
      } else {
         this.setState({ errMsjFecha: null });
      }
      if (hora == '') {
         this.setState({ errMsjHora: 'Campo Requerido' });
      } else {
         this.setState({ errMsjHora: null });
      }
      if (min == '') {
         this.setState({ errMsjMinuto: 'Campo Requerido' });
      } else {
         this.setState({ errMsjMinuto: null });
      }
      if (equipo1 == '') {
         this.setState({ errMsjEquipo1: 'Campo Requerido' });
      } else {
         this.setState({ errMsjEquipo1: null });
      }
      if (equipo2 == '') {
         this.setState({ errMsjEquipo2: 'Campo Requerido' });
      } else {
         this.setState({ errMsjEquipo2: null });
      }

      if (
         fecha != '' &&
         hora != '' &&
         min != '' &&
         equipo1 != '' &&
         equipo2 != ''
      ) {
         this.guardar();
      }
   };

   guardar = () => {
      let equipo1 = this.state.equipoUno;
      let equipo2 = this.state.equipoDos;
      let fecha = this.state.fechaPartido;
      let hora = this.state.hora;
      let min = this.state.minuto;
      let jugadores1 = this.state.jugadores1;
      let jugadores2 = this.state.jugadores2;

      const partido = {
         equipoDos: equipo2,
         equipoUno: equipo1,
         fechaPartido: fecha,
         hora: hora,
         id: equipo1 + '_' + equipo2,
         minuto: min,
         jugadores1: jugadores1,
         jugadores2: jugadores2,
         puntosEqui1Q1: '00',
         puntosEqui1Q2: '00',
         puntosEqui1Q3: '00',
         puntosEqui1Q4: '00',
         puntosEqui1Total: '00',
         puntosEqui2Q1: '00',
         puntosEqui2Q2: '00',
         puntosEqui2Q3: '00',
         puntosEqui2Q4: '00',
         puntosEqui2Total: '00',
         url1: this.state.url1,
         url2: this.state.url2,
      };
      //const listaCategorias = global.listaCategorias;
      const categ = global.categoria;
      const fechaId = this.props.navigation.state.params.fechaId;
      const id = equipo1 + '_' + equipo2;
      guardarPartido(categ, fechaId, id, partido);
   };
   jugadores1 = equipo => {
      console.log('equipo', equipo);
      const categ = global.categoria;
      let equi = equipo + '_' + categ;
      cargarJugadores(categ, equi, (listaJugadores, url) => {
         console.log('jugadores1: ', listaJugadores);
         this.setState({
            jugadores1: listaJugadores,
            url1: url,
         });
      });
   };
   jugadores2 = equipo => {
      console.log('equipo', equipo);
      const categ = global.categoria;
      let equi = equipo + '_' + categ;
      cargarJugadores(categ, equi, (listaJugadores, url) => {
         console.log('jugadores2: ', listaJugadores);
         this.setState({
            jugadores2: listaJugadores,
            url2: url,
         });
      });
   };
   convertirJugadoresLista = jugadores => {
      let listaJugadores = [];
      console.log(' convertirJugadoresLista ', jugadores);
      if (jugadores) {
         Object.keys(jugadores).forEach(item => {
            console.log('itemconver ' + item);
            listaJugadores.push(jugadores[item]);
         });
      }
      console.log('listaJugadores ', listaJugadores);
      return listaJugadores;
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
                  error={this.state.errMsjFecha}
                  data={this.props.navigation.state.params.fechas}
                  onChangeText={value => this.setState({ fechaPartido: value })}
                  selectedItemColor={COLOR.COLOR_CHRISTMAS_RED}
                  animationDuration={200}
               />
            </View>
            <View style={[styles.time]}>
               <View style={{ flex: 1 }}>
                  <Dropdown
                     label="Hora"
                     error={this.state.errMsjHora}
                     data={horas}
                     onChangeText={value => this.setState({ hora: value })}
                  />
               </View>
               <View style={{ flex: 1, marginLeft: 10 }}>
                  <Dropdown
                     label="Min"
                     error={this.state.errMsjMinuto}
                     data={min}
                     onChangeText={value => this.setState({ minuto: value })}
                  />
               </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
               <View style={{ flex: 1 }}>
                  <Dropdown
                     label="Equipo1"
                     error={this.state.errMsjEquipo1}
                     data={this.state.listaEquip}
                     onChangeText={value => {
                        this.setState({ equipoUno: value }),
                           this.jugadores1(value);
                     }}
                  />
               </View>
               <View style={{ flex: 1, marginLeft: 50 }}>
                  <Dropdown
                     label="Equipo2"
                     error={this.state.errMsjEquipo2}
                     data={this.state.listaEquip}
                     onChangeText={value => {
                        this.setState({ equipoDos: value }),
                           this.jugadores2(value);
                     }}
                  />
               </View>
            </View>
            <View style={{ width: 50, marginLeft: 10, marginTop: 30 }}>
               <TouchableOpacity
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  onPress={() => {
                     this.validar();
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

      borderRadius: 5,
   },
});
