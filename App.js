/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
    Button,
  Image,
  Text,
  StatusBar,
    Animated
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from 'react-native-image-crop-picker';
import LogBoxButton from "react-native/Libraries/LogBox/UI/LogBoxButton";

class App extends Component{

  state = {
    croppedImage: null,
    hasImage: false
  };

  cropImage = ()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo",
      includeBase64: true
    }).then(imageData => {

      this.setState({croppedImage: imageData, hasImage: true})
    });
  }

  save = ()=>{
    CameraRoll.save(this.state.croppedImage.path, 'auto');
    this.setState({hasImage: false, croppedImage: null})
  }

  render() {
    return (
        <>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Select Image</Text>
                <Text style={styles.sectionDescription}>
                  Upload image to crop.
                </Text>
              </View>

              <Button title="CROP" color={"blue"} onPress={()=>{this.cropImage()}}/>
              {this.state.hasImage &&
              <>
                <Image style={{height: 200, width: 200}}
                       source={{uri: `data:${this.state.croppedImage.mime};base64,${this.state.croppedImage.data}`}} />
              <Text>SIZE : {this.state.croppedImage.size} bytes</Text>
              <Text>HEIGHT : {this.state.croppedImage.height}</Text>
              <Text>WIDTH : {this.state.croppedImage.width}</Text>
              </>
              }
              <Button disabled={!this.state.hasImage} title="SAVE" color={"blue"} onPress={()=>{this.save()}}/>
            </ScrollView>
          </SafeAreaView>
        </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  }
});

export default App;
