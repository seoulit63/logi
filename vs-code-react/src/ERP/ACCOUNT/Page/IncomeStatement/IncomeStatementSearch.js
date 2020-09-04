import React from "react";
import { TextField } from "@material-ui/core";

const IncomeStatementSearch = ({ date, setDate }) => {
  const onChange = event => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <div Align="center">
        <fieldset>
          <legend> [ 검색조건 ] </legend>
          <TextField name="approvalDate" type={"date"} onChange={onChange} />
        </fieldset>
      </div>
    </React.Fragment>
  );
};

export default IncomeStatementSearch;
