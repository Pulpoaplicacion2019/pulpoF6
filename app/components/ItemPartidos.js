import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import * as COLOR from '../constants/colors.js';

export default class ItemPartidos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         equipo2: '',
         equipo1: '',
         hora: '',
         minutos: '',
         fecha: '',
      };
   }

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
                  value={this.props.partidos.fecha}
                  data={this.props.fechas}
                  onChangeText={value => this.setState({ fecha: value })}
                  selectedItemColor={COLOR.COLOR_CHRISTMAS_RED}
                  animationDuration={200}
               />
            </View>
            <View style={[styles.time]}>
               <View style={{ flex: 1 }}>
                  <Dropdown
                     label="Hora"
                     value={this.props.partidos.hora}
                     data={horas}
                     onChangeText={value => this.setState({ hora: value })}
                  />
               </View>
               <View style={{ flex: 1, marginLeft: 10 }}>
                  <Dropdown
                     label="Min"
                     value={this.props.partidos.minuto}
                     data={min}
                     onChangeText={value => this.setState({ minutos: value })}
                  />
               </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
               <View style={{ flex: 1 }}>
                  <Dropdown
                     label="Equipo1"
                     value={this.props.partidos.equipoUno}
                     data={this.props.equipos}
                     onChangeText={value => this.setState({ equipo1: value })}
                  />
               </View>
               <View style={{ flex: 1, marginLeft: 50 }}>
                  <Dropdown
                     label="Equipo2"
                     value={this.props.partidos.equipoDos}
                     data={this.props.equipos}
                     onChangeText={value => this.setState({ equipo2: value })}
                  />
               </View>
            </View>
            <View style={{ width: 50, marginLeft: 10, marginTop: 30 }}>
               <TouchableOpacity
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  onPress={() => {
                     this.props.guardar(
                        this.state.equipo1 == ''
                           ? this.props.partidos.equipoUno
                           : this.state.equipo1,

                        this.state.equipo2 == ''
                           ? this.props.partidos.equipoDos
                           : this.state.equipo2,

                        this.state.hora == ''
                           ? this.props.partidos.hora
                           : this.state.hora,

                        this.state.minutos == ''
                           ? this.props.partidos.minuto
                           : this.state.minutos,
                        this.state.fecha == ''
                           ? this.props.partidos.fecha
                           : this.state.fecha
                     );
                  }}
               >
                  <Icon
                     name="check"
                     type="material-icons"
                     style={styles.button}
                  />
               </TouchableOpacity>
            </View>
            <View style={{ width: 30, marginLeft: 1, marginTop: 30 }}>
               <TouchableOpacity
                  hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  onPress={() => {
                     this.props.eliminar(this.props.partidos.id);
                  }}
               >
                  <Icon
                     name="delete"
                     type="material-icons"
                     style={styles.button}
                  />
               </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
               <View style={{ width: 150 }}>
                  <Dropdown
                     label="Equipo1"
                     value={this.props.partidos.equipoUno}
                     data={this.props.equipos}
                     onChangeText={value => this.setState({ equipo1: value })}
                  />
               </View>
               <View style={{ width: 150, marginLeft: 50 }}>
                  <Dropdown
                     label="Equipo2"
                     value={this.props.partidos.equipoDos}
                     data={this.props.equipos}
                     onChangeText={value => this.setState({ equipo2: value })}
                  />
               </View>
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
