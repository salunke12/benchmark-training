"use strict";
var _a;
// Hardcoded admin credentials (for demo purposes)
const ADMIN_CREDENTIALS = {
    username: "123",
    password: "123",
};
// Handle admin login
(_a = document
    .getElementById("admin-login-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username")
        .value;
    const password = document.getElementById("password")
        .value;
    const errorMessage = document.getElementById("error-message");
    if (username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "index.html"; // Redirect after login
    }
    else {
        if (errorMessage) {
            errorMessage.textContent = "Invalid Username or Password!";
        }
    }
});
// Check if admin is logged in
function isAdminLoggedIn() {
    return localStorage.getItem("isAdminLoggedIn") === "true";
}
// Logout function
function logoutAdmin() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "index.html"; // Redirect to login
}
//# sourceMappingURL=admin.js.map