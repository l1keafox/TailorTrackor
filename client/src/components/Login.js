import React, { useState } from "react";
import Auth from "../utils/auth";

const Login = (props) => {

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState('');

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="loginCard bg-slate-300">
      <h4 className="loginCardTitle text-xl  m-2 p-1 ">User Login</h4>

        <form onSubmit={handleFormSubmit} className="loginFormContainer flex flex-col">
          <input
            className="loginFormInput m-2 p-1"
            placeholder="username"
            name="username"
            type="username"
            value={formState.username}
            onChange={handleChange}
          />
          <input
            className="loginFormInput  m-2 p-1"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            onClick={handleFormSubmit}
            className="loginSubmitBtn  m-2 p-1"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Login 
          </button>
          <hr
            style={{
              height: "1px",
              width: "95%",
              borderWidth: "0",
              color: "black",
              backgroundColor: "black",
            }}
          />
          {/* <button className="createNewAccountBtn" >
            Create Account 
          </button> */}
        </form>


      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default Login;
