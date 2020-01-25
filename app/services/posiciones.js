import { firebase } from '@react-native-firebase/database';

export const cargarPosiciones = (categoria, fn) => {
   console.log('ingresa a cargar equipos v6');
   const refPosicionesRoot = firebase.database().ref('tabla/torneos/');
   const refPosiciones = refPosicionesRoot.child(
      global.idTorneo + '/categorias/' + categoria + '/posiciones/'
   );
   console.log('refPosiciones ', refPosiciones.path);
   const listaTabla = [];

   refPosiciones.on('child_added', snap => {
      console.log('agrega equipo ', snap);

      listaTabla.push(snap.val());
      console.log('listaTabla ', listaTabla);

      fn(listaTabla);
   });

   refPosiciones.on('child_changed', snap => {
      console.log('cambia ' + snap.val());
      let i = buscarT(snap.val().nombre, listaTabla);
      listaTabla[i] = snap.val();
      fn(listaTabla);
   });

   refPosiciones.on('child_removed', snap => {
      let i = buscarT(snap.val().nombre, listaTabla);
      console.log('posicion ' + i);
      listaTabla.splice(i, 1);
      fn(listaTabla);
   });
};

buscarT = (id, listaTabla) => {
   let posicion = -1;
   let iteracion = 0;
   listaTabla.forEach(element => {
      if (element.nombre == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
