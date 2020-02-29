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
      let i = buscar(listaJugadores, snap.val().cedula, snap.val().numero);
      listaJugadores[i.posicion] = snap.val();
      fn(listaJugadores);
   });

   refJugador.on('child_removed', snap => {
      let i = buscar(listaJugadores, snap.val().cedula, snap.val().numero);
      listaJugadores.splice(i.posicion, 1);
      fn(listaJugadores);
   });
};
export const guardarJugador = (equipo, jugador) => {
   console.log('ingresa a guardar equipos');
   var refJugadoresRoot = firebase.database().ref('equipos');
   var refJugador = refJugadoresRoot.child(
      global.idTorneo +
         '/categorias/' +
         equipo.categoria +
         '/equipos/' +
         equipo.id +
         '/jugadores/' +
         jugador.cedula
   );
   refJugador.set(jugador);
};
export const recuperarJugador = (jugador, fn) => {
   var refJugadoresRoot = firebase.database().ref('equipos');
   var refJugador = refJugadoresRoot.child(
      global.idTorneo +
         '/categorias/' +
         jugador.categoria +
         '/equipos/' +
         jugador.equipo +
         '/jugadores/' +
         jugador.cedula
   );
   refJugador.on('value', snap => {
      fn(snap.val());
   });
};
export const eliminarJugador = jugador => {
   console.log('ingresa a eliminar partidos v6');
   const refJugadoresRoot = firebase.database().ref('equipos');
   var refJugador = refJugadoresRoot
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
export const buscar = (listaJugadores, id, numero) => {
   let posicion = -1;
   let iteracion = 0;
   let numeroJugador = 0;
   let infoJugador = { posicion: posicion, numero: numeroJugador };
   listaJugadores.forEach(element => {
      if (element.cedula == id) {
         posicion = iteracion;
      }
      if (element.numero == numero) {
         numeroJugador = element.numero;
      }
      infoJugador = {
         posicion: posicion,
         numero: numeroJugador,
      };
      iteracion++;
   });
   return infoJugador;
};
