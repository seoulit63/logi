//********************************** 2020-08-24 정대현 추가 **********************************
import React from "react";

import useInputs from "util/useInputs";

import { Paper } from "@material-ui/core";

import CashJournalMenu from "./CashJournalMenu";
import CashJournalGrid from "./CashJournalGrid";

const CashJournal = () => {
  function leadingZeros(n, digits) {
    var zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  }

  let now = new Date();
  let year = now.getFullYear();
  let month = leadingZeros(now.getMonth() + 1, 2);
  let date = leadingZeros(now.getDate(), 2);
  let today = year + "-" + month + "-" + date;

  // headInfo는 전표입력창의 날짜와 상태를 가진 state임.
  const [headInfo, headChange] = useInputs({
    fromDate: "",
    toDate: today, // 위에서 만들어진 오늘 날짜를 그냥 붙이기 위해서 여기 지정값을 넣어줬음.
  });

  return (
    <>
      <h1>현금출납장</h1>
      <Paper>
        <div>
          <CashJournalMenu headInfo={headInfo} headChange={headChange} />
          <CashJournalGrid headInfo={headInfo} />
        </div>
      </Paper>
    </>
  );
};

export default CashJournal;
