import { StatusBar } from 'expo-status-bar';
import { Image, Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import {FontAwesome}  from '@expo/vector-icons';

export default function App() {

  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto,  setCapturedPhoto] = useState(null);
  const [open,  setOpen] = useState(false);

  useEffect(
   async () => {
    const status = await  Camera.requestCameraPermissionsAsync();
     setHasPermission(status.granted === true);
  }, [])

  if(hasPermission === null) {
    return <View/>
  }

  if(hasPermission  === false){
    return <Text>Acesso negado</Text>;
    }

    async function takePicture() {
      if(camRef){
        const photo = await camRef.current.takePictureAsync();
        console.log(photo);
        setCapturedPhoto(photo.uri);
        setOpen(true);
      }
    };

  return (
    <SafeAreaView  style={styles.container}>
      <Camera
      style={styles.camera}
      type={type}
      ref={camRef}
      >
        <StatusBar style="auto" />
        <View style={styles.contentButtons}>
          <TouchableOpacity
          style={styles.buttonFlip}
          onPress={
            ()=>{setType(
              type == Camera.Constants.Type.back ?
                Camera.Constants.Type.front :
                  Camera.Constants.Type.back
            )}
          }
          >
            <FontAwesome name='exchange' size={23} color='red'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCamera}>
            <FontAwesome  name='camera'
            size={23}
            color='#fff'
            onPress={takePicture}
            />
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto &&(
      <Modal
      animationType='slide'
      transparent={true}
      visible={open}
      >
        <View style={styles.contentModal}>
        <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setOpen(false)}
        >
          <FontAwesome  name='remove' size={40} color='white'/>
        </TouchableOpacity>
        <Image source={{ uri: capturedPhoto }} style={styles.imgPhoto}></Image>
    </View>
      </Modal>
  )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera :{
    width: '100%',
    height: '100%'
  },
  contentButtons: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },

  buttonFlip :{
    position: 'absolute',
    bottom: 50,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50
  },
  buttonCamera :{
    position: 'absolute',
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50
  },
  contentModal :{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  },
  imgPhoto :{
    height: '60%',
    width: '90%',
    margin: 20,
    bottom: 25
  },
  closeButton :{
    // position: 'absolute',
    // top: 10,
    // left: 2,
    // margin: 10
  }
});
