import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   ScrollView,
   Button,
   Alert,
} from 'react-native';
import ItemRanking from '../components/ItemRanking';
import { cargarRanking } from '../services/ranking.js';

export default class Ranking extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listaRanking: [],
      };
   }
   componentDidMount() {
      cargarRanking(listaRanking => {
         this.setState({
            listaRanking: listaRanking,
         });
         console.log('ranking', this.state.listaRanking);
      });
   }

   render() {
      return (
         <ScrollView>
            <View style={styles.container}>
               <FlatList
                  data={this.state.listaRanking}
                  //ItemSeparatorComponent={this.separador}
                  renderItem={({ item }) => <ItemRanking datos={item} />}
                  keyExtractor={item => item}
               />
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
});
