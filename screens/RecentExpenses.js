import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expense-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import expense from "../constants/expenses";
import { useExpense } from "../store/expense-zustand";

function RecentExpenses() {
  //--- Zustand Functions ---
  const setExpense = useExpense((state) => state.setExpense);
  const expenses = useExpense((state) => state.expenses);

  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  // const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        // const expenses = await fetchExpenses();
        // expensesCtx.setExpenses(expenses);

        setExpense(expense);
      } catch (error) {
        setError("Could not fetch expenses!");
      }

      setIsFetching(false);
    }
    getExpenses();
  }, [setExpense]);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  // const recentExpenses = expensesCtx.expenses.filter((expense) => {
  //   const today = new Date();
  //   const date7DaysAgo = getDateMinusDays(today, 7);
  //   return expense.date > date7DaysAgo && expense.date <= today;
  // });

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  console.log(recentExpenses);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the 7 days"
    />
  );
}

export default RecentExpenses;
