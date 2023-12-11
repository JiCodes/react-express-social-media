import { useState } from "react";

import { MESSAGES } from "./constants";

import "./LoginForm.css";

function LoginForm({ onLogin, error }) {
  const [username, setUsername] = useState("");
  const errorMessage = MESSAGES[error] || MESSAGES.default;
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const usernameError = isUsernameValid
    ? ""
    : MESSAGES["username-invalid"];

  function handleInputChange(e) {
    setUsername(e.target.value);
    setIsUsernameValid(checkIsUsernameValid(e.target.value));
  }

  function checkIsUsernameValid(username) {
    const regex = /^[a-zA-Z0-9_]{1,16}$/;
    return regex.test(username);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  }

  return (
    <div className="login-page">
      <header className="header">
        <h1 className="login-title">Log in with username</h1>
      </header>

      <main className="main">
        <form action="#/login" className="login-form" onSubmit={onSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={handleInputChange}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {!error && usernameError && (
            <p className="login-error-message">{usernameError}</p>
          )}
          {error && <p className="login-error-message">{errorMessage}</p>}
        </form>
      </main>

      <footer className="footer">
        <p>
          This page is protected by Google reCAPTCHA to ensure you are not a
          bot.
        </p>
      </footer>
    </div>
  );
}

export default LoginForm;
