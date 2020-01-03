import {firebase} from '@react-native-firebase/database';


export const cargarEquipos=(categoria,fn)=>{
	console.log("ingresa a cargar equipos v6");
	const refEquiposRoot = firebase.database().ref('equipos');
	const refEquipos =refEquiposRoot.child(global.idTorneo+'/categorias/'+categoria+'/equipos');
     	console.log("refEquipos "+refEquipos.path);
	const listaEquipos=[]

     refEquipos.on('child_added',(snap)=>{
     console.log('agrega equipo ',snap);
    
        listaEquipos.push(snap.val());
        
        fn(listaEquipos);
    });

    refEquipos.on('child_changed',(snap)=>{
        console.log('cambia '+snap.val().nombre);
        let i = buscar(snap.val().id);
        listaEquipos[i]=snap.val();
        fn(listaEquipos);
    });

    refEquipos.on('child_removed',(snap)=>{
        let i = buscar(snap.val().id);
        console.log('posicion '+i);
        listaEquipos.splice( i, 1 );
       console.log('borrado '+snap.val().id);
       fn(listaEquipos);
   });

}

export const loadTeams =(object,categoria)=>{
	console.log("ingresa a cargar equipos");
   var itemsRef = firebase.database().ref('equipos');
   var rEq =itemsRef.child(global.idTorneo+'/categorias/'+categoria+'/equipos');
	listenForItemsEquipos(rEq,object);

}	
export const saveTeams =(object,lista)=>{
	console.log("ingresa a cargar equipos");
   var itemsRef = firebase.database().ref('equipos');
   var rEq =itemsRef.child(global.idTorneo+'/categorias/'+lista[index]+'/equipos');
	listenForItemsEquipos(rEq,object);

}
 listenForItemsEquipos = (itemsRef,object) => {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          id: child.key,
          nombreEquipo: child._value.nombreEquipo,
          imagenEquipo: child._value.imagenEquipo
        });
      });

      object.setState({
        listaEquip: lista
      });

    });
  }

  
buscar=(id)=>{
  let posicion=-1
  let iteracion=0
  listaPersonas.forEach(element => {
      if(element.id==id){
          posicion=iteracion
      }
      iteracion++
  });
  return posicion;
}

