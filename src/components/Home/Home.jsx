import React, { useEffect, useState } from "react";
import './Home.css';
import { useHistory, useLocation } from "../../../node_modules/react-router-dom/index";
import UserDiary from "../Diary/UserDiary";


function Home() {
  const location = useLocation();
  const history = useHistory();
  const userIsAdmin = localStorage.getItem("userIsAdmin");
  const [userObj, setUserObj] = useState("");

  useEffect(() => {
    console.log("get from localStorage- ");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUserObj(foundUser);
    }
  }, [])

  //console.log(userObj);

  //console.log(location.state);
  //const temp = location.state.hasOwnProperty("userObj") ? location.state.userObj : null;
  //const userIsAdmin = location.state.hasOwnProperty("isAdmin") ? location.state.isAdmin : "false";
  //userObj = userObj.hasOwnProperty("email") ? userObj : temp;

  if (userObj && userObj.hasOwnProperty("email") && userObj.email && userObj.name !== "admin") {
    const { email, id, mobileNumber, name, token } = userObj;
    return (
      <div className="home">
        <div className="title">
          Hello, {name} !
          <div className="button-wrap">
            <button
            className="button-30"
            onClick={() => history.push({
              pathname: '/settings',
              search: '',  // query string
              state: {  // location state
                token: token,
              },
            }) }
          >
            Preferences
          </button>
          </div>

        </div>

        <div className="content">
          <UserDiary token={token} />
        </div>


      </div>
    )
  }
  else if (userObj && userObj.hasOwnProperty("email") && userObj.email && userIsAdmin === "true") {
    return (
      <div className="">
        <h2>Hello Admin, Good Day!</h2>
        <h4>  Here is the list of available tasks:</h4>
        <ul>
          <li>Launch Reminders</li>
          <li>To be added</li>
        </ul>
      </div>
    )
  }
  else {
    return (
      <div className="home">
        <div className="title">
          Welcome to MyDiary!
        </div>

        <div className="content">
          <p>Hey There!</p>
          <br />
          <p>
            If you're looking to capture your daily memories, you landed up in the right place.
            You're just one step away!
                Register yourself and keep writing your day in day out journey.
                You can always look back to see how you evolved from future YOU! &#128578;
            <br />
                Don't worry, all your content is encrypted and safe.
          </p>
        </div>

      </div>
    )
  }

}

export default Home;
