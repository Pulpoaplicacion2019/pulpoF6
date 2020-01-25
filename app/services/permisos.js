import { firebase } from '@react-native-firebase/database';

export const cargarPermisos = (usuario, fn) => {
   console.log('ingresa a cargar equipos v6');
   const refPermisosRoot = firebase
      .database()
      .ref('permisos/')
      .child(usuario);

   console.log('refPermisosRoot ', refPermisosRoot.path);
   const listaPermisos = [];
   let torneos = {};
   let equipos = {};
   let vocalia = {};

   refPermisosRoot.on('child_added', snap => {
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
      listaPermisos.push({
         listaTorneos: torneos,
         listaEquipos: equipos,
         listaVocalia: vocalia,
      });

      console.log('listaPermisos ', listaPermisos);

      fn(listaPermisos);
   });
};
