import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { useExpense, useUser } from "../store/expense-zustand";
import { addExpenses, deleteExpenses, updateExpenses } from "../util/http-two";

const ManageExpenses = ({ route, navigation }) => {
  // --- Zustand Functions of Expense Store ---
  const addExpense = useExpense((state) => state.addExpense);
  const deleteExpense = useExpense((state) => state.deleteExpense);
  const updateExpense = useExpense((state) => state.updateExpense);
  const expenses = useExpense((state) => state.expenses);
  const userId = useUser((state) => state.userId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

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
      await deleteExpenses(userId, editedExpenseId);
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
        await updateExpenses(userId, editedExpenseId, expenseData);
      } else {
        //const id = await storeExpense(expenseData);
        //expensesCtx.addExpense({ ...expenseData, id: id });
        const id = await addExpenses(userId, expenseData);
        console.log("Expected ID:", id);
        addExpense({ ...expenseData, id: id });
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
