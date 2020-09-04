import React, { useState, useEffect } from "react";
import useInputs from "util/useInputs";
import axios from "axios";

import ShowOrderDialog from "./ShowOrderDialog";

import { AgGridReact } from "ag-grid-react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const OrderRegister = ({ estimateNo, setEstimateNo, searchCode }) => {
  const [mrpGatheringNo, setMrpGatheringNo] = useState([]);
  // 사용할 날짜 값 state로 저장
  const [date, onChange] = useInputs({
    fromDate: "",
    toDate: "",
  });
  const { toDate, fromDate } = date;
  const [orderList, setOrderList] = useState("");
  const [showOrderList, setShowOrderList] = useState([]);

  const showOrderListGrid = () => {
    if (!fromDate && !toDate) {
      alert("날짜를 선택해주세요 ^^");
      return;
    } else {
      var url =
        "http://localhost:8282/logi/purchase/getOrderList.do?startDate=" +
        fromDate +
        "&endDate=" +
        toDate;
      axios
        .get(url)
        .then(response => {
          console.log("리스펀스 ", response);
          setOrderList(response.data.result);
          console.log(orderList);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const onRowSelected = params => {
    var gridApi = params.api;
    setShowOrderList(gridApi.getSelectedRows());
  };

  useEffect(() => {
    setMrpGatheringNo([]);
    var newArray = [];
    showOrderList.forEach(element => newArray.push(element.mrpGatheringNo));
    setMrpGatheringNo(newArray);
  }, [showOrderList]);

  const state = {
    columnDefs: [
      {
        headerName: "",
        field: "check",
        width: 50,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      { headerName: "소요량취합번호", field: "mrpGatheringNo", width: 200 },
      { headerName: "품목코드", field: "itemCode", width: 200 },
      { headerName: "품목명", field: "itemName", width: 200 },
      { headerName: "단위", field: "unitOfMrp", width: 200 },
      { headerName: "필요수량", field: "requiredAmount", width: 200 },
      { headerName: "현재고량", field: "stockAmount", width: 200 },
      { headerName: "발주기한", field: "orderDate", width: 200 },
      { headerName: "입고기한", field: "requiredDate", width: 200 },
    ],
    defaultColDef: {
      resizable: true,
    },
    rowSelection: "multiple",
    rowData: orderList,
  };

  // 모달창 옵션들
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 1000,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const handleOpen = () => {
    console.log(mrpGatheringNo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showDialog = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">발주 시뮬레이션</h2>
      <p id="simple-modal-description"></p>
      <ShowOrderDialog mrpGatheringNo={mrpGatheringNo} />
    </div>
  );

  // 화면을 구성하는 요소
  return (
    <React.Fragment>
      <div className="ui red inverted segment">
        {" "}
        <b>[ 취합발주 / 발주필요품목검색 (BY MRP_G) ]</b>{" "}
      </div>
      <br />
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
          onClick={showOrderListGrid}
        >
          재고처리 / 발주필요 목록조회
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant={"outlined"} color={"secondary"} onClick={handleOpen}>
          모의재고처리 및 취합발주
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {showDialog}
        </Modal>
      </div>
      <br />
      <div className="ui red inverted segment">
        {" "}
        <b>[ 임의발주 품목검색/수량 입력 ]</b>{" "}
      </div>
      <br />
      <div align="left">
        <TextField id="outlined-basic2" label="코드검색" variant="outlined" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TextField id="outlined-basic1" label="수량" variant="outlined" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={showOrderListGrid}
        >
          임의 발주
        </Button>
      </div>
      <br />
      <div
        className={"ag-theme-material"}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <AgGridReact
          columnDefs={state.columnDefs}
          defaultColDef={state.defaultColDef}
          rowData={state.rowData}
          rowSelection={state.rowSelection}
          onSelectionChanged={onRowSelected}
          rowMultiSelectWithClick={true}
        />
      </div>
    </React.Fragment>
  );
};

export default React.memo(OrderRegister);
