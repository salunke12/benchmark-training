const ADMIN_CREDENTIALS = {
  username: "123",
  password: "123",
};

// Handle admin login
document
  .getElementById("admin-login-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const errorMessage = document.getElementById("error-message");

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "index.html"; // Redirect after login
    } else {
      if (errorMessage) {
        errorMessage.textContent = "Invalid Username or Password!";
      }
    }
  });
