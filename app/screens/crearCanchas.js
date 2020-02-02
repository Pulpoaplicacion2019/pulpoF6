import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { Icon, Input, Avatar, Button } from 'react-native-elements';
import * as COLOR from '../constants/colors.js';
export default class Canchas extends Component {
   constructor(props) {
      super(props);
      this.state = {
         numeroCancha: '',
         direccion: '',
         listaCanchas: '',
         errMsjNumCancha: '',
         errMsjDirección: '',
      };
      var categ = global.categoria;
   }
   componentDidMount() {}

   renderRowCanchas = listaCanchas => {
      const { numero, direccion } = listaCanchas.item;
      if (listaCanchas) {
         return (
            <View style={styles.viewPartidos}>
               <View style={styles.viewEquipoUno}>
                  <Input
                     keyboardType="numeric"
                     label={'Número de Cancha'}
                     placeholder=""
                     onChangeText={text =>
                        this.setState({ numeroCancha: text })
                     }
                     value={numero}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjNumCancha}
                  />
                  <Input
                     label={'Dirección'}
                     placeholder=""
                     onChangeText={text => this.setState({ direccion: text })}
                     value={direccion}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjDirección}
                  />
                  <Button
                     title="GUARDAR"
                     onPress={() => {
                        this.validar();
                     }}
                  />
               </View>
               <View style={[styles.viewDatos]}></View>
            </View>
         );
      }
   };

   render() {
      return (
         <Container style={styles.viewBody}>
            <Content>
               <Text>Canchas</Text>
               <View style={styles.viewEquipoUno}>
                  <Input
                     keyboardType="numeric"
                     label={'Número de Cancha'}
                     placeholder=""
                     onChangeText={text =>
                        this.setState({ numeroCancha: text })
                     }
                     value={this.state.numeroCancha}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjNumCancha}
                  />
                  <Input
                     label={'Dirección'}
                     placeholder=""
                     onChangeText={text => this.setState({ direccion: text })}
                     value={this.state.direccion}
                     errorStyle={{ color: 'red' }}
                     errorMessage={this.state.errMsjDirección}
                  />
                  <Button
                     title="GUARDAR"
                     onPress={() => {
                        this.validar();
                     }}
                  />
               </View>
               <FlatList
                  data={this.state.listaCanchas}
                  renderItem={this.renderRowCanchas}
                  keyExtractor={item => item}
               />
            </Content>
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
