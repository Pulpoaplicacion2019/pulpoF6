import { firebase } from '@react-native-firebase/database';
export const cargarPartidos = (categoria, fecha, partido, fn) => {
   console.log('ingresa a cargar partidos vocalia v6');
   const refPartidosRoot = firebase.database().ref('calendario/torneos');
   global.ref =
      'Delgado_2019/categorias/Masculino/Fecha1/partidos/Cobis_Ballenita';

   const refPartidos = refPartidosRoot.child(
      'Delgado_2019' +
         '/categorias/' +
         categoria +
         '/' +
         fecha +
         '/partidos/' +
         partido
   );
   console.log('refPartidos ' + refPartidos.path);

   console.log('refPartidos ' + global.ref);
   let listaJugadores1 = [];
   let listaJugadores2 = [];
   let lista = [];
   let equipoUno = '';
   let equipoDos = '';
   let puntos1 = '';
   let puntos2 = '';
   let partidoO = {};

   refPartidos.on('child_added', snap => {
      console.log('agrega partidos vocalia', snap);
      if (snap.key == 'equipoUno') {
         equipoUno = snap.val();
      }
      if (snap.key == 'equipoDos') {
         equipoDos = snap.val();
      }
      if (snap.key == 'puntosEquiUno') {
         puntos1 = snap.val();
      }
      if (snap.key == 'puntosEquiDos') {
         puntos2 = snap.val();
      }
      if (snap.key == 'jugadores1') {
         listaJugadores1 = snap.val();
      }
      if (snap.key == 'jugadores2') {
         listaJugadores2 = snap.val();
      }
      // partidoO[snap.key] = snap.val();
      //console.log('listaPartidos vocalia ', partidoO);
      if (
         equipoUno != '' &&
         equipoDos != '' &&
         puntos1 != '' &&
         puntos2 != ''
      ) {
         partidoO = {
            equipoUno: equipoUno,
            equipoDos: equipoDos,
            puntos1: puntos1,
            puntos2: puntos2,
            listaJugadores1: listaJugadores1,
            listaJugadores2: listaJugadores2,
         };
      }

      fn(partidoO);
   });

   /* refPartidos.on('child_changed', snap => {
      console.log('child_changed ');
      let i = buscarP(listaPartidos, snap.val().id);
      listaPartidos[i] = snap.val();
      fn(listaPartidos);
   });

   refPartidos.on('child_removed', snap => {
      let i = buscarP(listaPartidos, snap.val().id);
      console.log('posicion ' + i);
      listaPartidos.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(listaPartidos);
   });*/
};

buscarP = (listaPartidos, id) => {
   let posicion = -1;
   let iteracion = 0;
   listaPartidos.forEach(element => {
      if (element.id == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
export const guardarPuntos = (equipo, puntos) => {
   console.log('ingresa a guardar puntos');

   const itemsRef = firebase.database().ref('calendario/torneos');
   const refPuntos = itemsRef.child(global.ref + '/' + equipo);

   console.log('guardar puntos', refPuntos);
   refPuntos.set(puntos);
};
export const guardarPuntosJugador = (puntosJ, jugadores, ref) => {
   console.log('ingresa a guardar puntos');

   const itemsRef = firebase.database().ref('calendario/torneos');
   const refPuntosJ = itemsRef.child(
      global.ref + '/' + jugadores + '/' + ref + '/puntos'
   );

   console.log('guardar puntos', refPuntosJ);
   refPuntosJ.set(puntosJ);
};
