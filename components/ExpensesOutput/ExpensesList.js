import react from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return (
    <ExpenseItem
      id={itemData.item.id}
      date={itemData.item.date}
      amount={itemData.item.amount}
      description={itemData.item.description}
    />
  );
}

const ExpensesList = ({ expensesList }) => {
  return (
    <FlatList
      data={expensesList}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const style = StyleSheet.create({});
export default ExpensesList;
