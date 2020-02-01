import { firebase } from '@react-native-firebase/auth';

export const crearUsuario = mail => {
   //crear usuario en el modulo de autenticacion
   let correo = mail.trim();
   firebase
      .auth()
      .createUserWithEmailAndPassword(correo, '123456')
      .then(user => console.log('usuario creado ok'))
      .catch(error => console.log('error'));
};
