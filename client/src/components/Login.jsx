import React, { useState } from "react";
import Auth from "../utils/auth";
import { useDispatch } from "react-redux";
import { login } from "./../features/userSlice"
const Login = (props) => {

  const [formState, setFormState] = useState({ username: "cat", password: "catcat" });
  const [error, setError] = useState('');
  const [loggedIn, setLogin] = useState(false);
  const dispatch = useDispatch();

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
    const {password,username} = formState;
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ password, username })
    // };
    //   console.log(JSON.stringify({ password, username }));
    // const rspnse = await fetch('/users/login/', requestOptions);
    const rspnse = await fetch('/api/users/login/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, username })
    });    
     const rpn = await rspnse.json();
      console.log(rpn);
      if(rpn.auth){
        setLogin(true);
        Auth.login(rpn.token);
        dispatch(login({
          user:rpn.user,
          loggedIn:true
      }))

      }

    // clear form values
    // setFormState({
    //   username: "",
    //   password: "",
    // });
  };
  const checkAuth = async ()=>{
    let token = Auth.getToken()
    
    const rspnse = await fetch('/api/users/auth/', {
      headers: { "Content-Type": "application/json" ,
      "x-access-token":  token
    }});    
    const rpn = await rspnse.json();
    console.log(rpn);
  }
  return (
    <div className="loginCard bg-slate-300">
      <h4 className="loginCardTitle text-xl  m-2 p-1 ">User Login</h4>
        <h1 className="bg-yellow">
          {loggedIn && (
            <button onClick={checkAuth}> Check Login</button>
          )}
        </h1>

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
          
        </form>

      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default Login;
