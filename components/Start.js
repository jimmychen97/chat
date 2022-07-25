import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import BackgroundImage from '../assets/background-image.png';

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    black: '#090C08',
    purple: '#474056',
    grey: '#8A95A5',
    green: '#1DA01B',
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.appTitle}>
            <Text style={styles.title}>Chat</Text>
          </View>
          <View style={styles.contentBox}>
            <View style={styles.inputBox}>
              <TextInput
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColorText}>
                {' '}
                Choose Background Color:{' '}
              </Text>
            </View>

            <View style={styles.colorArray}>
              <TouchableOpacity
                style={styles.color1}
                onPress={() => this.changeBgColor(this.colors.black)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.purple)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.grey)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.green)}
              ></TouchableOpacity>
            </View>

            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  appTitle: {
    height: '40%',
    width: '88%',
    alignItems: 'center',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  contentBox: {
    backgroundColor: '#FFFFFF',
    height: '46%',
    width: '88%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 1,
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: 'grey',
    width: '88%',
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  colorBox: {
    marginRight: 'auto',
    paddingLeft: 15,
    width: '88%',
  },

  chooseColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },

  colorArray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  color1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  button: {
    width: '88%',
    height: 70,
    borderRadius: 8,
    backgroundColor: '#1D6085',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#757083',
  },

  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
