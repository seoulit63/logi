import React from "react";
import { TextField } from "@material-ui/core";

///////////////////////// 2020-08-24 김진호 추가 ///////////////////////////
const DetailTrialBalanceMenu = ({ date, setDate, setGrid }) => {
  const onChange = (event) => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <h1>일(월)계표</h1>
      <fieldset>
        <legend> [ 검색조건 ] </legend>
        <TextField name="fromDate" type={"date"} onChange={onChange} />
        <TextField name="toDate" type={"date"} onChange={onChange} />
      </fieldset>
    </React.Fragment>
  );
};

export default DetailTrialBalanceMenu;
///////////////////////// 2020-08-24 김진호 추가 ///////////////////////////
