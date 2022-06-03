import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import CircularProgress from "react-native-circular-progress-indicator";
import { getFormattedDate } from "../util/date";
import Budget from "../constants/budget";
import { Feather } from "@expo/vector-icons";

function BudgetWeek({ navigation }) {
  // ---Activate the Add---
  const [addActivate, setAddActivate] = useState(false);

  // ---Initial Value Budget---
  const [budgetValue, setBudgetValue] = useState();

  // ---Subtracted Initial Budget---
  const [subBudget, setSubBudget] = useState();

  // --- Value of the left budget ---
  const [card, setCard] = useState(true);

  // Navigate to other page
  function addInfoHandler() {
    return navigation.navigate("BudgetWeekAdd", {
      addValidate: addActivate,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon={addActivate ? "add-circle" : "time-sharp"}
          size={24}
          onPress={addInfoHandler}
        />
      ),
    });
  });

  // --- Download the data and verify thge date ---
  useEffect(() => {
    const len = Budget.length - 1;
    setBudgetValue(Budget[len].initialBudget);
    console.log("This is budget", budgetValue);
    const sub = Budget[len].leftbudget;
    const resta = sub - 100.0;
    console.log(resta);
    setSubBudget(resta);
  }, [setBudgetValue, setSubBudget, Budget]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Budget Balance</Text>
      </View>
      <View style={styles.circlePosition}>
        <CircularProgress
          value={subBudget}
          maxValue={budgetValue}
          valuePrefix={"$"}
          radius={150}
          progressValueColor={GlobalStyles.colors.primary50}
          inActiveStrokeColor={GlobalStyles.colors.primary50}
          inActiveStrokeWidth={20}
          activeStrokeColor={GlobalStyles.colors.primary200}
          activeStrokeWidth={12}
          progressValueFontSize={50}
          progressFormatter={(value) => {
            "worklet";
            return value.toFixed(2);
          }}
        />
      </View>
      {card && (
        <View style={styles.square}>
          <Text style={styles.txt}> Info Budget</Text>
          <Text style={styles.p}>
            This card will present, the budget that will be placed here.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  box: {
    marginTop: 45,
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
  },
  circlePosition: {
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    margin: 50,
    borderColor: GlobalStyles.colors.primary400,
    borderWidth: 2,
    borderRadius: 10,
    elevation: 2,
    shadowColor: GlobalStyles.colors.primary800,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary400,
    textAlign: "justify",
    marginTop: 5,
    marginLeft: 5,
  },
  p: {
    fontSize: 15,
    textAlign: "justify",
    marginBottom: 5,
    marginLeft: 7,
    marginRight: 7,
  },
});

export default BudgetWeek;
