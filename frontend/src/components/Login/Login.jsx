import NavBar from "../NavBar/NavBar";
import "./Login.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import localLogin from "../../actions/login";
import localSignup from "../../actions/signup";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [error, setError] = useState({ emailError: false, passError: false });
  const [signup, setSignup] = useState(false);

  const validateEmail = (input) => {
    return {
      error: !/\S+@\S+\.\S+/.test(input),
      message: !/\S+@\S+\.\S+/.test(input) ? "Please enter a valid email" : "",
    };
  };

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setFullName({ ...fullName, [e.target.name]: e.target.value });
    setError({
      emailError: validateEmail(inputs.username).error,
      passError: !inputs.password.length,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (signup) {      
      dispatch(localSignup(inputs));
      history.push("/");
      return;
    }
    dispatch(localLogin(inputs));
    setInputs({ username: "", password: "" });
    setFullName({ firstName: "", lastName: "" });
    history.push("/");
  }

  function handleSignup() {
    setSignup(!signup);
  }

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>{signup ? "SIGN UP" : "LOGIN"}</h1>
        <form action="" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <TextField
              onChange={(e) => handleChange(e)}
              error={error.emailError}
              id="email"
              name="username"
              label="E-mail"
              value={inputs.username}
              variant="outlined"
              helperText={validateEmail(inputs.username)?.message}
            />
          </div>
          {signup && (
            <>
              <div>
                <TextField
                  onChange={(e) => handleChange(e)}
                  id="firstName"
                  name="firstName"
                  label="First name"
                  value={fullName.firstName}
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => handleChange(e)}
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  value={fullName.lastName}
                  variant="outlined"
                />
              </div>
            </>
          )}
          <div>
            <TextField
              onChange={(e) => handleChange(e)}
              id="password"
              name="password"
              label="Password"
              value={inputs.password}
              variant="outlined"
              type="password"
            />
          </div>

          <div>
            <Button
              variant="contained"
              color="primary"
              disabled={!error.usernameError && !error.passError ? false : true}
              type="submit"
            >
              {signup ? "Sign up" : "Login"}
            </Button>
          </div>
        </form>

        <div className="LoginDiv">
          <a href="http://localhost:8001/auth/google"> google</a>
          {signup ? "Sign up" : "Log in"} with Google
          <div>
            <button
              onClick={handleSignup}
              disabled={!error.usernameError && !error.passError ? false : true}
            >
              {signup
                ? "Already have an account? Login"
                : "Are you new here? Create an account"}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
