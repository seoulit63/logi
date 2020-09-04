import React from "react";
import AttdApplComp from "./AttdApplComp";

//************************* 결제승인관리 시작 _준서 *************************
const AttendanceApploval = (props) => {
  console.log("<< AttendanceApploval.js >>");
  console.log(props);
  return (
    <div>
      <AttdApplComp />
    </div>
  );
};

export default AttendanceApploval;
//************************* 결제승인관리 종료 _준서 *************************
