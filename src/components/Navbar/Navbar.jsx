import React, {useCallback, useState, useEffect} from "react";
import './Navbar.css';
import { Link, withRouter, } from "react-router-dom";

function Navbar() {
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    console.log("get from localStorage- ");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUserObj(foundUser);
    }
  }, []);

  const navbarMapMain = {
    "Home": "/home",
    //"Register/Login": "/login",
    "About us": "/about"
  };
  const navbarList = Object.keys(navbarMapMain);

  const navbarMapUser = {
    "Preferences": "/settings",
    "Logout": "/logout"
  };
  const userNavbarList = Object.keys(navbarMapUser);

  const navbarMapLoggedOutUser = {
    "Register/Login": "/login"
  };
  const loggedoutUserNavbarList = Object.keys(navbarMapLoggedOutUser);

  /*const handleClick = useCallback((menuUrl) => {
    //history.push(`/${menuUrl}`)
    //history.push(`/home`)
    console.log('inside handleClick-',menuUrl);
    //this.history.pushState(null, "${menuUrl}");
  }, []);*/

  return (
    <div className="navbar-main">
        <div className="navbar-common">
        {
          navbarList.map((item) => (
            <div
              className="navbar-inner"
              key={item}
              //onClick={() => { handleClick(navbarMapMain[item])}}
            >
              <Link
                to={navbarMapMain[item]}
                className="navbar-link"
                //style={{ textDecoration: 'none', TextTrack: 'none', color:"black"}}
              >
                {item}
              </Link>
            </div>
          ))
      }
      </div>

      {
        userObj && userObj.hasOwnProperty("email") &&
              <div className="navbar-user">
              {
                userNavbarList.map((item) => (
                  <div
                    className="navbar-inner"
                    key={item}
                    //onClick={() => { handleClick(navbarMapMain[item])}}
                  >
                    <Link
                      to={navbarMapUser[item]}
                      className="navbar-link"
                      //style={{textDecoration:'none', TextTrack: 'none', color:"black"}}
                    >
                      {item}
                    </Link>
                  </div>
                ))
              }
              </div>
        }

        {
          (!userObj || !userObj.hasOwnProperty("email")) &&
            <div className="navbar-no-user">
            {
              loggedoutUserNavbarList.map((item) => (
                <div
                  className="navbar-inner"
                  key={item}
                >
                  <Link
                    to={navbarMapLoggedOutUser[item]}
                    style={{textDecoration:'none', TextTrack: 'none', color:"black"}}
                  >
                    {item}
                  </Link>
                </div>
              ))
          }
          </div>
        }

    </div>

  )
}

export default withRouter( Navbar);