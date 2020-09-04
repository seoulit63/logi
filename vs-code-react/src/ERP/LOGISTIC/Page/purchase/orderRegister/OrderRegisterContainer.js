import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
// 커스텀 컴포넌트
import OrderRegister from "./OrderRegister";
import OrderRegisterList from "./OrderRegisterList";

const OrderRegisterContainer = () => {
  // 상태 관리
  const [estimateNo, setEstimateNo] = useState("");
  const [contractNo, setContractNo] = useState("");

  console.log("부모태그 :" + estimateNo, contractNo);

  // tap value에 관한 컴포넌트
  const [value, setValue] = React.useState(0);
  const tabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={tabChange}>
          <Tab label="발주" /> {/* 0 */}
          <Tab label="발주현황" /> {/* 1 */}
        </Tabs>
      </AppBar>
      <div>
        {value === 0 ? ( // true 일 때
          <>
            <br />
            <OrderRegister
              estimateNo={estimateNo}
              setEstimateNo={setEstimateNo}
            />
          </>
        ) : (
          // false 일 때
          <>
            <br />
            <OrderRegisterList setContractNo={setContractNo} />
          </>
        )}
      </div>
    </>
  );
};

export default OrderRegisterContainer;
