import React, {useState} from "react";
import "./CreateDiary.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { useHistory, useLocation } from "../../../node_modules/react-router-dom/index";

function CreateDiary() {
  const location = useLocation();
  const history = useHistory();
  const token = location.state.hasOwnProperty("token") ? location.state.token : null;
  const [startDate, setStartDate] = useState(new Date());
  //const [result, setResult] = useState("");
  const [journalDate, setJournalDate] = useState("");
  const [notesId, setNotesId] = useState("");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const SaveDiary = (async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var formdata = new FormData();
    const json = JSON.stringify({
      title: title,
      journalDate: startDate,
      notes: notes
    });
    const blob = new Blob([json], {
      type: 'application/json'
    });
    formdata.append("diary", blob);
    if (selectedImage != null) {
      formdata.append("file", selectedImage, null);
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:8385/diary/create", requestOptions)
        .then(response => response.text())
      .then(result => {
        console.log('res-', result);
        //notesId = result.data.id;
        setNotesId(result.id);
        //console.log(notesId);
        setJournalDate(startDate);
        //console.log(journalDate);
        setError(result.error);
        })
        .catch(error => console.log('error', error));

    if (error) {
      alert("Unable to create-", error);
    }
    else {
      alert("Your memory is saved successfully!");
      history.goBack();
    }

  }
  );


  return (
    <div className="create-diary">
      <br />
        <button
        className="button-54"
        onClick={() => history.goBack()}
        >
        Back
        </button>

        Select Date
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          required
      />

      <span className="input">
        <input
          type="text"
          required
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <span></span>
	    </span>

      <div className="create-diary-inner">
            <textarea
            className="textarea"
            placeholder="Start writing here!"
            onChange={(e) => setNotes(e.target.value)}
            required
          >
          </textarea>

          <form className="profile-img-upload" >
          <h2>Add Image</h2>
          {selectedImage && (
            <div>
            <img alt="not found" width={"300px"} src={URL.createObjectURL(selectedImage)} />
            <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          )}
          <br />

          <br />
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </form>
      </div>


      <button
        className="button"
        onClick={SaveDiary}
      >
        Save
      </button>
      </div>

  )
}

export default CreateDiary;