import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import ItemRanking from '../components/ItemRanking';
import { cargarRanking } from '../services/ranking.js';
import styles from '../Styles/styles';

export default class Ranking extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listaRanking: [],
      };
   }
   static navigationOptions = {
      drawerLabel: 'Ranking',
      drawerIcon: ({ tintColor }) => {
         let iconName = Platform.select({
            ios: 'ios-podium',
            android: 'md-podium',
         });
         return <Icon name={iconName} type="ionicon" color={tintColor} />;
      },
   };
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
            <View style={styles.containerPerfiles}>
               <FlatList
                  data={this.state.listaRanking}
                  renderItem={({ item }) => <ItemRanking datos={item} />}
                  keyExtractor={item => item}
               />
            </View>
         </ScrollView>
      );
   }
}
