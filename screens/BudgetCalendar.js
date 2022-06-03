import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { GlobalStyles } from "../constants/style";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import item from "../constants/calendar";
import BudgetCalendarItem from "../components/CalendarBudget/BudgetCalendarItem";
import IconButton from "../components/UI/IconButton";

function BudgetCalendar({ navigation }) {
  function renderItem(itemData) {
    return (
      <BudgetCalendarItem
        payment={itemData.amount}
        title={itemData.title}
        date={itemData.date}
      />
    );
  }

  function addInfoHandler() {
    return navigation.navigate("ManageAddBudgetCalendar");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon="add-circle"
          size={24}
          onPress={addInfoHandler}
        />
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={item}
        renderItem={renderItem}
        theme={{
          dotColor: "#CF9FFF",
          selectedDayBackgroundColor: "#5D3FD3",
          todayTextColor: "#5D3FD3",
          agendaDayTextColor: "#5D3FD3",
          agendaTodayColor: "#5D3FD3",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default BudgetCalendar;
