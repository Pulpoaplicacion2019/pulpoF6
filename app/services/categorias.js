import {firebase} from '@react-native-firebase/database';
export const cargarCategorias=(fn)=>{
   // if(global.listenerCategorias==null){
        //global.listenerCategorias=true;
	console.log("ingresa a cargar categorias");
	const refCategoriasRoot = firebase.database().ref('categorias');
	
     	console.log("refCategoriasRoot "+refCategoriasRoot.path);
	const listaCategorias=[]

    refCategoriasRoot.on('child_added',(snap)=>{
     console.log('agrega equipo ',snap);
    
     listaCategorias.push(snap.val());
        
        fn(listaCategorias);
    });

    refCategoriasRoot.on('child_changed',(snap)=>{
        console.log('cambia '+snap.val().nombre);
        let i = buscar(listaCategorias,snap.val().id);
        listaCategorias[i]=snap.val();
        fn(listaCategorias);
    });

    refCategoriasRoot.on('child_removed',(snap)=>{
        let i = buscar(listaCategorias,snap.val().id);
        console.log('posicion '+i);
        listaCategorias.splice( i, 1 );
       console.log('borrado '+snap.val().id);
       fn(listaCategorias);
   });
  //  }
}

buscar=(listaCategorias,id)=>{
    console.log('buscarCategorias: '+listaCategorias.length);
    let posicion=-1
    let iteracion=0
    listaCategorias.forEach(element => {
        console.log('elementCate: '+element);
        if(element.id==id){
            posicion=iteracion
        }
        iteracion++
    });
    return posicion;
}



	