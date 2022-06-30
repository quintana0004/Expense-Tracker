import react, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import { useUser } from "../store/expense-zustand";
import { fetchExistingUser } from "../util/http-two";
import { CONSTANTS, JSHash } from "react-native-hash";

function Login({ navigation }) {
  // --- Zustand Function ---
  const setUser = useUser((state) => state.setUser);

  // --- Verify the Email ---
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [email, setEmail] = useState("");

  // --- Verify the Password ---
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [password, setPassword] = useState("");

  function enterAccount() {
    const emailValid = email.trim().length !== 0;
    const passwordValid = password.trim().length !== 0;

    // --- Check password ---
    if (!passwordValid) {
      setVerifyPassword(true);
    }

    // --- Check email ---
    if (!emailValid) {
      setVerifyEmail(true);
    }

    if (passwordValid && emailValid) {
      try {
        JSHash(password, CONSTANTS.HashAlgorithms.sha256).then(async (hash) => {
          const user = await fetchExistingUser(email, hash);
          if (user === "No-key") {
            Alert.alert(
              "This user is not found, please try again.",
              "Check if email and password has been written correctly.",
              [{ text: "Okay", onPress: () => console.log("Okay Pressed") }]
            );
          } else {
            console.log(user.email);
            console.log(user.password);
            console.log(user.userID);
            setUser(user.email, user.password, user.userID);
            return navigation.navigate("RecentExpenses");
          }
        });
      } catch (e) {
        Alert.alert("Something went wrong, please try again.", e.message, [
          { text: "Okay", onPress: () => console.log("Okay Pressed") },
        ]);
      }
    }
  }

  function signInPage() {
    return navigation.navigate("SignIn");
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary400 },
  image: { flex: 1, justifyContent: "center" },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "50%",
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
});

export default Login;
