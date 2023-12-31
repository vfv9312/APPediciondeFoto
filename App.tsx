import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { ImageSourcePropType, StyleSheet, Text, View, ViewProps } from 'react-native';
import React, { useRef, useState } from 'react';
import {ImageView} from './src/ImageView';
import Button from './src/component/Button';
import IconButton from './src/component/ButtonIcon';
import CircleButton from './src/component/ButtonCirculo';
import ModalEmoji from "./src/component/ModalEmoji";
import EmojiList from './src/component/EmojisList';
import EmojiSticker from './src/component/EmojisSticker';
import { captureRef } from 'react-native-view-shot';


SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);




const PlaceholderImage:ImageSourcePropType  = require('./src/assets/background-image.jpg');// imagen
//<StatusBar style="auto" /> hace que se ponga ensima de las notificaciones En React Native, el componente StatusBar se utiliza para controlar la apariencia de la barra de estado en la parte superior de la pantalla en dispositivos móviles. La barra de estado suele mostrar información como la hora, el estado de la batería y la conectividad de red. Aquí hay un resumen básico de cómo puedes usar StatusBar en una aplicación React Native:

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string|null>(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View|null>(null);



  if (status === null) {
    requestPermission();
  }

  const onReset = () => {//el boton de rest va dar el estado false
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert('No has seleccionado una imagen.');
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
     
            <View style={styles.imageContainer}>
            <View ref={imageRef} collapsable={false}>
        <ImageView placeholderImageSource ={PlaceholderImage}
        selectedImage={selectedImage}
        />
        {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>
      {showAppOptions ? (
                <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                  <IconButton icon="refresh" label="Reset" onPress={onReset} />
                  <CircleButton onPress={onAddSticker} />
                  <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                </View>
              </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Elige tu foto" onPress={pickImageAsync} />
          <Button theme='prumary' label="Usa esta foto"  onPress={() => setShowAppOptions(true)} />
        </View>
      )}
     <ModalEmoji isVisible={isModalVisible} onClose={onModalClose}>
     <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
     </ModalEmoji>
      <StatusBar style="light" />
      
    </GestureHandlerRootView >
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    color:'#fff',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
