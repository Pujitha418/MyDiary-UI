import React from "react";
import './Login.css';
import { useState } from 'react';
import axios from "axios";
import { useHistory } from "../../../node_modules/react-router-dom/index";

function Login() {
  const [userObj, setUserObj] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isAdmin, setIsAdmin] = useState("");
  const history = useHistory();

  let handleEmailAddressChange = event =>
    setEmail(event.target.value);

  let handlePasswordChange = event =>
    setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('inside handleSubmit');
    const credentials = { "email": email, "password": password };

    axios.post('http://localhost:8385/user/login', credentials)
      .then(response => {
        setUserObj(response.data);
        console.log(response.headers);
        setIsAdmin(response.headers.isAdmin);
        localStorage.setItem("user", JSON.stringify( response.data));
        localStorage.setItem("userIsAdmin", "false");
      })
      ;
    console.log("printing userObj");
    console.log(userObj );
    setUserObj(userObj);


    //history.push(`/home`, userObj=userObj);
    history.push({
      pathname: '/home',
      search: '',  // query string
      state: {  // location state
        userObj: userObj,
        isAdmin: isAdmin
      },
    });
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email </label>
          <input
            type="text"
            name="email"
            onChange = {handleEmailAddressChange}
          required />

        </div>

          <div className="input-container">
            <label>Password </label>
          <input
            type="password"
            name="pass"
            onChange = {handlePasswordChange}
            required
          />

        </div>

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Login;