import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { GlobalStyles } from "../constants/style";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import item from "../constants/calendar";
import BudgetCalendarItem from "../components/CalendarBudget/BudgetCalendarItem";
import IconButton from "../components/UI/IconButton";
import { useCalendar } from "../store/expense-zustand";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function BudgetCalendar({ navigation }) {
  // --- Zustand function ---
  const setCalendar = useCalendar((state) => state.setCalendar);

  // --- Zustand Data ---
  const calendar = useCalendar((state) => state.calendar);

  // --- Verify the data being received
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function getCalendar() {
      setIsFetching(true);
      try {
        // const expenses = await fetchExpenses();
        // expensesCtx.setExpenses(expenses);
        setCalendar(item);
      } catch (error) {
        setError("Could not fetch calendar expenses!");
      }

      setIsFetching(false);
    }
    getCalendar();
  }, [setCalendar]);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
        items={calendar}
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
