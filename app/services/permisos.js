import { firebase } from '@react-native-firebase/database';
import { crearUsuario } from './autenticacion.js';

export const cargarPermisos = (usuario, fn) => {
   const refPermisosRoot = firebase
      .database()
      .ref('permisos/')
      .child(usuario);

   let torneos = '';
   let equipos = '';
   let vocalia = '';
   let perfiles = '';

   refPermisosRoot.on('child_added', snap => {
      let listaPermisos = [];
      console.log('agrega equipo ', snap);
      if (snap.key == 'torneos') {
         torneos = Object.values(snap.val());
      }
      if (snap.key == 'equipos') {
         equipos = Object.values(snap.val());
      }
      if (snap.key == 'vocalia') {
         vocalia = Object.values(snap.val());
      }
      if (snap.key == 'perfiles') {
         perfiles = Object.values(snap.val());
      }

      listaPermisos.push({
         listaTorneos: torneos,
         listaEquipos: equipos,
         listaVocalia: vocalia,
         listaPerfiles: perfiles,
      });

      fn(listaPermisos);
   });
};

//abc@gmail.com,torneos,abc
export const crearPermiso = (correo, nodo, id) => {
   crearUsuario(correo);

   let nodoCorreo = correo
      .replace(/\./g, '')
      .trim()
      .toLowerCase();
   const itemsRef = firebase.database().ref('permisos');
   const refPermisos = itemsRef.child(nodoCorreo + '/' + nodo + '/' + id);
   refPermisos.set(id);
};

export const buscarPermiso = (lista, id) => {
   let posicion = -1;
   let iteracion = 0;
   if (lista) {
      lista.forEach(element => {
         if (element == id) {
            posicion = iteracion;
         }
         iteracion++;
      });
   }
   return posicion;
};
