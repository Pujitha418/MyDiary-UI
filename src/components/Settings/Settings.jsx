import React, { useState } from "react";
import { useHistory, useLocation } from "../../../node_modules/react-router-dom/index";
import useApi from "../../hooks/useApi";
import useApiImage from "../../hooks/useApiImage";
import "./Settings.css";
import SettingsDropdown from "./SettingsDropdown";
import userPic from "../../images/user.png";

function Settings({ token }) {
  const location = useLocation();
  //const [displayImageUpload, setDisplayImageUpload] = useState("N");
  //const authToken = 'Bearer ' + token;
  var authToken = (location.state && location.state.hasOwnProperty("token"))
    ? location.state.token
    : null;
  var userObj;
  if (!authToken) {
    userObj = localStorage.getItem("user");
    authToken = JSON.parse(userObj).token;
  }
  const { data: userPreferences, loading, error } = useApi("http://localhost:8385/user/preferences", authToken, null);
  const { data: userAvatar, iloading, ierror } =  useApiImage("http://localhost:8385/user/profilePicture", authToken, null);
  //const userAvatarBase64 = btoa(String.fromCharCode(userAvatar));
  //console.log("prinitnng type-",typeof(userAvatar));
  var avatarBlob = new Blob([userAvatar]);
  var avatarImage = URL.createObjectURL(avatarBlob);

  const history = useHistory();
  var preferences = userPreferences ? userPreferences.hasOwnProperty("preferences") ? userPreferences.preferences : null : null;
  console.log(preferences);
  String.prototype.initCap = function () {
    return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
       return m.toUpperCase();
    });
  };

  if (preferences == null) {
    return (
      <div className="settings">
        Unable to fetch. Please try again!
      </div>
    )
  }
  else {
    return (
      <div className="settings">
        <br />

        <button
          className="button-54"
          onClick={() => history.goBack()}
          >
          Back
        </button>
        <img
          className="user-profile-pic"
          //src={userAvatar?"data:image/png;base64," + userAvatarBase64:userPic}
          src={userAvatar?userAvatar:userPic}
        />
        <button
          className="user-profile-button-54"
          onClick={() => history.push({
            pathname: '/uploadProfile',
            search: '',  // query string
            state: {  // location state
              url: "http://localhost:8385/user/uploadProfilePic"
            },
          })}
          >
          Change picture
        </button>

        <br />
          {Object.keys(preferences).map(key => (
            <div key={key}>
              <SettingsDropdown k={key.replace("_"," ").initCap()} v={preferences[key]} />
              </div>
          ))}
      </div>
  );
  }
}

export default Settings;