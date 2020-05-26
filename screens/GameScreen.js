import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import { render } from "react-dom";
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
  <BodyText>{value}</BodyText>
</View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1);
    //save past guesses
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.DefaultStyles}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          style={styles.button}
          onPress={nextGuessHandler.bind(this, "greater")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listItem}>
      <ScrollView style={styles.list}>
        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
      </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  button: {
    paddingHorizontal: 10,
  },
  list: {
    width: '80%',
    flex: 1,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection:'row',
    justifyContent:'space-between',
  }
});

export default GameScreen;
