import react from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

function Input({ label, invalid, styles, textInputConfig }) {
  const inputStyles = [style.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(style.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(style.invalidInput);
  }

  return (
    <View style={[style.inputContainer, styles]}>
      <Text style={[style.lable, invalid && style.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const style = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  lable: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

export default Input;
