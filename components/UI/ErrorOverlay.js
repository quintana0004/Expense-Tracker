import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";
import Button from "./Button";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={style.container}>
      <Text style={[style.text, style.title]}>An error occured!</Text>
      <Text style={style.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default ErrorOverlay;
