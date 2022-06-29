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
    console.log(response.data[key].email);
    if (response.data[key].email === email) {
      return true;
    } else {
      return false;
    }
  }
}

export async function fetchExistingUser(email, password) {
  const response = await axios.get(BACKEND_URL + "/users.json");

  for (const key in response.data) {
    if (
      response.data[key].email === email &&
      passwordHash.verify(password, response.data[key].password)
    ) {
      return response.data.key;
    }
  }
}

export async function fetchExpenses(userId) {}

export async function fetchCalendar(userId) {}

export async function fetchBudget(userId) {}
