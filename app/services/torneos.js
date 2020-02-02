import { firebase } from '@react-native-firebase/database';
import { crearPermiso } from './permisos.js';

const torneosEnCurso = [];
const torneosPorIniciar = [];
const torneosIniciados = [];

let itemsRef = null;
export const cargarTorneosEnCurso = repintar => {
   console.log('ingresa a cargar ');
   if (itemsRef == null) {
      itemsRef = firebase.database().ref('torneos');
   }
   itemsRef
      .orderByChild('estado')
      .equalTo('A')
      .on('child_added', snap => {
         torneosEnCurso.push(snap.val());
         repintar(torneosEnCurso);
      });
};
export const cargarTorneosFinalizados = repintar => {
   console.log('ingresa a cargar ');
   if (itemsRef == null) {
      itemsRef = firebase.database().ref('torneos');
   }
   itemsRef
      .orderByChild('estado')
      .equalTo('F')
      .on('child_added', snap => {
         torneosPorIniciar.push(snap.val());
         repintar(torneosPorIniciar);
      });
};
export const cargarTorneosPorIniciar = repintar => {
   console.log('ingresa a cargar ');
   if (itemsRef == null) {
      itemsRef = firebase.database().ref('torneos');
   }
   itemsRef
      .orderByChild('estado')
      .equalTo('C')
      .on('child_added', snap => {
         torneosIniciados.push(snap.val());
         repintar(torneosIniciados);
      });
};

export const recuperarTorneo = fn => {
   var torneoRef = firebase.database().ref('torneos/' + global.idTorneo);
   torneoRef.on('value', snap => {
      fn(snap.val());
   });
};
export const guardarTorneo = torneo => {
   console.log('torneos.js guardarTorneo ingresa');
   const id_torneo = torneo.nombreTorneo + '_' + torneo.anio;
   var itemsRef = firebase
      .database()
      .ref('torneos')
      .child(id_torneo);
   itemsRef.set(torneo);

   crearPermiso(torneo.correoOrganizador, 'torneos', id_torneo);
};

const buscarTorneo = idTorneo => {
   var i = 0;
   var torneosTmp = global.torneos;
   var torneo = null;
   for (i = 0; i < torneosTmp.length; i++) {
      if (torneosTmp[i].id == idTorneo) {
         torneo = torneosTmp[i];
         break;
      }
   }
   return torneo;
};

const buscarPosicionTorneo = idTorneo => {
   var i = 0,
      pos = -1;
   var torneosTmp = global.torneos;
   for (i = 0; i < torneosTmp.length; i++) {
      if (torneosTmp[i].id == idTorneo) {
         pos = i;
      }
   }
   return pos;
};
const reemplazarTorneo = torneo => {
   var posicion = buscarPosicionTorneo(torneo.id);
   if (posicion != -1) {
      global.torneos[posicion] = torneo;
   }
};
