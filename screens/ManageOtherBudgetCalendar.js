import react, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Item from "../constants/calendar";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/style";
import { useCalendar } from "../store/expense-zustand";
import { getStringFormatDate } from "../util/date";

function ManageOtherBudgetCalendar({ route, navigation }) {
  // --- Zustand Functions ---
  const deleteCalendar = useCalendar((state) => state.deleteCalendar);
  const updateCalendar = useCalendar((state) => state.updateCalendar);

  // --- Zustand Data ---
  const calendar = useCalendar((state) => state.calendar);

  // Receiving object
  const obj = route.params;
  const amountProvided = obj.amountKey;
  const dateProvided = obj.dateKey;
  const titleProvided = obj.titleKey;

  // --- Date changed with string format ---
  const dateString = getStringFormatDate(dateProvided);

  // Validate the change made
  // Date input and validation
  // const [date, setDate] = useState(dateProvided);
  // const [dateValidation, setDateValidation] = useState(false);

  // Amount input and validation
  const [amount, setAmount] = useState(amountProvided.toString());
  const [amountValidation, setAmountValidation] = useState(false);

  // Title input and validation
  const [title, setTitle] = useState(titleProvided);
  const [titleValidation, setTitleValidation] = useState(false);

  // Check if each form entered is valid
  // Presents the hidden message
  const [formValid, setFormValid] = useState(false);

  // ---Cancel Button---
  function onCancel() {
    navigation.goBack();
  }

  // ---Verify and Update Button---
  function onVerifyUpdate() {
    //I. Set all the needed to be later be passed on the Item
    const amount_Modified = +amount;

    //II. Check that each value entered is valid
    //setDateValidation(!(date_Modified.toString() !== "Invalid Date"));
    setAmountValidation(!(!isNaN(amount_Modified) && amount_Modified > 0));
    setTitleValidation(!(title.trim().length > 0));

    if (amountValidation || titleValidation) {
      return setFormValid(true);
    }

    //setDate(date_Modified.toISOString().slice(0, 10));
    // III. Send that data to the dummy data
    if (calendar.hasOwnProperty(dateProvided)) {
      const len = calendar[dateProvided].length;
      for (let i = 0; i < len; i++) {
        if (
          calendar[dateProvided][i].title === titleProvided &&
          calendar[dateProvided][i].amount === amountProvided
        ) {
          updateCalendar(title, amount_Modified, dateProvided, i);
          navigation.goBack();
        }
      }
    }
  }

  // ---Verify and Delete Button---
  function onVerifyDelete() {
    //I. Set all the needed to be later be passed on the Item
    const amount_Modified = +amount;

    //II. Check that each value entered is valid
    //setDateValidation(!(date_Modified.toString() !== "Invalid Date"));
    setAmountValidation(!(!isNaN(amount_Modified) && amount_Modified > 0));
    setTitleValidation(!(title.trim().length > 0));

    if (amountValidation || titleValidation) {
      return setFormValid(true);
    }

    // setDate(date_Modified.toISOString().slice(0, 10));
    // III. Send that data to the dummy data
    if (calendar.hasOwnProperty(dateProvided)) {
      const len = calendar[dateProvided].length;
      for (let i = 0; i < len; i++) {
        if (
          calendar[dateProvided][i].title === titleProvided &&
          calendar[dateProvided][i].amount === amountProvided
        ) {
          deleteCalendar(i, dateProvided);
          navigation.goBack();
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Important Payment</Text>
        <Text style={styles.date}>{dateString}</Text>
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
          <Button onPress={onCancel}>Cancel</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={onVerifyUpdate}>Update</Button>
        </View>
      </View>

      <View style={styles.buttons2}>
        <View style={styles.button}>
          <Button onPress={onVerifyDelete}>Delete</Button>
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
  date: {
    fontSize: 20,
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 24,
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
    paddingHorizontal: 30,
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
  buttons2: {
    justifyContent: "center",
    marginTop: 25,
    marginHorizontal: 70,
  },
});

export default ManageOtherBudgetCalendar;
