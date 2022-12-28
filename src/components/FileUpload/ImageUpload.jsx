import React, { useState } from "react";
import "./ImageUpload.css";
import { useHistory } from "../../../node_modules/react-router-dom/index";

function ImageUpload(props) {
  const { url } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  //const userObj = localStorage.getItem("user");
  const token = JSON.parse(localStorage.getItem("user")).token;
  const history = useHistory();

  const upload = (async (url) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var formdata = new FormData();
    formdata.append("file", selectedImage, "Screenshot 2022-11-30 at 4.07.53 PM.png");

    console.log(selectedImage.name);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:8385/user/profilePicture?name="+selectedImage.name, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => localStorage.setItem("error", JSON.stringify(error)));

    //history.goBack();
    history.push("/settings")
  });

  return (
    <form className="profile-img-upload" >
      <h1>Select an image & Upload</h1>
      {selectedImage && (
        <div>
        <img alt="not found" width={"300px"} src={URL.createObjectURL(selectedImage)} />
        <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
          <button
            onClick={() => upload(url)}
          >
            Upload
          </button>
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
  )

}

export default ImageUpload;