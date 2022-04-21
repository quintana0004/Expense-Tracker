import react from "react";
import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/style";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={style.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expensesList={expenses} />;
  }

  return (
    <View style={style.container}>
      <ExpensesSummary expensesSummary={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default ExpensesOutput;
