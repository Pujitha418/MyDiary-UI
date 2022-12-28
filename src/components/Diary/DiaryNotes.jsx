import { React, useState } from "react";
import { useHistory, useLocation } from "../../../node_modules/react-router-dom/index";
import "./DiaryNotes.css";
import useApiImageReqParam from "../../hooks/useApiImageReqParam";

function DiaryNotes(props) {
  const location = useLocation();
  console.log(location);
  const notes = location.param1;
  const diaryId = location.param2;
  const loggedInUser = localStorage.getItem("user");
  const authToken = "Bearer "+JSON.parse(loggedInUser).token;
  const history = useHistory();
  const requestParam = { "id": diaryId };
  const { data: diaryImage, iloading, ierror } =  useApiImageReqParam("http://localhost:8385/diary/getDiaryImages", authToken, requestParam, null);

  return (
    <div className="diary-notes">
      <button
        className="button-54"
        onClick={() => history.goBack()}
      >
        Back
      </button>

      <div className="diary-content">
        <div className="notes-inner">
          {notes}
        </div>

        {diaryImage &&
          <div className="image-inner">
            <h4>Images</h4>
            <img
            className="images-div"
            src={diaryImage}
            />
          </div>
        }


      </div>

    </div>
  )
}

export default DiaryNotes;