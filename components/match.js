import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, SafeAreaView, ScrollView, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

class match extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Image style={{ height: SCREEN_HEIGHT - 100, width: SCREEN_WIDTH, padding: 20, resizeMode: 'cover', borderRadius: 0 }}
                        source={require('@expo/snack-static/react-native-logo.png')} />
                    <Text style={styles.text}>{"\n"}This is the illness{"\n"}</Text>
                    <Text style={styles.title}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Lorem dolor sed viverra ipsum. Scelerisque viverra mauris in aliquam. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Mauris a diam maecenas sed enim ut sem. Risus in hendrerit gravida rutrum. Auctor eu augue ut lectus arcu bibendum at. Arcu ac tortor dignissim convallis aenean et tortor at risus. Nisi vitae suscipit tellus mauris a diam. {"\n"}{"\n"}

                        Morbi enim nunc faucibus a. In hac habitasse platea dictumst quisque. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Sapien eget mi proin sed. Diam donec adipiscing tristique risus nec feugiat in fermentum. Netus et malesuada fames ac turpis egestas. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Urna nunc id cursus metus. Massa enim nec dui nunc mattis enim. Nisi est sit amet facilisis magna etiam. Adipiscing bibendum est ultricies integer quis auctor elit. Et netus et malesuada fames ac turpis egestas. Amet tellus cras adipiscing enim eu turpis egestas pretium. Vestibulum sed arcu non odio euismod. Tincidunt lobortis feugiat vivamus at augue eget arcu. Facilisis magna etiam tempor orci. Ullamcorper velit sed ullamcorper morbi. Enim facilisis gravida neque convallis a cras semper. Felis eget velit aliquet sagittis id consectetur purus ut. {"\n"}{"\n"}

                        Mauris vitae ultricies leo integer malesuada nunc vel risus. Euismod quis viverra nibh cras pulvinar mattis nunc. Habitasse platea dictumst quisque sagittis. Leo integer malesuada nunc vel risus. Id aliquet lectus proin nibh nisl condimentum. Euismod quis viverra nibh cras pulvinar. Ut sem nulla pharetra diam sit. Mattis nunc sed blandit libero volutpat sed cras ornare. Dictum sit amet justo donec enim diam vulputate ut. Sit amet nisl purus in mollis nunc sed. Vel pretium lectus quam id leo in vitae. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Amet aliquam id diam maecenas ultricies mi eget mauris. Amet risus nullam eget felis eget nunc lobortis mattis aliquam. Sit amet cursus sit amet dictum sit. Massa eget egestas purus viverra accumsan. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis.{"\n"}{"\n"}

                        Vel orci porta non pulvinar neque. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Velit euismod in pellentesque massa. Lectus sit amet est placerat. Aliquam ut porttitor leo a. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Sed sed risus pretium quam vulputate dignissim suspendisse in est. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Maecenas volutpat blandit aliquam etiam. Ornare lectus sit amet est placerat in egestas erat.{"\n"}{"\n"}

                        At urna condimentum mattis pellentesque id nibh tortor. Nulla at volutpat diam ut. Nibh venenatis cras sed felis eget. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Mattis rhoncus urna neque viverra justo nec ultrices dui. Erat nam at lectus urna. Nunc faucibus a pellentesque sit amet porttitor eget. Ultrices sagittis orci a scelerisque purus semper. Etiam non quam lacus suspendisse faucibus interdum posuere. Porta lorem mollis aliquam ut porttitor. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam.{"\n"}
                    </Text>
                    // this button return the thing to home
                    <Button
                        title="RETURN TO HOME"
                        color='blue'
                    // onPress={() => navigate('home')}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

