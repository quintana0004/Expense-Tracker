import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import CircularProgress from "react-native-circular-progress-indicator";
import Budget from "../constants/budget";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useBudget, useExpense } from "../store/expense-zustand";
import { checkifWithinRangeDate, getFormattedDate } from "../util/date";

function BudgetWeek({ navigation }) {
  // --- Zustand Functions and Data ---
  const setBudget = useBudget((state) => state.setBudget);
  const updateBudgetBalance = useBudget((state) => state.updateBudgetBalance);
  const expenses = useExpense((state) => state.expenses);
  const budget = useBudget((state) => state.budget);

  // --- Check for Validation of Load  ---
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getBudget() {
      setIsFetching(true);
      try {
        // const expenses = await fetchExpenses();
        // expensesCtx.setExpenses(expenses);
        setBudget(Budget);
      } catch (error) {
        setError("Could not fetch the budget!");
      }
      setIsFetching(false);
    }
    getBudget();
  }, [Budget]);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  // ---Activate the Add---
  const [activation, setActivation] = useState(false);

  // ---Initial Value Budget---
  const [recentBudgetValue, setRecentBudgetValue] = useState(0);

  // --- Balance Result ---
  const [balance, setBalance] = useState(0);

  // --- Value of the left budget ---
  const [card, setCard] = useState(true);

  // Navigate to other page
  function addInfoHandler() {
    return navigation.navigate("BudgetWeekAdd", {
      addValidate: activation,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon={activation ? "add-circle" : "time-sharp"}
          size={24}
          onPress={addInfoHandler}
        />
      ),
    });
  });

  function totalSubtract(startDate, lastDate) {
    let subtractTotal = 0;
    for (const item of expenses) {
      const date = getFormattedDate(item.date);
      if (checkifWithinRangeDate(startDate, lastDate, date)) {
        subtractTotal = subtractTotal + item.amount;
      }
    }
    console.log("Recent Budget", recentBudgetValue);
    console.log("Subtract Total", subtractTotal);
    const balance = recentBudgetValue - subtractTotal;
    setBalance(balance);
    return balance;
  }

  // --- Verify the last data entered---
  useEffect(() => {
    if (budget.length != 0) {
      const last = budget.length - 1;
      setRecentBudgetValue(budget[last].initialBudget);
      setBalance(budget[last].leftbudget);
      const today = new Date();
      const modToday = getFormattedDate(today);
      const startDate = budget[last].initialDate;
      const lastDate = budget[last].lastDate;

      if (!checkifWithinRangeDate(startDate, lastDate, modToday)) {
        setActivation(true);
        setCard(true);
      } else {
        setActivation(false);
        setCard(false);
      }

      if (!activation) {
        const balanceNew = totalSubtract(startDate, lastDate);
        updateBudgetBalance({ leftbudget: balanceNew }, last);
      }
    }
  }, [expenses, updateBudgetBalance, budget.length, recentBudgetValue]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Budget Balance</Text>
      </View>
      <View style={styles.circlePosition}>
        <CircularProgress
          value={balance}
          maxValue={recentBudgetValue}
          valuePrefix={"$"}
          radius={150}
          progressValueColor={GlobalStyles.colors.primary50}
          inActiveStrokeColor={GlobalStyles.colors.primary50}
          inActiveStrokeWidth={20}
          activeStrokeColor={GlobalStyles.colors.primary200}
          activeStrokeWidth={12}
          progressValueFontSize={50}
          progressFormatter={(value) => {
            "worklet";
            return value.toFixed(2);
          }}
        />
      </View>
      {card && (
        <View style={styles.square}>
          <Text style={styles.txt}> Add New Budget Enabled </Text>
          <Text style={styles.p}>
            Your budget for this week has expired please enter a new budget.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  box: {
    marginTop: 45,
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
  },
  circlePosition: {
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    margin: 50,
    borderColor: GlobalStyles.colors.primary400,
    borderWidth: 2,
    borderRadius: 10,
    elevation: 2,
    shadowColor: GlobalStyles.colors.primary800,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary400,
    textAlign: "justify",
    marginTop: 5,
    marginLeft: 5,
  },
  p: {
    fontSize: 15,
    textAlign: "justify",
    marginBottom: 5,
    marginLeft: 7,
    marginRight: 7,
  },
});

export default BudgetWeek;
