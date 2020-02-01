import { Alert } from 'react-native';

export const eliminarElementos = (mensaje, fn) => {
   Alert.alert(
      'Confirmación',
      mensaje,
      [
         {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
         },
         {
            text: 'Aceptar',
            onPress: () => {
               fn();
            },
         },
      ],
      { cancelable: false }
   );
};
