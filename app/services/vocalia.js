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
   let puntosEqui1Q1 = '';
   let puntosEqui1Q2 = '';
   let puntosEqui1Q3 = '';
   let puntosEqui1Q4 = '';
   let puntosEqui2Q1 = '';
   let puntosEqui2Q2 = '';
   let puntosEqui2Q3 = '';
   let puntosEqui2Q4 = '';
   let puntosEqui1Total = '';
   let puntosEqui2Total = '';
   let partidoO = {};

   refPartidos.on('child_added', snap => {
      console.log('agrega partidos vocalia', snap);
      if (snap.key == 'equipoUno') {
         equipoUno = snap.val();
      }
      if (snap.key == 'equipoDos') {
         equipoDos = snap.val();
      }
      if (snap.key == 'puntosEqui1Q1') {
         puntosEqui1Q1 = snap.val();
      }

      if (snap.key == 'puntosEqui1Q2') {
         puntosEqui1Q2 = snap.val();
      }
      if (snap.key == 'puntosEqui1Q3') {
         puntosEqui1Q3 = snap.val();
      }
      if (snap.key == 'puntosEqui1Q4') {
         puntosEqui1Q4 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q1') {
         puntosEqui2Q1 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q2') {
         puntosEqui2Q2 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q3') {
         puntosEqui2Q3 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q4') {
         puntosEqui2Q4 = snap.val();
      }
      if (snap.key == 'jugadores1') {
         listaJugadores1 = snap.val();
      }
      if (snap.key == 'jugadores2') {
         listaJugadores2 = snap.val();
      }
      if (snap.key == 'puntosEqui1Total') {
         puntosEqui1Total = snap.val();
      }
      if (snap.key == 'puntosEqui2Total') {
         puntosEqui2Total = snap.val();
      }
      // partidoO[snap.key] = snap.val();
      //console.log('listaPartidos vocalia ', partidoO);
      if (equipoUno != '' && equipoDos != '') {
         partidoO = {
            equipoUno: equipoUno,
            equipoDos: equipoDos,
            puntosEqui1Q1: puntosEqui1Q1,
            puntosEqui1Q2: puntosEqui1Q2,
            puntosEqui1Q3: puntosEqui1Q3,
            puntosEqui1Q4: puntosEqui1Q4,
            puntosEqui1Total: puntosEqui1Total,
            puntosEqui2Q1: puntosEqui2Q1,
            puntosEqui2Q2: puntosEqui2Q2,
            puntosEqui2Q3: puntosEqui2Q3,
            puntosEqui2Q4: puntosEqui2Q4,
            puntosEqui2Total: puntosEqui2Total,
            listaJugadores1: listaJugadores1,
            listaJugadores2: listaJugadores2,
         };
      }

      fn(partidoO);
   });

   refPartidos.on('child_changed', snap => {
      console.log('agrega partidos vocalia', snap);
      if (snap.key == 'equipoUno') {
         equipoUno = snap.val();
      }
      if (snap.key == 'equipoDos') {
         equipoDos = snap.val();
      }
      if (snap.key == 'puntosEqui1Q1') {
         puntosEqui1Q1 = snap.val();
      }

      if (snap.key == 'puntosEqui1Q2') {
         puntosEqui1Q2 = snap.val();
      }
      if (snap.key == 'puntosEqui1Q3') {
         puntosEqui1Q3 = snap.val();
      }
      if (snap.key == 'puntosEqui1Q4') {
         puntosEqui1Q4 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q1') {
         puntosEqui2Q1 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q2') {
         puntosEqui2Q2 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q3') {
         puntosEqui2Q3 = snap.val();
      }
      if (snap.key == 'puntosEqui2Q4') {
         puntosEqui2Q4 = snap.val();
      }
      if (snap.key == 'jugadores1') {
         listaJugadores1 = snap.val();
      }
      if (snap.key == 'jugadores2') {
         listaJugadores2 = snap.val();
      }
      if (snap.key == 'puntosEqui1Total') {
         puntosEqui1Total = snap.val();
      }
      if (snap.key == 'puntosEqui2Total') {
         puntosEqui2Total = snap.val();
      }
      // partidoO[snap.key] = snap.val();
      //console.log('listaPartidos vocalia ', partidoO);
      if (equipoUno != '' && equipoDos != '') {
         partidoO = {
            equipoUno: equipoUno,
            equipoDos: equipoDos,
            puntosEqui1Q1: puntosEqui1Q1,
            puntosEqui1Q2: puntosEqui1Q2,
            puntosEqui1Q3: puntosEqui1Q3,
            puntosEqui1Q4: puntosEqui1Q4,
            puntosEqui1Total: puntosEqui1Total,
            puntosEqui2Q1: puntosEqui2Q1,
            puntosEqui2Q2: puntosEqui2Q2,
            puntosEqui2Q3: puntosEqui2Q3,
            puntosEqui2Q4: puntosEqui2Q4,
            puntosEqui2Total: puntosEqui2Total,
            listaJugadores1: listaJugadores1,
            listaJugadores2: listaJugadores2,
         };
      }

      fn(partidoO);
   });
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
export const guardarPuntosTotal = (equipo, puntos) => {
   console.log('ingresa a guardar puntos');

   const itemsRef = firebase.database().ref('calendario/torneos');
   const refPuntos = itemsRef.child(global.ref + '/' + equipo);

   console.log('guardar puntos', refPuntos);
   refPuntos.set(puntos);
};
export const guardarPuntosJugador = (puntosJ, jugadores, ref, equi) => {
   console.log('ingresa a guardar puntos');

   const itemsRef = firebase.database().ref('calendario/torneos');
   const refPuntosJ = itemsRef.child(
      global.ref + '/' + jugadores + '/' + ref + '/' + equi
   );

   console.log('guardar puntos', refPuntosJ);
   refPuntosJ.set(puntosJ);
};
export const guardarEstadoJugador = (estado, jugadores, ref) => {
   console.log('ingresa a guardar puntos');

   const itemsRef = firebase.database().ref('calendario/torneos');
   const refEstadoJ = itemsRef.child(
      global.ref + '/' + jugadores + '/' + ref + '/estado'
   );

   console.log('guardar estado', refEstadoJ);
   refEstadoJ.set(estado);
};
