import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

export default class ItemPartidos extends Component {
   constructor(props) {
      super(props);
      this.state = {
         equipo2: '',
         equipo1: '',
         hora: '',
         minutos: '',
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
         <View
            style={{
               flexDirection: 'column',
               marginLeft: 30,
               marginBottom: 20,
            }}
         >
            <View style={{ flexDirection: 'row' }}>
               <View style={{ width: 70 }}>
                  <Dropdown
                     label="Hora"
                     value={this.props.partidos.hora}
                     data={horas}
                     onChangeText={value => this.setState({ hora: value })}
                  />
               </View>
               <View style={{ width: 60, marginLeft: 50 }}>
                  <Dropdown
                     label="Min"
                     value={this.props.partidos.minuto}
                     data={min}
                     onChangeText={value => this.setState({ minutos: value })}
                  />
               </View>
               <View style={{ width: 50, marginLeft: 90, marginTop: 30 }}>
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
                              : this.state.minutos
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

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 20,
   },
});
