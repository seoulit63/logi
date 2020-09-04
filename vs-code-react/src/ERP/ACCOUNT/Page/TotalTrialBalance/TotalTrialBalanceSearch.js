import React from "react";
import { TextField } from "@material-ui/core";

const TotalTrialBalanceSearch = ({ date, setDate }) => {
  const onChange = event => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <fieldset>
        <legend> [ 검색조건 ] </legend>
        <TextField name="approvalDate" type={"date"} onChange={onChange} />
        {/* <TextField
          name="toDate"
          type={"date"}
          onChange={onChange}
        /> */}
      </fieldset>
    </React.Fragment>
  );
};

export default TotalTrialBalanceSearch;
