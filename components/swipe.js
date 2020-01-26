import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, TouchableHighlight, ImageBackground } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


const styles = StyleSheet.create({
  title: {
    fontFamily: 'monospace',
    color: 'darkslategrey',
    fontWeight: 'bold',
    fontSize: 15,
  },
  illness: {
    fontFamily: 'monospace',
    color: 'darkslategrey',
    fontSize: 20,
  },
  background: {
    width: '100%',
    height: '100%'
  },
}); 

const allPictures = [
    { id: 0, uri: require('../assets/Fever.png') },
    { id: 1, uri: require('../assets/Sore Throat.png') },
    { id: 2, uri: require('../assets/Muscle Pain.png') },
    { id: 3, uri: require('../assets/Loss of apatite.png') },
    { id: 4, uri: require('../assets/Weakness.png') },
    { id: 5, uri: require('../assets/Nausea.png') },
    { id: 6, uri: require('../assets/Diarrhea.png') },
    { id: 7, uri: require('../assets/Vomiting.png') },
    { id: 8, uri: require('../assets/Chest Pain.png') },
    { id: 9, uri: require('../assets/Shortness of breath.png') },
    { id: 10, uri: require('../assets/Uneven Heartbeat.png') },
    { id: 11, uri: require('../assets/Bloody Stool.png') },
    { id: 12, uri: require('../assets/Vomiting Blood.png') },
    { id: 13, uri: require('../assets/Stomach Pain.png') },
    { id: 14, uri: require('../assets/Headache.png') },
    { id: 15, uri: require('../assets/Rash.png') },
    { id: 16, uri: require('../assets/Sneezing.png') },
    { id: 17, uri: require('../assets/Nasal Congestion.png') },
    { id: 18, uri: require('../assets/Itchy Eyes.png') },
    { id: 19, uri: require('../assets/Pneumonia.png') },
    { id: 20, uri: require('../assets/Dry Cough.png') },
    { id: 21, uri: require('../assets/Cough up Blood.png') },
  ]

const Users = [
]

var indexCurrent = Math.floor(Math.random() * 10);
for (var i = 0; i < 11; i++) {
    Users.push(allPictures[indexCurrent]);
    indexCurrent++;
}

export default class App extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH /2 ,0, SCREEN_WIDTH /2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
          // insert backend here
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderUsers = () => {
    return Users.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 4, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />
            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>

            <Text style={styles.illness}>*insert name of illness here*</Text>
          </View>
          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 4, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />
            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
              <Text style={styles.illness}>*insert name of illness here*</Text>
            </View>
          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    /*
    const shadowBottomBarStyle = {
      shadowColour: 'black',
      shadowOffset: { height: -1 },
      shadowRadius: 2,
      shadowOpacity: 0.8
    }
    */

    return (

      <View style={{ flex: 1 }}>
        
      <View style={{ height: 60 }}>
        
        </View>
          <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <Text style={styles.title}>Swipe right if you are experiencing the symptom, swipe left otherwise</Text>
          </View>

          <View style={{ flex: 10 }}>
            {this.renderUsers()}
          </View>
        <View style={{ height: 0 }}>

        </View>


      </View>

    );
  }
}

/*<ImageBackground
        source={require('./assets/background.jpg')}
        style = {styles.background}
        >
      </ImageBackground>
 */