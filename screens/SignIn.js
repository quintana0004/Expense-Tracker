import react from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";

function SignIn({ navigation }) {
  function enterApplication() {
    return navigation.navigate("RecentExpenses");
  }

  function logInPage() {
    return navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>
      <View style={styles.box1}>
        <Input
          label="Email"
          textInputConfig={{ placeholder: "email@address.com" }}
        />
      </View>
      <View style={styles.box2}>
        <Input label="Password" />
      </View>
      <View style={styles.box3}>
        <Input label="Password Confirmation" />
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary400 },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "50%",
    marginBottom: 30,
  },
  box1: { marginHorizontal: 40, marginBottom: 15 },
  box2: { marginHorizontal: 40, marginBottom: 15 },
  box3: { marginHorizontal: 40, marginBottom: 15 },
  box4: {
    marginTop: 20,
    marginHorizontal: 80,
    borderColor: GlobalStyles.colors.primary50,
    borderWidth: 2,
    borderRadius: 5,
  },
  box5: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  text1: { color: "white", fontSize: 15, textAlign: "center" },
  text2: {
    color: GlobalStyles.colors.error50,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default SignIn;
