import React, { useState } from "react";
import JournalFormGrid from "./JournalFormGrid";
import JournalFormMenu from "./JournalFormMenu";

const JournalForm = () => {
  document.title = "분개장";
  const [ date, setDate ] = useState({
    startDate: "",
    endDate: ""
  });
  
  return (
    <React.Fragment>
      <JournalFormMenu date={date} setDate={setDate} />
      <JournalFormGrid date={date} />
    </React.Fragment>
  );
};


export default JournalForm;
