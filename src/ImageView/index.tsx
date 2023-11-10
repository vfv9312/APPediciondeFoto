import {  StyleSheet, ImageSourcePropType, Image  } from 'react-native'
import React from 'react'



function ImageView({ placeholderImageSource,selectedImage }:{placeholderImageSource:ImageSourcePropType, selectedImage:string|null}):React.JSX.Element {
  const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;
  return (
    <Image source={imageSource} style={styles.image} />
  );
  
}

const styles = StyleSheet.create({
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
});

export {ImageView};