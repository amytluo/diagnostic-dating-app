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
    { id: 1, name: "Fever", uri: require('../assets/Fever.png') },
    { id: 2, name: "Sore Throat",uri: require('../assets/Sore_Throat.png') },
    { id: 3, name: "Muscle Pain",uri: require('../assets/Muscle_Pain.png') },
    { id: 4, name: "Loss of Appetite",uri: require('../assets/Loss_of_apatite.png') },
    { id: 5, name: "Weakness", uri: require('../assets/Weakness.png') },
    { id: 6, name: "Nausea", uri: require('../assets/Nausea.png') },
    { id: 7, name: "Diarrhea", uri: require('../assets/Diarrhea.png') },
    { id: 8, name: "Vomiting", uri: require('../assets/Vomiting.png') },
    { id: 9, name: "Chest Pain", uri: require('../assets/Chest_Pain.png') },
    { id: 10, name: "Shortness of Breath", uri: require('../assets/Shortness_of_breath.png') },
    { id: 11, name: "Uneven Heatbeat", uri: require('../assets/Uneven_Heartbeat.png') },
    { id: 12, name: "Bloody Stool", uri: require('../assets/Bloody_Stool.png') },
    { id: 13, name: "Vomiting Blood", uri: require('../assets/Vomiting_Blood.png') },
    { id: 14, name: "Stomach Pain", uri: require('../assets/Stomach_Pain.png') },
    { id: 15, name: "Headache", uri: require('../assets/Headache.png') },
    { id: 16, name: "Rash", uri: require('../assets/Rash.png') },
    { id: 17, name: "Sneezing", uri: require('../assets/Sneezing.png') },
    { id: 18, name: "Nasal Congestion", uri: require('../assets/Nasal_Congestion.png') },
    { id: 19, name: "Itchy Eyes", uri: require('../assets/Itchy_Eyes.png') },
    { id: 20, name: "Pneumonia", uri: require('../assets/Pneumonia.png') },
    { id: 21, name: "Dry Cough", uri: require('../assets/Dry_Cough.png') },
    { id: 22, name: "Cough up Blood", uri: require('../assets/Cough_up_Blood.png') },
  ]

var Users = []

var updateUsers = () => {
  Users = []
  let indexCurrent = Math.floor(Math.random() * 10);

    for (let i = 0; i < 11; i++) {
    if (indexCurrent == 23) {
      indexCurent = 1;
    }
    Users.push(allPictures[indexCurrent]);
    indexCurrent++;
}}

updateUsers()




export default class App extends React.Component {

  constructor(props) {
    super(props)
    updateUsers()
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
  UNSAFE_componentWillMount() {
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
          fetch("http://diagnostic-dating.herokuapp.com/api/user/" + global.sess_id + "/update_scores/" + Users[this.state.currentIndex].id, {method : 'PUT'}).then()
          if (this.state.currentIndex == 10) {
            this.props.navigation.navigate('Match')
          }
          //backend here
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
          if (this.state.currentIndex == 10) {
            this.props.navigation.navigate('Match')
          }
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
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 200, width: SCREEN_WIDTH, padding: 10, position: 'absolute'}]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 9, height: null, width: null, resizeMode: 'cover' }}
              source={item.uri} />
            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" , opacity: 1, backgroundColor: 'white'}}>

            <Text style={styles.illness}> {item.name}</Text>
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
              height: SCREEN_HEIGHT - 200, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YES</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 9, height: null, width: null, resizeMode: 'cover'}}
              source={item.uri} />
            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", opacity: 1, backgroundColor: 'white' }}>
              <Text style={styles.illness}> {item.name} </Text>
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
            <Text style={styles.title}>|{global.sess_id}| Swipe right if you are experiencing the symptom, swipe left otherwise</Text>
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