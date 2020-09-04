import React, { useState } from "react";
import useInputs from "util/useInputs";
import axios from "axios";

import { AgGridReact } from "ag-grid-react";
import { Button, TextField } from "@material-ui/core";

const OrderRegisterList = ({ setContractNo }) => {
  // 사용할 날짜 값 state로 저장
  const [date, onChange] = useInputs({
    fromDate: "",
    toDate: "",
  });
  const { toDate, fromDate } = date;
  const [orderInfo, setOrderInfo] = useState("");

  //이건 클릭 axios 이벤트 나중에 뺄것
  const showOrderInfoGrid = () => {
    if (!fromDate && !toDate) {
      alert("날짜를 선택해주세요 ^^");
      return;
    } else {
      axios
        .get("http://localhost:8282/app/logi/purchase/showOrderInfo.do", {
          params: {
            startDate: fromDate,
            endDate: toDate,
          },
        })
        .then(response => {
          console.log("리스펀스 ", response);
          setOrderInfo(response.data.gridRowJson);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  //입력값 없으면 alert
  const state = {
    columnDefs: [
      {
        headerName: "",
        width: 50,
      },
      { headerName: "발주번호", field: "orderNo", width: 200 },
      { headerName: "발주날짜", field: "orderDate", width: 200 },
      { headerName: "현재상태", field: "orderInfoStatus", width: 200 },
      { headerName: "발주유형", field: "orderSort", width: 200 },
      { headerName: "품목코드", field: "itemCode", width: 200 },
      { headerName: "품목명", field: "itemName", width: 200 },
      { headerName: "발주수량", field: "itemName", width: 200 },
    ],
    rowData: orderInfo,
  };

  // 화면을 구성하는 요소
  return (
    <React.Fragment>
      <div className="ui yellow inverted segment">
        {" "}
        <b> [ 발주현황조회 ] </b>{" "}
      </div>
      <div align="left">
        <TextField
          name="fromDate"
          type={"date"}
          defaultValue={fromDate}
          onChange={onChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          name="toDate"
          type={"date"}
          defaultValue={toDate}
          onChange={onChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={showOrderInfoGrid}
        >
          발주현황조회
        </Button>
      </div>
      <br />
      <div>
        <div
          className={"ag-theme-material"}
          style={{
            height: "500px",
            width: "100%",
          }}
        >
          <AgGridReact columnDefs={state.columnDefs} rowData={state.rowData} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default OrderRegisterList;
