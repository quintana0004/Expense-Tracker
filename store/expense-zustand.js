import create from "zustand";
import produce from "immer";

// expense store that will be used for recent expences and all expenses
export const useExpense = create((set) => ({
  expenses: [],
  addExpense: (expenseData) =>
    set(
      produce((draft) => {
        draft.expenses.push(expenseData);
      })
    ),
  setExpense: (expensesData) => set({ expenses: expensesData.reverse() }),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id != id),
    })),
  updateExpense: (id, expenseData) =>
    set(
      produce((draft) => {
        const updateExpenseIndex = draft.expenses.findIndex(
          (expense) => expense.id === id
        );
        const updatableExpense = draft.expenses[updateExpenseIndex];
        const updatedItem = { ...updatableExpense, ...expenseData };
        const updatedExpenses = [...draft.expenses];
        updatedExpenses[updateExpenseIndex] = updatedItem;
        draft.expenses = updatedExpenses;
      })
    ),
}));

// useCalendar store will be the one to manage the calendar days
export const useCalendar = create((set) => ({
  calendar: {},
  addCalendar: (title, amount, date) =>
    set(
      produce((draft) => {
        if (!draft.calendar.hasOwnProperty(date)) {
          draft.calendar[date] = [];
          draft.calendar[date].push({
            title: title,
            amount: amount,
            date: date,
          });
        } else {
          draft.calendar[date].push({
            title: title,
            amount: amount,
            date: date,
          });
        }
      })
    ),
  setCalendar: (calendarData) => set({ calendar: calendarData }),
  deleteCalendar: (index, date) =>
    set(
      produce((draft) => {
        draft.calendar[date].splice(index, 1);
      })
    ),
  updateCalendar: (title, amount, date, index) =>
    set(
      produce((draft) => {
        draft.calendar[date].splice(index, 1, {
          title: title,
          amount: amount,
          date: date,
        });
      })
    ),
}));

// useBudget mamages the budget of the user
export const useBudget = create((set) => ({
  budget: [],
  addBudget: (budgetData) =>
    set(
      produce((draft) => {
        draft.budget.push(budgetData);
      })
    ),
  setBudget: (budgetData) => set({ budget: budgetData }),
  updateBudgetBalance: (balance, index) =>
    set(
      produce((draft) => {
        const updatableBudget = draft.budget[index];
        const updatableItem = { ...updatableBudget, ...balance };
        const updatedBudget = [...draft.budget];
        updatedBudget[index] = updatableItem;
        draft.budget = updatedBudget;
      })
    ),
}));

// useUser manages the new users that enters
export const useUser = create((set) => ({
  email: "",
  password: "",
  setUser: (email, passw) => set({ email: email, password: passw }),
  addUser: (email, password) => set({ email: email, password: password }),
}));

// This object will how the information will be saved
// export const user = {
//   email: useUser((state) => state.email),
//   password: useUser((state) => state.password),
//   expenses: useExpense((state) => state.expenses),
//   calendar: useCalendar((state) => state.calendar),
//   budget: useBudget((state) => state.budget),
// };
