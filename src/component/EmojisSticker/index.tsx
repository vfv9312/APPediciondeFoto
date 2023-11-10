import { View, Image, ImageSourcePropType } from 'react-native';

export default function EmojiSticker({ imageSize, stickerSource }:{imageSize:number, stickerSource:ImageSourcePropType}) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}