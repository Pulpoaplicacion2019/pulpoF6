import { StyleSheet, View, Text,TouchableOpacity,Image,FlatList,AsyncStorage,Dimensions,cScrollView } from "react-native";
import {firebase} from '@react-native-firebase/storage';
import  ImagePicker  from 'react-native-image-picker' ;
import ImageResizer from 'react-native-image-resizer';

import React, { Component,Alert } from "react";
const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  export default class CargarImagen extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgSource: '',
            url:'',
            nuevaImagen:true
        };
      };
 
 resize=()=> {
    ImageResizer.createResizedImage(this.state.imgSource.uri, 400, 400, 'JPEG', 100)
      .then(({uri}) => {
		  console.log("redimensionada");
        this.setState({
          resizedImageUri: uri,
		  imgSource:{uri:uri}
        });
		this.uploadImage();
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to resize the photo',
          'Check the console for full the error message',
        );
      });
  }
  
  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        alert('Has cancelado el selector de imágenes😟');
      } else if (response.error) {
        alert('A ocurrido un error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imgSource: source,
          imageUri: response.uri,
          nuevaImagen:false
        });
      }
    });
  };
  cancelar=()=>{
    this.props.navigation.goBack();
  }
  uploadImage = () => {
	  console.log("subiendo imagen");
    this.setState({nuevaImagen:true})
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename =new Date().getTime(); // Generate unique name
    this.setState({ uploading: true });
    let url=this.props.navigation.state.params.url;
    let fn=this.props.navigation.state.params.fn;
	
    firebase.storage().ref(url+'/'+filename).putFile(this.state.resizedImageUri).on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              url:snapshot.downloadURL, 
            };
			console.log('url ',snapshot);
            this.props.navigation.goBack();
			let ubicacion=firebase.storage().refFromURL('gs://pulpoapp2019-36a53.appspot.com/'+url+'/'+filename)
			console.log('ref retrieved ',ubicacion);
			ubicacion.getDownloadURL().then(data=>{
				let downloadURL=data;
				console.log('URL ',downloadURL);
				fn(downloadURL);
			}).catch(error => {
                console.log('ERROR',error);
            })
            
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );

  };
  componentDidMount() {
  let imagenActual=this.props.navigation.state.params.imagenActual;
  this.setState({imgSource:imagenActual})
}
  render(){
    const { uploading,  progress,nuevaImagen } = this.state
      return(
        <View >
          
        {/** Select Image button */}
        <TouchableOpacity style={styles.btn} onPress={this.pickImage}>
          <View>
            <Text style={styles.btnTxt}>Seleccione Imagen</Text>
          </View>
        </TouchableOpacity>
        {/** Display selected image */}
        {this.state.imgSource ? (
          <Image
            source={this.state.imgSource}
            style={styles.image}
          />
        ) : (
          <Text>Seleccione una imagen!</Text>
        )}
		{uploading && (
                  <View
                    style={[styles.progressBar, { width:progress }]}
                  />
                )}
      <TouchableOpacity style={nuevaImagen? styles.disabledBtn:styles.btn}   disabled= {nuevaImagen} onPress={this.resize}>
          <View>
            <Text style={styles.btnTxt}>Guardar</Text>
          </View>
        </TouchableOpacity>
		
        <TouchableOpacity style={nuevaImagen? styles.disabledBtn:styles.btn}   disabled= {nuevaImagen} onPress={this.cancelar}>
          <View>
            <Text style={styles.btnTxt}>Cancelar</Text>
          </View>
        </TouchableOpacity>
      
        </View>
      )
  }

  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      marginTop: 20,
      paddingLeft: 5,
      paddingRight: 5
    },
  
    btn: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 20,
      backgroundColor: 'rgb(3, 154, 229)',
      marginTop: 20,
     alignItems: 'center'
    },

    disabledBtn: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 20,
      backgroundColor: 'rgb(3, 154, 229)',
      marginTop: 20,
      alignItems: 'center',
      opacity:0.5
    },
   
    btnTxt: {
      color: '#fff'
    },
    image: {
      minWidth:200,
      height:200,
      resizeMode: 'contain'
    },
  
    img: {
      flex: 1,
      height: 100,
      margin: 5,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: '#eee',
      backgroundColor: '#ccc'
    },
    progressBar: {
      backgroundColor: 'rgb(3, 154, 229)',
      height: 5,
      shadowColor: '#000',
    },
	
  });
  
  