import react from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/style";

function BudgetCalendarItem({ title, payment, date, id }) {
  const navigation = useNavigation();

  function editCalendarItemHandler() {
    return navigation.navigate("ManageOtherBudgetCalendar", {
      dateKey: date,
      titleKey: title,
      amountKey: payment,
      idKey: id,
    });
  }

  return (
    <TouchableOpacity onPress={editCalendarItemHandler}>
      <View style={styles.containerItem}>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <Text>{payment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#F3E8FD",
    marginTop: 30,
    marginHorizontal: 10,
    borderColor: "#EDDDFC",
    borderWidth: 1,
  },
});

export default BudgetCalendarItem;
