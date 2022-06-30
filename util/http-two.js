import axios from "axios";

const BACKEND_URL = "https://expense-track-c85ef-default-rtdb.firebaseio.com";

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
    console.log("Emails: ", response.data[key].email);
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

export async function fetchExpenses(userId) {}

export async function fetchCalendar(userId) {}

export async function fetchBudget(userId) {}
