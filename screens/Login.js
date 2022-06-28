import react, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import { useUser } from "../store/expense-zustand";
import user from "../constants/user";

function Login({ navigation }) {
  // --- Zustand Function ---
  const setUser = useUser((state) => state.setUser);

  // --- Set the data ---
  setUser(user.email, user.password);

  // --- Verify the Email ---
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [email, setEmail] = useState("");

  // --- Verify the Password ---
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [password, setPassword] = useState("");

  // --- Zustand Data ---
  const emailUser = useUser((state) => state.email);
  const passUser = useUser((state) => state.password);

  function enterAccount() {
    // --- Check entered data from user ---
    if (emailUser === email && passUser === passUser) {
      setVerifyEmail(false);
      setVerifyPassword(false);
      return navigation.navigate("RecentExpenses");
    } else {
      setVerifyEmail(true);
      setVerifyPassword(true);
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
