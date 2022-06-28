import react, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import { useUser } from "../store/expense-zustand";

function SignIn({ navigation }) {
  // --- Zustand Function ---
  const addUser = useUser((state) => state.addUser);
  const emailZus = useUser((state) => state.email);
  const passZus = useUser((state) => state.password);

  // --- Verify the entered data from user -=-
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [verifyConPass, setVerifyConPass] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);

  function enterApplication() {
    const modEmail = email.trim();
    const modPass = password.trim();
    const conPass = passwordConfirmation.trim();

    const emailIsValid = modEmail.includes("@");
    const passwordIsValid = modPass.length > 6;
    const confirmedpass = conPass.length > 6;

    if (modPass !== conPass) {
      setVerifyPassword(true);
      setVerifyConPass(true);
    }

    if (emailIsValid && passwordIsValid && confirmedpass) {
      addUser(modEmail, modPass);
      setVerifyConPass(false);
      setVerifyEmail(false);
      setVerifyPassword(false);
      return navigation.navigate("RecentExpenses");
    } else {
      setVerifyConPass(true);
      setVerifyEmail(true);
      setVerifyPassword(true);
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
    justifyContent: "space-around",
  },
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary400 },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "25%",
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
