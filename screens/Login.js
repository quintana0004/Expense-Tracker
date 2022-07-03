import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import useCheckExistingUser from "../hooks/useCheckExistingUser";

function Login({ navigation }) {
  const {
    setEmailUser,
    setPasswordUser,
    isCheckedUser,
    isValid,
    errorMessage,
  } = useCheckExistingUser();

  // --- Verify the Email ---
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [email, setEmail] = useState("");

  // --- Verify the Password ---
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [password, setPassword] = useState("");

  // --- Will re-render component ---
  useEffect(() => {
    if (!isCheckedUser) {
      if (errorMessage === "" && isValid.valid) {
        setEmailUser("");
        setPasswordUser("");
        setEmail("");
        setPassword("");
        return navigation.navigate("ExpensesOverview");
      } else {
        if (!isValid.valid) {
          setVerifyEmail(true);
          setVerifyPassword(true);
          Alert.alert("Something went wrong!", isValid.message, [
            { text: "Okay", onPress: () => console.log("Okay Pressed") },
          ]);
        } else {
          Alert.alert("Something went wrong!", errorMessage, [
            { text: "Okay", onPress: () => console.log("Okay Pressed") },
          ]);
        }
      }
    }
  }, [isCheckedUser]);

  function enterAccount() {
    const modifiedEmail = email.trim();
    const modifiedPassword = password.trim();

    let emailIsValid =
      modifiedEmail.includes("@") && modifiedEmail.length !== 0;
    let passwordIsValid =
      modifiedPassword.length >= 6 && modifiedPassword.length !== 0;

    setVerifyEmail(!emailIsValid);
    setVerifyPassword(!passwordIsValid);

    const isValidFields = validateFields(emailIsValid, passwordIsValid);

    if (!isValidFields.valid) {
      Alert.alert("Something went wrong!", isValidFields.message, [
        {
          text: "Okay",
          onPress: () => {
            console.log("Okay Pressed");
          },
        },
      ]);
    } else {
      setEmailUser(modifiedEmail);
      setPasswordUser(modifiedPassword);
    }
  }

  function validateFields(emailIsValid, passwordIsValid) {
    let validResponse = { valid: true, message: "" };

    if (!emailIsValid && !passwordIsValid) {
      validResponse = {
        valid: false,
        message:
          "Both email and password are invalid.\n Please provide a valid email address and a password with a length of 6 characters or more.",
      };
    } else {
      if (!emailIsValid) {
        validResponse = {
          valid: false,
          message: "The email entered is invalid, please try again.",
        };
      } else {
        if (!passwordIsValid) {
          validResponse = {
            valid: false,
            message: "Password is invalid, must have a length of 6 or more.",
          };
        }
      }
    }

    return validResponse;
  }

  function signInPage() {
    return navigation.navigate("SignIn");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.contain}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.text}>Log In</Text>
          <View style={styles.box1}>
            <Input
              label="Email"
              invalid={verifyEmail}
              textInputConfig={{
                placeholder: "email@address.com",
                keyboardType: "email-address",
                onChangeText: (email) => setEmail(email),
                value: email,
              }}
            />
          </View>
          <View style={styles.box2}>
            <Input
              label="Password"
              invalid={verifyPassword}
              textInputConfig={{
                onChangeText: (password) => setPassword(password),
                value: password,
              }}
            />
          </View>
          <View style={styles.box3}>
            <Button onPress={enterAccount}>LOGIN</Button>
          </View>
          <View style={styles.box4}>
            <Text style={styles.text1}>Don't have an account? </Text>
            <Text style={styles.text2} onPress={signInPage}>
              Sign Up
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, flex: 1, justifyContent: "center" },
  image: { flex: 1, justifyContent: "center" },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: 30,
  },
  box1: {
    marginHorizontal: 40,
    marginBottom: 15,
  },
  box2: {
    marginHorizontal: 40,
    marginBottom: 40,
  },
  box3: {
    marginBottom: 55,
    marginHorizontal: 80,
    borderColor: GlobalStyles.colors.primary50,
    borderWidth: 2,
    borderRadius: 5,
  },
  text1: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  text2: {
    color: GlobalStyles.colors.error50,
    fontSize: 15,
    fontWeight: "bold",
  },
  box4: {
    flexDirection: "row",
    justifyContent: "center",
  },
  contain: { flex: 1, backgroundColor: GlobalStyles.colors.primary400 },
});

export default Login;
