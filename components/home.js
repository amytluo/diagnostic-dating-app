import React, { Component } from 'react';
import { Button, View, ImageBackground, StyleSheet, Text} from 'react-native';

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
    state
    constructor(props){
        super(props)
        var sess = ""
        for (let i = 0; i < 10; i++) {
            sess += "" + Math.round(Math.random() * 9);
        }
        global.sess_id = sess
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View>
                <Button title="Start Diagnosis" onPress={() => {
                    
                    fetch("http://diagnostic-dating.herokuapp.com/api/user/create/" + global.sess_id, {
                        method:  'post'
                    })
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