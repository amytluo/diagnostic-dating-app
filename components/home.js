import React, { Component } from 'react';
import { Button, View, ImageBackground, StyleSheet} from 'react-native';

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

class Home extends Component {

    render() {
        const { navigate } = this.props.navigation
        return (
            <View>
                <Button title="Start Diagnosis" onPress={() => {
                    let sess_id = "";
                    for (let i = 0; i < 10; i++) {
                        sess_id += Math.round(Math.random() * 9);
                    }
                    /*fetch(ROOT + "/api/user/create/" + sess_id){
                        method:  'POST'
                    }*/
                    this.props.navigation.navigate('Swipe')
                }}></Button>
                <ImageBackground
                    source={require('../assets/background.jpg')}
                    style={styles.background}
                >
                </ImageBackground>

                
            </View>
        );
    }

}
export default Home;