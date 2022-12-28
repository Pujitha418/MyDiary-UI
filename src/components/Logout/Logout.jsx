import React, { useState, useEffect } from "react";
import { useHistory } from "../../../node_modules/react-router-dom/index";
import axios from "axios";

function Logout() {
  const history = useHistory();
  const [userObj, setUserObj] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("get from localStorage- ");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUserObj(foundUser);
      console.log(foundUser.token);
      setToken(foundUser.token);
      deleteToken(foundUser.token);
      localStorage.removeItem("user")
      localStorage.removeItem("userIsAdmin")
      history.push("/home");
    }
  }, []);

  const redirect = (() => {
    console.log("inside redirect");
    history.push("/home");
  });

  const deleteToken = (async (token) => {
    console.log('inside deleteToken-', token);
    var url = 'http://localhost:8385/logout';
    var requestBody = userObj;
    console.log(requestBody);

    var common_axios = axios.create({
      url
    });
    // Set default headers to common_axios ( as Instance )
    common_axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
    //common_axios.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:3000";
    common_axios.defaults.headers.common['Access-Control-Allow-Methods'] = "POST";
    common_axios.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Authorization";

    // Check your Header
    console.log('headers - ', common_axios.defaults.headers);

    const result = await common_axios.post(url, requestBody);
    console.log('logged out');
  });

  return (
    <div
      className=""
      onLoad={deleteToken}
    >
      Logged out!

    </div>
  )
}

export default Logout;