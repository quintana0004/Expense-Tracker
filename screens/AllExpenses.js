import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { useExpense } from "../store/expense-zustand";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const expenses = useExpense((state) => state.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

const style = StyleSheet.create({});

export default AllExpenses;
