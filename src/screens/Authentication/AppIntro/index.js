import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { APPINTRO1, APPINTRO2, APPINTRO3, APPINTRO4, APPINTRO5 } from '../../../../assets';
const slides = [
  {
    key: 1,
    title: "Harkie's here!",
    text: 'A helping hand to take you from abyss\n to bliss',
    image: APPINTRO1,
    statusbarColor: "#62D0F5"
  },
  {
    key: 2,
    title: 'Open Up Anonymously',
    text: 'Post as anonymous \nLet those feelings flow out ',
    image: APPINTRO2,
    statusbarColor: "#FF8C6F"
  },
  {
    key: 3,
    title: 'Quality Viewing',
    text: 'Find solace in some amazing\nvideo content',
    image: APPINTRO3,
    statusbarColor: "#FFB76E"
  },
  {
    key: 4,
    title: 'Attend Live Sessions',
    text: 'Get insights from some\namazing people talking sense',
    image: APPINTRO4,
    statusbarColor: "#62D0F5"
  },
  {
    key: 5,
    title: 'Personal Care',
    text: 'Talk to oue experts in person.\nGet answers and advices',
    image: APPINTRO5,
    statusbarColor: "#FFB76E"
  },
];

export default class AppIntro extends Component {
  state = {
    showRealApp: false
  }
  renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.pageimage} source={item.image}>
          <View style={{ display: "flex", flex: 1, justifyContent: "center", paddingTop: 200, paddingLeft: 20 }}>
            <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>{item.title}</Text>
            <Text></Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{item.text}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
  onDone = () => {
    this.props.navigation.navigate('Login');
  }
  render() {
    if (this.state.showRealApp) {
      return <AppIntro />;
    } else {
      return <AppIntroSlider renderItem={this.renderItem} data={slides} onDone={this.onDone} showSkipButton />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageimage: {
    flex: 1,
  },
  imageview: {
    flex: 1,
  },
  text: {
    display: 'flex',
    color: '#680A0A',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center'
  }
});