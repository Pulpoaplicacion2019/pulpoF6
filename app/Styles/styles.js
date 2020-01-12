import { StyleSheet } from 'react-native';
import * as COLOR from '../constants/colors.js';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // justifyContent: 'center',
      backgroundColor: '#ebebeb',
   },

   gridView: {
      marginTop: 20,
      flex: 1,
   },
   itemContainer: {
      // justifyContent: 'center',
      padding: 5,
      height: 150,
   },
   itemName: {
      fontSize: 14,
      color: COLOR.COLOR_BLANCO,
      fontWeight: 'bold',
      //alignSelf: 'flex-start',
      //justifyContent: 'flex-end',
      paddingBottom: 10,
   },
   itemYear: {
      fontWeight: '600',
      fontSize: 12,
      color: COLOR.COLOR_SNOWY_MOUNT,
      paddingLeft: 10,
   },
   image: {
      width: 120,
      height: 120,
      borderRadius: 10,
   },

   containerItemGrid: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10,
      backgroundColor: COLOR.COLOR_CHRISTMAS_RED,
   },
   containerItemColumGrid: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 1,
      paddingRight: 1,
      backgroundColor: COLOR.COLOR_SECUNDARIO,
   },
});

export default styles;
