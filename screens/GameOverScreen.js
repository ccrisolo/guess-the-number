import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <BodyText>The Game is Over</BodyText>
            <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/success.png')} 
                style={styles.image} 
            />
            </View>
            <BodyText>Number of Rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150,
    }
})
export default GameOverScreen;