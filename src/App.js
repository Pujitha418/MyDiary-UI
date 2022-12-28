import './App.css';
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from './components/Login/Login';
import About from './components/About/About';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "../node_modules/react-router-dom/index";
import CreateDiary from './components/Diary/CreateDiary';
import DiaryNotes from './components/Diary/DiaryNotes';
import Settings from './components/Settings/Settings';
import Logout from './components/Logout/Logout';
import ImageUpload from './components/FileUpload/ImageUpload';

function App() {
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

  return (
    <Router>
    <div className="App">
        <Navbar />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          {(!userObj || !userObj.hasOwnProperty("email")) &&
            <Route path="/login" component={Login} />}

          <Route path="/create-diary">
            <CreateDiary />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/notes">
            <DiaryNotes />
          </Route>

          <Route path="/add">
            <CreateDiary />
          </Route>

          <Route path="/settings">
            <Settings />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

          <Route path="/uploadProfile">
            <ImageUpload />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
    </Router>

  );
}

export default App;
