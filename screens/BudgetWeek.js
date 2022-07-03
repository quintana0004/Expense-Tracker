import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import CircularProgress from "react-native-circular-progress-indicator";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useBudget, useExpense, useUser } from "../store/expense-zustand";
import { checkifWithinRangeDate, getFormattedDate } from "../util/date";
import { fetchBudgetExpenses, updateBudgetExpenses } from "../util/http-two";

function BudgetWeek({ navigation }) {
  // --- Zustand Functions and Data ---
  const setBudget = useBudget((state) => state.setBudget);
  const updateBudgetBalance = useBudget((state) => state.updateBudgetBalance);
  const expenses = useExpense((state) => state.expenses);
  const budget = useBudget((state) => state.budget);
  const userId = useUser((state) => state.userId);

  // ---Activate the Add---
  const [activation, setActivation] = useState(true);
  // ---Initial Value Budget---
  const [recentBudgetValue, setRecentBudgetValue] = useState(0);
  // --- Balance Result ---
  const [balance, setBalance] = useState(0);
  // --- Value of the left budget ---
  const [card, setCard] = useState(true);
  // --- Check for Validation of Load  ---
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

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
  }, [activation]);

  useEffect(() => {
    async function getBudget() {
      try {
        const budgetResult = await fetchBudgetExpenses(userId);

        setBudget(budgetResult);
      } catch (error) {
        setError("Could not fetch the budget!");
      }
      setIsFetching(false);
    }
    getBudget();
  }, []);

  // --- Verify the last data entered---
  useEffect(() => {
    if (budget.length != 0 && !isFetching) {
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

      if (!activation && !isUpdating) {
        const balanceNew = totalSubtract(startDate, lastDate);
        setBalance(balanceNew);
        updateBalance(userId, budget[last].id, {
          ...budget[last],
          leftbudget: balanceNew,
        });
        updateBudgetBalance({ leftbudget: balanceNew }, budget[last].id);
      }
    }
  }, [isFetching, expenses, budget.length]);

  async function updateBalance(userId, budgetId, budgetData) {
    setIsUpdating(true);
    try {
      await updateBudgetExpenses(userId, budgetId, budgetData);
    } catch (error) {
      setError("Could not update budget - please try again!");
    }
    setIsUpdating(false);
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  // Navigate to other page
  function addInfoHandler() {
    return navigation.navigate("BudgetWeekAdd", {
      addValidate: activation,
    });
  }

  function totalSubtract(startDate, lastDate) {
    let subtractTotal = 0;
    for (const item of expenses) {
      const date = getFormattedDate(item.date);
      if (checkifWithinRangeDate(startDate, lastDate, date)) {
        subtractTotal = subtractTotal + item.amount;
      }
    }

    const balance = recentBudgetValue - subtractTotal;
    return balance;
  }

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
  title2: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
  },
});

export default BudgetWeek;
