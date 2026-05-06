export function loginUser(user) {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("user", JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
}

export function isUserAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}
