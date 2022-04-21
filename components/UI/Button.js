import { View, Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

function Button({ children, onPress, mode, styles }) {
  return (
    <View style={styles}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && style.pressed}
      >
        <View style={[style.button, mode === "flat" && style.flat]}>
          <Text style={[style.buttonText, mode === "flat" && style.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});

export default Button;
