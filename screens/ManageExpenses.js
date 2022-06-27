import React, { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
//import { useRoute, useNavigation } from "@react-navigation/native";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useExpense } from "../store/expense-zustand";
import { v1 as uuidv1 } from "uuid";

const ManageExpenses = ({ route, navigation }) => {
  // --- Zustand Functions of Expense Store ---
  const addExpense = useExpense((state) => state.addExpense);
  const deleteExpense = useExpense((state) => state.deleteExpense);
  const updateExpense = useExpense((state) => state.updateExpense);
  const expenses = useExpense((state) => state.expenses);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  //the !! converts it into a boolean
  const isEditing = !!editedExpenseId;

  // const selectedExpense = expensesCtx.expenses.find(
  //   (expense) => expense.id === editedExpenseId
  // );

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      //await deleteExpense(editedExpenseId);
      //expensesCtx.deleteExpense(editedExpenseId);
      deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelExpenseHandler() {
    navigation.goBack();
  }

  async function confirmedExpenseHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        // expensesCtx.updateExpense(editedExpenseId, expenseData);
        // await updateExpense(editedExpenseId, expenseData);
        updateExpense(editedExpenseId, expenseData);
      } else {
        //const id = await storeExpense(expenseData);
        //expensesCtx.addExpense({ ...expenseData, id: id });
        addExpense({ ...expenseData, id: uuidv1() });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={style.container}>
      <ExpenseForm
        onCancel={cancelExpenseHandler}
        submitButtonLable={isEditing ? "Update" : "Add"}
        onSubmit={confirmedExpenseHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={style.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpenses;
