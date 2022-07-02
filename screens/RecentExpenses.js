import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useExpense, useUser } from "../store/expense-zustand";
import { fetchExpenses } from "../util/http-two";

function RecentExpenses() {
  //--- Zustand Functions ---
  const setExpense = useExpense((state) => state.setExpense);
  const expenses = useExpense((state) => state.expenses);
  const userId = useUser((state) => state.userId);

  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  // const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        // const expenses = await fetchExpenses();
        // expensesCtx.setExpenses(expenses);
        const expenseResult = await fetchExpenses(userId);
        console.log("My Expenses:", expenseResult);
        setExpense(expenseResult);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    if (expenses.length === 0) {
      getExpenses();
    }
  }, [expenses]);

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
