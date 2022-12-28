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
  //console.log('date-', startDate);

  const SaveDiary = (async () => {
    var url;
    var requestBody;
    console.log(notes);
    console.log(journalDate, startDate);
    if (title == null || notes == null) {
      return;
    }
    if (notesId == null || journalDate!=startDate) {
      url = 'http://localhost:8385/diary/create';
      requestBody = {
        title: title,
        journalDate: startDate,
        notes: notes
      };
    }
    else {
      url = 'http://localhost:8385/diary/update';
      requestBody = {
        id: notesId,
        title: title,
        journalDate: startDate,
        notes: notes
      };
    }

    var common_axios = axios.create({
      url
    });
    // Set default headers to common_axios ( as Instance )
    common_axios.defaults.headers.common['Authorization'] = token;
    //common_axios.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:3000";
    common_axios.defaults.headers.common['Access-Control-Allow-Methods'] = "POST";
    common_axios.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Authorization";

    // Check your Header
    console.log('headers - ', common_axios.defaults.headers);

    const result = await common_axios.post(url, requestBody);
    console.log('res-', result.data.id);
    //notesId = result.data.id;
    setNotesId(result.data.id);
    console.log(notesId);
    setJournalDate(startDate);
    console.log(journalDate);
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

      <textarea
        className="textarea"
        placeholder="Start writing here!"
        onChange={(e) => setNotes(e.target.value)}
        required
      >
      </textarea>

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