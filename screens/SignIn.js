import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import { useUser } from "../store/expense-zustand";
import { storeNewUser, checkIfExistingEmail } from "../util/http-two";
import { CONSTANTS, JSHash } from "react-native-hash";

function SignIn({ navigation }) {
  // --- Zustand Function ---
  const addUser = useUser((state) => state.addUser);

  // --- Verify the entered data from user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [verifyConPass, setVerifyConPass] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [validation, setValidation] = useState(false);
  const [message, setMessage] = useState("");

  function enterApplication() {
    const modEmail = email.trim();
    const modPass = password.trim();
    const conPass = passwordConfirmation.trim();

    let emailIsValid = modEmail.includes("@");
    let passwordIsValid = modPass.length > 6;
    let confirmedpass = conPass.length > 6;

    const emailExistAlready = async () => {
      const emailValid = await checkIfExistingEmail(modEmail);
      console.log(emailValid);
      return emailValid;
    };

    console.log(emailExistAlready());
    const valid = modPass !== conPass;

    if (emailExistAlready()) {
      emailIsValid = false;
      setVerifyEmail(true);
      setVerifyConPass(false);
      setVerifyPassword(false);
      Alert.alert(
        "Sign Up Error",
        `The email ${modEmail} is already taken. Please try using another email.`,
        [{ text: "Okay", onPress: () => console.log("Okay Pressed") }]
      );
    }

    if (modPass !== conPass) {
      emailIsValid = true;
      passwordIsValid = false;
      confirmedpass = false;
      setVerifyEmail(false);
      setVerifyConPass(true);
      setVerifyPassword(true);
      Alert.alert("Sign Up Error", "Passwords must be the same.", [
        { text: "Okay", onPress: () => console.log("Okay Pressed") },
      ]);
    }

    if (emailExistAlready() && valid) {
      emailIsValid = false;
      passwordIsValid = false;
      confirmedpass = false;
      setVerifyEmail(true);
      setVerifyConPass(true);
      setVerifyPassword(true);
      setValidation(true);
      setMessage(
        "The email is already taken and passwords don't match. Please try again."
      );
    }

    if (emailIsValid && passwordIsValid && confirmedpass) {
      try {
        JSHash(modPass, CONSTANTS.HashAlgorithms.sha256).then(async (hash) => {
          const userId = await storeNewUser(modEmail, hash);
          addUser(modEmail, hash, userId);
        });
        setVerifyConPass(false);
        setVerifyEmail(false);
        setVerifyPassword(false);
        return navigation.navigate("RecentExpenses");
      } catch (error) {
        Alert.alert("Something went wrong, try again!", error.message, [
          { text: "Okay", onPress: () => console.log("Okay Pressed") },
        ]);
      }
    }
  }

  function logInPage() {
    return navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.text}>Sign Up</Text>
          <View style={styles.box1}>
            <Input
              label="Email"
              invalid={verifyEmail}
              textInputConfig={{
                placeholder: "email@address.com",
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
            <Input
              label="Password Confirmation"
              invalid={verifyConPass}
              textInputConfig={{
                onChangeText: (conPass) => setPasswordConfirmation(conPass),
                value: passwordConfirmation,
              }}
            />
          </View>
          {validation && (
            <View style={{ margin: 5 }}>
              <Text style={styles.text1}>{message}</Text>
            </View>
          )}
          <View style={styles.box4}>
            <Button onPress={enterApplication}>Create Account</Button>
          </View>
          <View style={styles.box5}>
            <Text style={styles.text1}>Already have an account? </Text>
            <Text style={styles.text2} onPress={logInPage}>
              Log In
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary400 },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: 30,
  },
  box1: { marginHorizontal: 40, marginBottom: 5 },
  box2: { marginHorizontal: 40, marginBottom: 5 },
  box3: { marginHorizontal: 40, marginBottom: 5 },
  box4: {
    marginTop: 12,
    marginHorizontal: 80,
    borderColor: GlobalStyles.colors.primary50,
    borderWidth: 2,
    borderRadius: 5,
  },
  box5: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
  text1: { color: "white", fontSize: 15, textAlign: "center" },
  text2: {
    color: GlobalStyles.colors.error50,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default SignIn;
