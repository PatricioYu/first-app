import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, TouchableOpacity ,Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import logo from './assets/logo.png';

export default function App() {
  // states
  const [selectedImage, setSelectedImage] = React.useState(null);
  
  // ImagePicker
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false) {
      alert('Permission to access camera roll is required');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if(pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri});
  };

  // shareDialog function
  let openShareDialogAsync = async () => {
    if(Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  // Button Component
  
  const Button = (props) => {
    return(
      <TouchableOpacity
        onPress={props.press}
        style={styles.button}>
        <Text style={styles.buttonText}>{props.content}</Text>
      </TouchableOpacity>
    )
  };
  

  // showing image picked
  if(selectedImage !== null) {
    return(
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Button press={openShareDialogAsync} content={'share'}/>
      </View>
    );
  }

  // menu
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the bottom below!</Text>
      <Button press={openImagePickerAsync} content={'Pick a photo'}/>    
      <StatusBar style="auto" />
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 320,
    height: 320,
    marginBottom: 10,
  },
  instructions: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 15,
  },
  thumbnail: {
    width: 300,
    height: 300,
    marginBottom: 10,
    resizeMode: "contain",
  },
});