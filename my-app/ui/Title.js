import { Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fonstSize: 24,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "center",
    borderWidth: 2,
    borderColor: colors.title,
    padding: 12,
  },
});