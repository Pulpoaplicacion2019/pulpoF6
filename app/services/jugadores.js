import { firebase } from '@react-native-firebase/database';

export const cargarJugadores = (equipo, fn) => {
   console.log('ingresa a cargar equipo');
   var refJugadoresRoot = firebase.database().ref('equipos');
   var refJugador = refJugadoresRoot.child(
      global.idTorneo +
         '/categorias/' +
         equipo.categoria +
         '/equipos/' +
         equipo.id +
         '/jugadores'
   );
   const listaJugadores = [];

   refJugador.on('child_added', snap => {
      listaJugadores.push(snap.val());
      fn(listaJugadores);
   });

   refJugador.on('child_changed', snap => {
      let i = buscar(listaJugadores, snap.val().cedula);
      listaJugadores[i] = snap.val();
      fn(listaJugadores);
   });

   refJugador.on('child_removed', snap => {
      let i = buscar(listaJugadores, snap.val().cedula);
      listaJugadores.splice(i, 1);
      fn(listaJugadores);
   });
};
export const guardarJugador = (equipo, jugador) => {
   console.log('ingresa a guardar equipos');
   var refEquiposRoot = firebase.database().ref('equipos');
   var refEquipo = refEquiposRoot.child(
      global.idTorneo +
         '/categorias/' +
         equipo.categoria +
         '/equipos/' +
         equipo.id +
         '/jugadores/' +
         jugador.cedula
   );
   refEquipo.set(jugador);
};
export const recuperarJugador = (jugador, fn) => {
   var refEquiposRoot = firebase.database().ref('equipos');
   var refEquipo = refEquiposRoot.child(
      global.idTorneo +
         '/categorias/' +
         jugador.categoria +
         '/equipos/' +
         jugador.equipo +
         '/jugadores/' +
         jugador.cedula
   );
   refEquipo.on('value', snap => {
      fn(snap.val());
   });
};
export const eliminarJugador = jugador => {
   console.log('ingresa a eliminar partidos v6');
   const refEquiposRoot = firebase.database().ref('equipos');
   var refEquipo = refEquiposRoot
      .child(
         global.idTorneo +
            '/categorias/' +
            jugador.categoria +
            '/equipos/' +
            jugador.equipo +
            '/jugadores/' +
            jugador.cedula
      )
      .remove(() => {
         console.log('Operation Complete');
      });
};
buscar = (listaJugadores, id) => {
   let posicion = -1;
   let iteracion = 0;
   listaJugadores.forEach(element => {
      if (element.cedula == id) {
         posicion = iteracion;
      }
      iteracion++;
   });
   return posicion;
};
