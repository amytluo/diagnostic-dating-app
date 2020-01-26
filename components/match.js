import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, SafeAreaView, ScrollView, Button, ImageBackground } from 'react-native';
import Constants from 'expo-constants';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width



/*
const MainNavigator = createStackNavigator({
    Match: { screen: match }
});

const Thingy = createAppContainer(MainNavigator);
export default Thingy;*/

const styles = StyleSheet.create({
    text: {
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
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
    }
});

async function fetchAsync(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
  }

class match extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {topDiseases : "aaaaaaaaa"}
        
    }

    componentDidMount(){
        fetchAsync("http://diagnostic-dating.herokuapp.com/api/top_diseases/" + global.sess_id + "/3").then((data)=>{
           this.setState({topDiseases : data})
        })
    }

    render() {
        
        return (
            <SafeAreaView style={styles.container}>
                
                <ScrollView style={styles.scrollView}>
                    <Image style = {{height: SCREEN_HEIGHT - 400, width: SCREEN_WIDTH - 40, padding: 20, resizeMode: 'cover', borderRadius: 10}}
                        source = {{uri : this.state.topDiseases[0].pic_url}}/>
                    <Text style={styles.text}>{"\n"}{this.state.topDiseases[0].disease}{"\n"}</Text>
                    <Text style={styles.title}>
                        {this.state.topDiseases[0].bio}
                        {"\n"}{"\n"}

                        {this.state.topDiseases[0].contagious ? "Contagious" : "Not Contagious"}
                        {"\n"}{"\n"}

                        Lethality : {this.state.topDiseases[0].lethality}
                        {"\n"}{"\n"}

                        Disease Class: {this.state.topDiseases[0].disease_class}
                        {"\n"}{"\n"}
                    </Text>

                    <Button
                        title="RETURN TO HOME"
                        color='blue'
                        onPress={() => this.props.navigation.navigate('Home')}
                    />

                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default match;

