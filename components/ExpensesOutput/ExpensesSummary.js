import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

const ExpensesSummary = ({ periodName, expensesSummary }) => {
  const expensesSum = expensesSummary.reduce((sum, expensesSummary) => {
    return sum + expensesSummary.amount;
  }, 0);

  return (
    <View style={style.container}>
      <Text style={style.period}>{periodName}</Text>
      <Text style={style.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

export default ExpensesSummary;
