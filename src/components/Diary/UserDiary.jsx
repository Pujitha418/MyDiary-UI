import React, { useState } from "react";
import useApi from "../../hooks/useApi";
import Diary from "./Diary";
import "./UserDiary.css";
import { useHistory } from "../../../node_modules/react-router-dom/index";
//import { useLocation } from "../../../node_modules/react-router-dom/index";

function UserDiary({token}) {
  const authToken = 'Bearer ' + token;
  const { data: diariesResult, loading, error } = useApi("http://localhost:8385/diary/searchByUser", authToken, null);
  const history = useHistory();

  console.log("printing user diaries ");
  //const diaries = diariesResult.hasOwnProperty("diaries");
  console.log(diariesResult);
  //console.log(typeof (diariesResult), diariesResult?diariesResult.hasOwnProperty("diaries"):null);
  var diaries = diariesResult ? diariesResult.hasOwnProperty("diaries") ? diariesResult.diaries : null : null;
  console.log(diaries);

  function handleAddMemories() {
    history.push({
      pathname: '/add',
      search: '',  // query string
      state: {  // location state
        token: token,
      },
    });
  }

  console.log(diaries === null);
  if (diaries === null) {
    return (
      <div className="">
        <p>Unable to load memories. Please try again!</p>
      </div>
    );
  }
  else {
    return (
      <>
        <button
          className="add-new-button"
          onClick = {handleAddMemories}
        >
          Add new memories
        </button>
      <h2>Here are your recent memories:</h2>
      {diaries.map(({ id, title, notes, journalDate }) => (
        <div
          key={id}
        >
          <Diary id={id} title={title} notes={notes} journalDate={journalDate}/>
        </div>
      ))}
    </>
    )
  }

}

export default UserDiary;