import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Input from "../components/ManageExpense/Input";
import Button from "../components/UI/Button";
import BudgetItem from "../components/CalendarBudget/BudgetItem";
import { useBudget, useUser } from "../store/expense-zustand";
import { addBudgetExpenses } from "../util/http-two";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function BudgetWeekAdd({ navigation, route }) {
  // --- Zustand ---
  const addBudget = useBudget((state) => state.addBudget);
  const budget = useBudget((state) => state.budget);
  const userId = useUser((state) => state.userId);

  // --- Obtain object from the other page ---
  const obj = route.params;
  const validation = obj.addValidate;

  // --- Go back to page ---
  function onCancel() {
    return navigation.goBack();
  }

  // --- Values needed to enter in the database ---
  // --- Initial Date ---
  const [initialDay, setInitialDay] = useState("");
  const [initialMonth, setInitialMonth] = useState("");
  const [initialYear, setInitialYear] = useState("");

  // --- Last Date ---
  const [lastDay, setLastDay] = useState("");
  const [lastMonth, setLastMonth] = useState("");
  const [lastYear, setLastYear] = useState("");

  // --- Amount ---
  const [amount, setAmount] = useState();

  // --- Verify if form is valid ---
  //--- Initial Date ---
  const [initialDayValid, setInitialDayValid] = useState(false);
  const [initialMonthValid, setInitialMonthValid] = useState(false);
  const [initialYearValid, setInitialYearValid] = useState(false);

  // --- Last Date ---
  const [lastDayValid, setLastDayValid] = useState(false);
  const [lastMonthValid, setLastMonthValid] = useState(false);
  const [lastYearValid, setLastYearValid] = useState(false);

  // --- Amount ---
  const [amountValid, setAmountValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function inputVerification() {
    // I. Set all data needed to be later be passed on the "budget"
    // Date Modification
    let initialDate = `${initialYear}-${initialMonth}-${initialDay}`;
    let lastDate = `${lastYear}-${lastMonth}-${lastDay}`;
    const date_Modified_initial = new Date(initialDate);
    const date_Modified_last = new Date(lastDate);

    // Amount modification
    const amount_Modified = +amount;

    //II. Check that each value entered is valid
    // Make sure to verify each individual slot and then verify as whole
    setInitialDayValid(!(initialDay.length > 0));
    setInitialMonthValid(!(initialMonth.length > 0));
    setInitialYearValid(!(initialYear.length > 0));
    setLastDayValid(!(lastDay.length > 0));
    setLastMonthValid(!(lastMonth.length > 0));
    setLastYearValid(!(lastYear.length > 0));
    setAmountValid(!(!isNaN(amount_Modified) && amount_Modified > 0));

    console.log("InitialDay:", initialDayValid);
    console.log("InitialMonth:", initialMonthValid);
    console.log("InitialYear:", initialYearValid);
    console.log("LastDay:", lastDayValid);
    console.log("LastMonth:", lastMonthValid);
    console.log("LastYear:", lastYearValid);
    console.log("AmountValid: ", amountValid);

    if (
      initialDayValid ||
      initialMonthValid ||
      initialYearValid ||
      lastDayValid ||
      lastMonthValid ||
      lastYearValid ||
      amountValid
    ) {
      return setFormValid(true);
    }

    console.log("Initial Date:", date_Modified_initial.toString());
    console.log("Last Date: ", date_Modified_last.toString());

    if (
      !(date_Modified_initial.toString() !== "Invalid Date") ||
      !(date_Modified_last.toString() !== "Invalid Date")
    ) {
      return setFormValid(true);
    }

    if (!formValid) {
      Alert.alert(
        "Submit Expected Budget",
        "Once this budget has been submitted it can't be edited or erased from submission.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => console.log("Pressed Cancel"),
          },
          {
            text: "Submit",
            onPress: () => {
              setIsSubmitting(true);
              try {
                const id = addBudgetExpenses(userId, {
                  initialDate: date_Modified_initial.toISOString().slice(0, 10),
                  lastDate: date_Modified_last.toISOString().slice(0, 10),
                  initialBudget: amount_Modified,
                  leftbudget: amount_Modified,
                });
                addBudget({
                  initialDate: date_Modified_initial.toISOString().slice(0, 10),
                  lastDate: date_Modified_last.toISOString().slice(0, 10),
                  initialBudget: amount_Modified,
                  leftbudget: amount_Modified,
                  id: id,
                });
              } catch (error) {
                setError("Could not save data - please try again later");
                setIsSubmitting(false);
              }
              onCancel();
            },
          },
        ]
      );
    }
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

  if (validation) {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Expected Budget</Text>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input
                label="Initial Day"
                invalid={initialDayValid}
                textInputConfig={{
                  placeholder: "DD",
                  onChangeText: (initialDay) => setInitialDay(initialDay),
                  value: initialDay,
                }}
              />
            </View>
            <View style={styles.input2}>
              <Input
                label="Initial Month"
                invalid={initialMonthValid}
                textInputConfig={{
                  placeholder: "MM",
                  onChangeText: (initialMonth) => setInitialMonth(initialMonth),
                  value: initialMonth,
                }}
              />
            </View>
            <View style={styles.input4}>
              <Input
                label="Initial Year"
                invalid={initialYearValid}
                textInputConfig={{
                  placeholder: "YYYY",
                  onChangeText: (initialYear) => setInitialYear(initialYear),
                  value: initialYear,
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input
                label="Last Day"
                invalid={lastDayValid}
                textInputConfig={{
                  placeholder: "DD",
                  onChangeText: (lastDay) => setLastDay(lastDay),
                  value: lastDay,
                }}
              />
            </View>
            <View style={styles.input2}>
              <Input
                label="Last Month"
                invalid={lastMonthValid}
                textInputConfig={{
                  placeholder: "MM",
                  onChangeText: (lastMonth) => setLastMonth(lastMonth),
                  value: lastMonth,
                }}
              />
            </View>
            <View style={styles.input4}>
              <Input
                label="Last Year"
                invalid={lastYearValid}
                textInputConfig={{
                  placeholder: "YYYY",
                  onChangeText: (lastYear) => setLastYear(lastYear),
                  value: lastYear,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.input3}>
          <Input
            label="Amount"
            invalid={amountValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: (amount) => setAmount(amount),
              value: amount,
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
            <Button onPress={inputVerification}>Submit</Button>
          </View>
        </View>
      </View>
    );
  }

  function renderBudgetItem(itemData) {
    return (
      <BudgetItem
        amount={itemData.item.initialBudget}
        leftAmount={itemData.item.leftbudget}
        inititalDate={itemData.item.initialDate}
        lastDate={itemData.item.lastDate}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form2}>
        <Text style={styles.title2}>History</Text>
        <FlatList
          data={budget}
          renderItem={renderBudgetItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
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
    width: 110,
    paddingRight: 0,
  },
  input2: {
    paddingLeft: 0,
    marginVertical: 10,
    width: 100,
    paddingRight: 0,
  },
  input3: {
    paddingHorizontal: 30,
  },
  input4: { paddingLeft: 0, marginVertical: 10, width: 130, paddingRight: 30 },
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
  form2: { marginTop: 5, paddingBottom: 13, flex: 1 },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default BudgetWeekAdd;
