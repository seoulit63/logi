import React from "react";
import { TextField } from "@material-ui/core";

const FinancialStatementsMenu = ({ date, setDate }) => {
  const onChange = event => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
    });
  };
  console.log(date);
  return (
    <React.Fragment>
      <fieldset>
        <legend> [ 검색조건 ] </legend>
        <TextField color="secondary" name="approvalDate" type={"date"} onChange={onChange}/>
      </fieldset>      
    </React.Fragment>
  );
};

export default  FinancialStatementsMenu;
