import react, { useEffect, useState } from "react";
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
import useCreateUser from "../hooks/useCreateUser";

function SignIn({ navigation }) {
  // --- Data ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [verifyConPass, setVerifyConPass] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);

  // --- Custom Hook ---
  const {
    isValidEmail,
    errorMessage,
    setUserEmail,
    setUserPassword,
    setUserConfirmedPassword,
    isCreatingUser,
  } = useCreateUser();

  useEffect(() => {
    console.log("Is Creating User:", isCreatingUser);
    console.log("Is Valid Email Taken:", isValidEmail);
    console.log("Error Message:", errorMessage);

    if (!isCreatingUser) {
      if (errorMessage === "" && isValidEmail.valid) {
        return navigation.navigate("ExpensesOverview");
      } else if (!isValidEmail.valid) {
        setVerifyEmail(true);
        Alert.alert("Something went wrong!", isValidEmail.message, [
          {
            text: "Okay",
            onPress: () => {
              console.log("Okay Pressed");
            },
          },
        ]);
      } else {
        Alert.alert("Something went wrong!", errorMessage, [
          {
            text: "Okay",
            onPress: () => {
              console.log("Okay Pressed");
            },
          },
        ]);
      }
    }
  }, [isCreatingUser]);

  function enterApplication() {
    const modifiedEmail = email.trim();
    const modifiedPassword = password.trim();
    const confirmedPassword = passwordConfirmation.trim();

    let emailIsValid = email.includes("@") && email.length !== 0;
    let passwordIsValid = password.length >= 6 && password.length !== 0;
    let confirmedpass =
      confirmedPassword.length >= 6 && confirmedPassword.length !== 0;
    let result = passwordIsValid && confirmedpass;
    const valid = result && password === confirmedPassword;

    setVerifyEmail(!emailIsValid);
    setVerifyPassword(!passwordIsValid || !valid);
    setVerifyConPass(!confirmedpass || !valid);

    const isValidFields = validateFields(
      emailIsValid,
      passwordIsValid,
      confirmedpass,
      valid
    );

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
      setUserEmail(modifiedEmail);
      setUserPassword(modifiedPassword);
      setUserConfirmedPassword(confirmedPassword);
    }
  }

  function logInPage() {
    return navigation.navigate("Login");
  }

  function validateFields(emailIsValid, passwordIsValid, confirmedpass, valid) {
    let validResponse = { valid: true, message: "" };

    if (!emailIsValid && !passwordIsValid && !confirmedpass) {
      validResponse = {
        valid: false,
        message:
          "Verify that email is not taken, and for both passwords to be the same. Every input is requeried.",
      };
    } else if (!emailIsValid && !passwordIsValid) {
      validResponse = {
        valid: false,
        message:
          "Both email and password are invalid.\n Please provide a valid email address and a password with a length of 6 characters or more.",
      };
    } else if (!emailIsValid) {
      validResponse = {
        valid: false,
        message: "The email entered is invalid, please try again.",
      };
    } else if (!passwordIsValid) {
      validResponse = {
        valid: false,
        message: "Password is invalid, must have a length of 6 or more.",
      };
    } else if (!confirmedpass) {
      validResponse = {
        valid: false,
        message:
          "Confirmed Password is invalid, must have a length of 6 or more.",
      };
    } else if (!valid) {
      validResponse = { valid: false, message: "The passwords don't match." };
    }

    return validResponse;
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
