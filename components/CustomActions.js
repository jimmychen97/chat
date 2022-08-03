import PropTypes from 'prop-types';
import React from 'react';
import {
  ActionSheetIOS,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import 'firebase/firestore';
import firebase from 'firebase';

export default class CustomActions extends React.Component {
  // pick an image from photo library
  pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, //images only
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.imageUpload(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    }
  };

  // take a photo using camera app
  takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      }).catch((error) => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.imageUpload(result.uri);
        this.props.onSend({ image: imageUrl });
      }
    }
  };

  // get location
  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});

      if (result) {
        this.props.locationFn(result);
        return result;
      }
    }
    return null;
  };

  //upload images to Firebase & convert to blob
  imageUpload = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  //Action Sheet with options
  onActionPress = () => {
    const options = [
      'Choose from Library',
      'Take Photo',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('User wants to pick an image');
            return this.pickImage();
          case 1:
            console.log('User wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('User wants to get their location');
            return this.getLocation();
          default:
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
