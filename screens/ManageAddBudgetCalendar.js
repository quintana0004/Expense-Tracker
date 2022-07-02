import react, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Item from "../constants/calendar";
import Button from "../components/UI/Button";
import { useCalendar, useUser } from "../store/expense-zustand";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { addCalendarExpense } from "../util/http-two";

function ManageAddBudgetCalendar({ navigation }) {
  // --- Zustand Function ---
  const addCalendar = useCalendar((state) => state.addCalendar);
  const userId = useUser((state) => state.userId);

  // Date input and validation
  const [date, setDate] = useState("");
  const [dateValidation, setDateValidation] = useState(false);

  // Amount input and validation
  const [amount, setAmount] = useState("");
  const [amountValidation, setAmountValidation] = useState(false);

  // Title input and validation
  const [title, setTitle] = useState("");
  const [titleValidation, setTitleValidation] = useState(false);

  // Check if each form entered is valid
  // Presents the hidden message
  const [formValid, setFormValid] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  // The submit values to dummy data
  async function dateVerificationHandler() {
    // I. Set all data needed to be later be passed on the "Item"
    const date_Modified = new Date(date);
    const amount_Modified = +amount;

    // II.  Check that each value entered is valid
    setDateValidation(!(date_Modified.toString() !== "Invalid Date"));
    setAmountValidation(!(!isNaN(amount_Modified) && amount_Modified > 0));
    setTitleValidation(!(title.trim().length > 0));

    if (amountValidation || dateValidation || titleValidation) {
      return setFormValid(true);
    }

    setDate(date_Modified.toISOString().slice(0, 10));

    // III. Send data to backend
    setIsSubmitting(true);
    try {
      const id = await addCalendarExpense(userId, title, +amount, date);
      addCalendar(title, +amount, date, id);
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  function onCancel() {
    return navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Important Payment</Text>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Input
              label="Date"
              invalid={dateValidation}
              textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                onChangeText: (date) => setDate(date),
                value: date,
              }}
            />
          </View>
          <View style={styles.input2}>
            <Input
              label="Amount"
              invalid={amountValidation}
              textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: (amount) => setAmount(amount),
                value: amount,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.input3}>
        <Input
          label="Title"
          invalid={titleValidation}
          textInputConfig={{
            onChangeText: (title) => setTitle(title),
            value: title,
          }}
        />
      </View>
      {formValid && (
        <Text style={styles.txt}>
          Invalid Input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button mode="flat" onPress={onCancel}>
            Cancel
          </Button>
        </View>
        <View style={styles.button}>
          <Button onPress={dateVerificationHandler}>Submit</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputContainer: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    paddingLeft: 30,
    marginVertical: 10,
    width: 200,
    paddingRight: 0,
  },
  input2: {
    paddingLeft: 0,
    marginVertical: 10,
    width: 200,
    paddingRight: 30,
  },
  input3: {
    paddingHorizontal: 30,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  txt: {
    fontSize: 15,
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
});

export default ManageAddBudgetCalendar;
