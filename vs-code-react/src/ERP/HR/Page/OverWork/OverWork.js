import React from "react";
import OverWorkComp from "./OverWorkComp";

//*************************외출 및 조퇴 시작 _준서 _20.08.24 *************************
const OverWork = (props) => {
  console.log("<< RestAttendance.js >>");
  console.log(props);
  return (
    <div>
      <OverWorkComp />
    </div>
  );
};

export default OverWork;
//*************************외출 및 조퇴 종료 _준서 _20.08.24 *************************
