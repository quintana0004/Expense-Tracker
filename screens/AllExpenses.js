import React from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpense } from "../store/expense-zustand";

const AllExpenses = () => {
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
