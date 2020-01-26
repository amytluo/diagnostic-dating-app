import React, { Component } from 'react';
import { Button, View } from 'react-native';


class Home extends Component {

    render() {
        const { navigate } = this.props.navigation
        return (
            <View>
                <ImageBackground
                    source={require('./assets/background.jpg')}
                    style={styles.background}
                >
                </ImageBackground>

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
            </View>
        );
    }

}
export default Home;