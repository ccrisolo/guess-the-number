import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import BodyText from "../components/BodyText";

import Colors from "../constants/colors";
import MainButton from '../components/MainButton';


const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <BodyText style={styles.titleText}>The Game is Over</BodyText>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/success.png')}
          fadeDuration={3000}
          source={{
            uri:
              "https://www.planetware.com/photos-large/JPN/japan-mt-fuji-and-cherry-blossoms.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          get the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>

      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: "black",
    overflow: "hidden",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  resultContainer: {
    marginHorizontal: 30,
    padding: 20,
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20
  },
  highlight: {
    color: Colors.primary,
  },
  titleText: {
      padding: 30,
      fontSize: 20,
  },
});
export default GameOverScreen;
