import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   FlatList,
   Text,
   ScrollView,
   TextInput,
} from 'react-native';
import { Container, Content } from 'native-base';
import ActionButton from 'react-native-action-button';
import { cargarJugadores } from '../../services/jugadores';
import ItemJugadoresEquipo from '../../components/ItemJugadoresEquipo';

// importación archivo de colores
import * as COLOR from '../../constants/colors.js';

const styles = StyleSheet.create({
   viewContainer: {
      flex: 1,
      backgroundColor: COLOR.COLOR_SNOWY_MOUNT,
      padding: 20,
   },
   columnEstilo: {
      color: COLOR.COLOR_SECUNDARIO,
      fontWeight: 'bold',
      fontSize: 12,
      width: '18%',
      padding: 1,
   },
   labelEstilo: {
      color: COLOR.COLOR_SECUNDARIO,
      fontWeight: 'bold',
      padding: 5,
   },
   header: {
      flexDirection: 'row',
   },
});
const border = color => {
   return { borderColor: color, borderWidth: 2 };
};

export default class CrudJugadores extends Component {
   state = {
      listaJugadores: [],
   };

   componentDidMount() {
      let equipo = this.props.navigation.getParam('equipo', null);
      this.setState({ equipo: equipo });

      cargarJugadores(equipo, listaJugadores => {
         this.setState({ listaJugadores: listaJugadores });
      });
   }

   render() {
      return (
         <Container>
            <Content>
               <View>
                  <Text style={styles.labelEstilo}>JUGADORES DEL EQUIPO</Text>
                  <ScrollView>
                     <View style={styles.viewContainer}>
                        <View style={styles.header}>
                           <Text style={styles.columnEstilo}>CÉDULA</Text>
                           <Text style={styles.columnEstilo}>NOMBRE</Text>
                           <Text style={styles.columnEstilo}>APELLIDO</Text>
                           <Text style={styles.columnEstilo}>NÚMERO</Text>
                        </View>
                        <FlatList
                           data={this.state.listaJugadores}
                           renderItem={({ item }) => (
                              <ItemJugadoresEquipo
                                 nav={this.props.navigation}
                                 jugador={item}
                                 equipo={this.state.equipo}
                                 visible={true}
                                 listaJugadores={this.state.listaJugadores}
                              />
                           )}
                           keyExtractor={item => item}
                        />
                     </View>
                  </ScrollView>
               </View>
            </Content>
            <ActionButton
               buttonColor="#00A680"
               onPress={() => {
                  this.props.navigation.navigate('CrearJugadores', {
                     equipo: this.state.equipo,
                     listaJugadores: this.state.listaJugadores,
                     modo: 'C',
                  });
               }}
            />
         </Container>
      );
   }
}
