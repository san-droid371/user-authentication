import { useState } from "react";
import axios from "axios";
import "./App.css";

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };
      let response;
      if (isSignUp) {
        response = axios.post(
          "http://localhost:8080/api/v1/auth/user-registration",
          { ...payload, full_name: formData.full_name }
        );
      } else {
        response = axios.post(
          "http://localhost:8080/api/v1/auth/user-login",
          payload
        );
      }
      console.log("response:", response.data);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  const buttonText = loading
    ? isSignUp
      ? "Registering..."
      : "Logging In..."
    : isSignUp
    ? "Register"
    : "Login";
  const toggleFormDesc = isSignUp
    ? "Already have an account? Login In"
    : "New Here? Register";

  return (
    <div className="main-container">
      <div className="auth-form-container">
        <div className="form-container">
          <h2>{isSignUp ? "Create your account" : "Log In"}</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            )}

            <button type="submit" className="btn" disabled={loading}>
              {buttonText}
            </button>
          </form>

          <p className="toggle-link" onClick={toggleForm}>
            {toggleFormDesc}
          </p>
        </div>
        <div className="form-img">
          <img src="/assets/login.png" alt="back" />
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
