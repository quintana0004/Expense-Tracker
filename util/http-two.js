import axios from "axios";

const BACKEND_URL = "https://expense-track-c85ef-default-rtdb.firebaseio.com";

// --- User Functions ---
export async function storeNewUser(email, password) {
  const response = await axios.post(BACKEND_URL + "/users.json", {
    email: email,
    password: password,
  });
  const id = response.data.name;
  return id;
}

export async function checkIfExistingEmail(email) {
  const response = await axios.get(BACKEND_URL + "/users.json");

  for (const key in response.data) {
    if (response.data[key].email === email && email.length !== 0) {
      return false;
    }
  }

  return true;
}

export async function fetchExistingUser(email, password) {
  const response = await axios.get(BACKEND_URL + "/users.json");

  for (const key in response.data) {
    if (
      response.data[key].email === email &&
      response.data[key].password === password
    ) {
      return {
        userID: key,
        email: response.data[key].email,
        password: response.data[key].password,
      };
    }
  }

  return "No-key";
}

// --- Expenses Functions  ---
export async function fetchExpenses(userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/expenses.json`
  );

  const expences = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expences.push(expenseObj);
  }

  return expences;
}

export async function addExpenses(userId, expenseData) {
  const response = await axios.post(
    BACKEND_URL + `/users/${userId}/expenses.json`,
    expenseData
  );

  const id = response.data.name;

  return id;
}

export function deleteExpenses(userId, expenseId) {
  return axios.delete(
    BACKEND_URL + `/users/${userId}/expenses/${expenseId}.json`
  );
}

export function updateExpenses(userId, expenseId, expenseData) {
  return axios.put(
    BACKEND_URL + `/users/${userId}/expenses/${expenseId}.json`,
    expenseData
  );
}

export async function fetchCalendar(userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/calendar.json`
  );

  const calendarExpenses = {};

  for (const key in response.data) {
    let date = response.data[key].date;
    if (!calendarExpenses.hasOwnProperty(date)) {
      calendarExpenses[date] = [];
      calendarExpenses[date].push({
        title: response.data[key].title,
        date: response.data[key].date,
        amount: response.data[key].amount,
        id: key,
      });
    } else {
      calendarExpenses[date].push({
        title: response.data[key].title,
        date: response.data[key].date,
        amount: response.data[key].amount,
        id: key,
      });
    }
  }

  return calendarExpenses;
}

export async function addCalendarExpense(userId, title, amount, date) {
  const response = await axios.post(
    BACKEND_URL + `/users/${userId}/calendar.json`,
    {
      title: title,
      amount: amount,
      date: date,
    }
  );

  const id = response.data.name;
  return id;
}

export function updateCalendarExpense(userId, calendarId, calendarData) {
  console.log("Calendar Id: ", calendarId);
  return axios.put(
    BACKEND_URL + `/users/${userId}/calendar/${calendarId}.json`,
    calendarData
  );
}

export function deleteCalendarExpense(userId, calendarId) {
  return axios.delete(
    BACKEND_URL + `/users/${userId}/calendar/${calendarId}.json`
  );
}

// --- Budget Functions ---
export async function fetchBudgetExpenses(userId) {
  const response = await axios.get(
    BACKEND_URL + `/users/${userId}/budget.json`
  );

  const budgets = [];

  for (const key in response.data) {
    const budgetObj = {
      id: key,
      initialDate: response.data[key].initialDate,
      lastDate: response.data[key].lastDate,
      initialBudget: response.data[key].initialBudget,
      leftbudget: response.data[key].leftbudget,
    };

    budgets.push(budgetObj);
  }

  return budgets;
}

export async function addBudgetExpenses(userId, budgetData) {
  const response = await axios.post(
    BACKEND_URL + `/users/${userId}/budget.json`,
    budgetData
  );

  return response.data.name;
}

export function updateBudgetExpenses(userId, budgetId, budgetData) {
  return axios.put(
    BACKEND_URL + `/users/${userId}/budget/${budgetId}.json`,
    budgetData
  );
}
