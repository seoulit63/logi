import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import { AgGridReact } from "ag-grid-react";
import { Button, TextField } from "@material-ui/core";

const ShowOrderDialog = ({ mrpGatheringNo }) => {
  console.log("kkk");
  console.log(mrpGatheringNo);
  const [orderList, setOrderList] = useState("");

  const today = moment().format("yyyy-MM-DD");

  console.log("ㅇ잉");
  useEffect(() => {
    var url =
      "http://localhost:8282/logi/purchase/showOrderDialog.do?mrpGatheringNoList=" +
      mrpGatheringNo;
    axios
      .get(url)
      .then(response => {
        console.log("리스펀스 ", response);
        setOrderList(response.data.result);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  // axios
  //   .get("http://localhost:8282/app/logi/purchase/showOrderDialog.do", {
  //     params: {
  //       mrpGatheringNoList: mrpGatheringNo,
  //     },
  //   })
  //   .then(response => {
  //     console.log("리스펀스 ", response);
  //     setOrderList(response.data.result);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });

  const showOrderListGrid = () => {};

  const state = {
    columnDefs: [
      { headerName: "아이템코드", field: "itemCode", width: 200 },
      { headerName: "아이템이름", field: "itemName", width: 200 },
      { headerName: "단위", field: "unitOfMrp", width: 200 },
      { headerName: "총발주필요량", field: "requiredAmount", width: 200 },
      { headerName: "사용가능재고량", field: "stockAmount", width: 200 },
      {
        headerName: "실제발주필요량",
        field: "calculatedRequiredAmount",
        width: 200,
      },
      { headerName: "단가", field: "standardUnitPrice", width: 200 },
      { headerName: "합계금액", field: "sumPrice", width: 200 },
    ],
    rowData: orderList,
  };

  // 화면을 구성하는 요소
  return (
    <React.Fragment>
      <div className="ui red inverted segment"> </div>
      <br />
      <div align="left">
        <TextField type={"date"} defaultValue={today} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={showOrderListGrid}
        >
          현재 전개된 결과 발주 및 재고처리
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <br />
      <div
        className={"ag-theme-material"}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <AgGridReact columnDefs={state.columnDefs} rowData={state.rowData} />
      </div>
    </React.Fragment>
  );
};

export default ShowOrderDialog;
