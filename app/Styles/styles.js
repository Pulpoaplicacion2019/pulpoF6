import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
          flex: 1,
         // justifyContent: 'center',
          backgroundColor: '#ebebeb'
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
        fontSize: 16,
        color: '#e67e22',
        fontWeight: '600', 
        //alignSelf: 'flex-start',
        //justifyContent: 'flex-end',   
      },
      itemYear: {
        fontWeight: '600',
        fontSize: 12,
        color: '#e67e22',
        //justifyContent: 'flex-end',
        //position:'relative',

      },
      image:{
        height: '100%',
        width: '100%',
       // alignItems:'flex-start',
      // justifyContent: "space-evenly",
        borderRadius: 5,
      },
      iconFav:{
        alignSelf: 'flex-end',
        justifyContent: 'flex-start',
      }
  });

export default styles;