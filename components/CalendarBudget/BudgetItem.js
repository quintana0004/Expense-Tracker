import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../constants/style";

function BudgetItem({ inititalDate, lastDate, amount, leftAmount }) {
  return (
    <View style={styles.containerItem}>
      <View style={styles.emoji}>
        <Image
          source={require("../CalendarBudget/icons8-budget-64.png")}
          style={{ width: 50, height: 50, margin: 5 }}
        />
      </View>
      <View>
        <Text>Initial Date: {inititalDate}</Text>
        <Text>Last Date: {lastDate}</Text>
        <Text>Initial Amount: {amount}</Text>
        <Text>Left Amount: {leftAmount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#F3E8FD",
    marginTop: 16,
    marginHorizontal: 50,
    borderColor: "#EDDDFC",
    borderWidth: 1,
  },
  emoji: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 5,
    borderRadius: 15,
  },
});

export default BudgetItem;
