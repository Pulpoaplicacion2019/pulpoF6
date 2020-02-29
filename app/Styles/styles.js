import { StyleSheet } from 'react-native';
import * as COLOR from '../constants/colors.js';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ebebeb',
   },
   gridView: {
      marginTop: 20,
      flex: 1,
   },
   itemContainer: {
      padding: 5,
      height: 150,
   },
   itemName: {
      fontSize: 14,
      color: COLOR.COLOR_BLANCO,
      fontWeight: 'bold',
      paddingBottom: 10,
   },
   itemYear: {
      fontWeight: '600',
      fontSize: 12,
      color: COLOR.COLOR_SNOWY_MOUNT,
      paddingLeft: 10,
   },
   image: {
      width: '95%',
      height: 120,
      borderRadius: 10,
   },
   containerItemGrid: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
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
   headerCategoria: {
      backgroundColor: COLOR.COLOR_SECUNDARIO,
      marginTop: 2,
   },
   containerE: {
      flex: 2,
      flexDirection: 'row',
   },
   gridViewE: {
      margin: 20,
      flex: 1,
      width: '50%',
      height: '45%',
   },
   containerPerfiles: {
      flexDirection: 'column',
   },
   itemPerfil: {
      flexDirection: 'row',
      padding: 30,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
   },
   labelBold: {
      color: COLOR.COLOR_SECUNDARIO,
      fontWeight: 'bold',
      paddingLeft: 5,
      fontSize: 18,
   },
   header: {
      flexDirection: 'row',
   },
});

export default styles;
