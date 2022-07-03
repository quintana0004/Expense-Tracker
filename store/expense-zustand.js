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
  resetExpense: () => set({ expenses: [] }),
}));

// useCalendar store will be the one to manage the calendar days
export const useCalendar = create((set) => ({
  calendar: {},
  addCalendar: (title, amount, date, id) =>
    set(
      produce((draft) => {
        if (!draft.calendar.hasOwnProperty(date)) {
          draft.calendar[date] = [];
          draft.calendar[date].push({
            title: title,
            amount: amount,
            date: date,
            id: id,
          });
        } else {
          draft.calendar[date].push({
            title: title,
            amount: amount,
            date: date,
            id: id,
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
  updateCalendar: (title, amount, date, index, id) =>
    set(
      produce((draft) => {
        draft.calendar[date].splice(index, 1, {
          title: title,
          amount: amount,
          date: date,
          id: id,
        });
      })
    ),
  resetCalendar: () => set({ calendar: {} }),
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
  updateBudgetBalance: (balance, id) =>
    set(
      produce((draft) => {
        const updateBudgetIndex = draft.budget.findIndex(
          (budgets) => budgets.id === id
        );
        const updatableBudget = draft.budget[updateBudgetIndex];
        const updatableItem = { ...updatableBudget, ...balance };
        const updatedBudget = [...draft.budget];
        updatedBudget[updateBudgetIndex] = updatableItem;
        draft.budget = updatedBudget;
      })
    ),
  resetBudget: () => set({ budget: [] }),
}));

// useUser manages the new users that enters
export const useUser = create((set) => ({
  email: "",
  password: "",
  userId: "",
  setUser: (email, passw, userid) =>
    set({ email: email, password: passw, userId: userid }),
  addUser: (email, password, userid) =>
    set({ email: email, password: password, userId: userid }),
  resetUser: () => set({ email: "", password: "", userId: "" }),
}));
