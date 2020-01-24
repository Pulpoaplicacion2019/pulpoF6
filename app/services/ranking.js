import { firebase } from '@react-native-firebase/database';

export const cargarRanking = fn => {
   console.log('ingresa a cargar equipos v6');
   const refRankingRoot = firebase.database().ref('ranking/');
   const refRanking = refRankingRoot.child('jugadores/');
   console.log('refPosiciones ', refRanking.path);
   const listaRanking = [];

   refRanking.on('child_added', snap => {
      console.log('agrega equipo ', snap);

      listaRanking.push(snap.val());
      console.log('listaRanking ', listaRanking);

      fn(listaRanking);
   });

   refRanking.on('child_changed', snap => {
      console.log('cambia ' + snap.val());
      let i = buscarT(snap.val().nombre, listaRanking);
      listaRanking[i] = snap.val();
      fn(listaRanking);
   });

   refRanking.on('child_removed', snap => {
      let i = buscarT(snap.val().nombre, listaRanking);
      console.log('posicion ' + i);
      listaRanking.splice(i, 1);
      fn(listaRanking);
   });
};

buscarT = (id, listaRanking) => {
   let posicion = -1;
   let iteracion = 0;
   listaRanking.forEach(element => {
      if (element.nombre == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
