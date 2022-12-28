import { React } from "react";
import { Link } from "react-router-dom";

function Diary({id, title, notes, journalDate}) {
  //console.log(title);
  // your link creation
  const newTo = {
    pathname: "/notes",
    param1: notes,
    param2: id
  };
  return (
    <div className="diary">
      <br />
      {journalDate} -  {title}
      <br />
      <Link
        to={newTo}
        state={{"notes":"hello"}}
      >
        Click here to view
      </Link>
    </div>
  )
}

export default Diary;