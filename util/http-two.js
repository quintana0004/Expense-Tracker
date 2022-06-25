import axios from "axios";

const BACKEND_URL = "https://expense-1511c-default-rtdb.firebaseio.com";

export async function storeUser(user) {
  const response = await axios.post(BACKEND_URL + "/users.json", user);
  const id = response.data.name;
  return id;
}

export async function fetchUserInfo(email, password) {}

export async function checkUserIfCreated(email, password) {}

export async function updateUser(user) {}

export async function deleteInfoUser(name, data) {}
