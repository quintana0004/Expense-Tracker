import React, { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { GlobalStyles } from "../constants/style";
import { Agenda } from "react-native-calendars";
import BudgetCalendarItem from "../components/CalendarBudget/BudgetCalendarItem";
import IconButton from "../components/UI/IconButton";
import { useCalendar, useUser } from "../store/expense-zustand";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchCalendar } from "../util/http-two";

function BudgetCalendar({ navigation }) {
  // --- Zustand function ---
  const setCalendar = useCalendar((state) => state.setCalendar);

  // --- Zustand Data ---
  const calendar = useCalendar((state) => state.calendar);
  const userId = useUser((state) => state.userId);

  // --- Verify the data being received
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getCalendar() {
      setIsFetching(true);
      try {
        const calendarBudget = await fetchCalendar(userId);
        setCalendar(calendarBudget);
      } catch (error) {
        setError("Could not fetch calendar expenses!");
      }

      setIsFetching(false);
    }

    console.log("Length: ", Object.keys(calendar).length);

    if (Object.keys(calendar).length === 0) {
      getCalendar();
    }
  }, [calendar]);

  console.log("Data from Zustand:", calendar);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  // if (Object.keys(calendar).length === 0) {
  //   return <Text style={styles.text}>No budget placed on calendar yet!</Text>;
  // }

  function renderItem(itemData) {
    return (
      <BudgetCalendarItem
        payment={itemData.amount}
        title={itemData.title}
        date={itemData.date}
        id={itemData.id}
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
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BudgetCalendar;
