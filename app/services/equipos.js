import { firebase } from '@react-native-firebase/database';

export const cargarEquipos = (categoria, fn) => {
   console.log('ingresa a cargar equipos v6');
   const refEquiposRoot = firebase.database().ref('equipos');
   const refEquipos = refEquiposRoot.child(
      global.idTorneo + '/categorias/' + categoria + '/equipos/'
   );
   console.log('refEquipos ', refEquipos.path);
   const listaEquipos = [];

   refEquipos.on('child_added', snap => {
      console.log('agrega equipo ', snap);

      listaEquipos.push(snap.val());
      console.log('listaEquipos ', listaEquipos);

      fn(listaEquipos);
   });

   refEquipos.on('child_changed', snap => {
      console.log('cambia ' + snap.val().nombre);
      let i = buscar(listaEquipos,snap.val().id);
      listaEquipos[i] = snap.val();
      fn(listaEquipos);
   });

   refEquipos.on('child_removed', snap => {
      let i = buscar(listaEquipos,snap.val().id);
      console.log('posicion ' + i);
      listaEquipos.splice(i, 1);
      console.log('borrado ' + snap.val().id);
      fn(listaEquipos);
   });
};
export const guardarEquipos =(categoria,equipo)=>{
	console.log("ingresa a guardar equipos");
   var refEquiposRoot = firebase.database().ref('equipos');
   var refEquipo =refEquiposRoot.child(global.idTorneo+'/categorias/'+categoria+'/equipos/'+equipo.id);
   refEquipo.set(equipo);

}
export const recuperarEquipo =(equipo,fn)=>{
  console.log("ingresa a cargar equipo");
  var refEquiposRoot = firebase.database().ref('equipos');
  var refEquipo =refEquiposRoot.child(global.idTorneo+'/categorias/'+equipo.categoria+'/equipos/'+equipo.id);
	refEquipo.on('value', (snap) => {
		fn(snap.val());
	});
}

buscar=(listaEquipos,id)=>{
  let posicion=-1
  let iteracion=0
  listaEquipos.forEach(element => {
      if(element.id==id){
          posicion=iteracion
      }
      iteracion++
  });
  return posicion;
};
