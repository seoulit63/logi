import React, { useState } from "react";
import DetailTrialBalanceGrid from "./DetailTrialBalanceGrid";
import DetailTrialBalanceMenu from "./DetailTrialBalanceMenu";

///////////////////////// 2020-08-24 김진호 추가 ///////////////////////////
const DetailTrialBalance = () => {
  document.title = "일(월)계표";
  const [date, setDate] = useState({
    fromDate: "",
    toDate: "",
  });
  return (
    <React.Fragment>
      <DetailTrialBalanceMenu date={date} setDate={setDate} />
      <DetailTrialBalanceGrid date={date} />
    </React.Fragment>
  );
};

export default DetailTrialBalance;
///////////////////////// 2020-08-24 김진호 추가 ///////////////////////////
