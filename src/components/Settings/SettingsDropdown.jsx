import React from "react";
import "./Settings.css"

function SettingsDropdown(props) {
  const { k, v } = props;
  console.log(props);
  return (
    <div className="prefs">
      {k} : {v}
    </div>
  )
}

export default SettingsDropdown;