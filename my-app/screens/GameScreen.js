import { View, Text, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Title from "../ui/Title";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../ui/PrimaryButton";
import Card from "../ui/Card";
import InstructionText from "../ui/InstructionText";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOverHandler }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOverHandler();
    }
  }, [currentGuess, userNumber, onGameOverHandler]);

  function nextGuessHandler(direction) {
    // direction => "lower", "higher"
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont lie!", "You know that this is wrong...!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(maxBoundary, minBoundary);
    const nwRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(nwRndNumber);
    setGuessRounds((guessRounds) => [...guessRounds, nwRndNumber]);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponents Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View>
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                <Ionicons name="remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("higher")}>
                <Ionicons name="add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Card>
      <View>
        {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))}
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 36,
    gap: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonContainer: {
    flex: 1,
  },
});
