import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { useDispatch, useSelector } from "react-redux";
import * as types from "ERP/ACCOUNT/ActionType/ActionType";

import { makeStyles } from "@material-ui/core";

import { AppBar } from "@material-ui/core";

import SearchButton from "./SearchButton";
//********************************** 2020-08-24 정대현 추가 **********************************
const CashJournalGrid = ({ headInfo, today }) => {
  const { fromDate, toDate } = headInfo; // props로 받아온 headInfo의 상태 값을 비구조 할당.
  const classes = useStyles(); // 스타일 먹임

  const data = useSelector(({ AccReducer }) => AccReducer.cashJournalList, [
    fromDate,
    toDate,
  ]);
  const dispatch = useDispatch();

  //========================== 그리드 객체 준비 ==========================
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit(); // 그리드 초기화 시 칼럼 사이즈 자동조절.
  }; // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.

  //========================== 그리드내용 ==========================
  const accountColumnDefs = [
    { headerName: "", field: "monthReportingDate", width: 70 },
    { headerName: "일자", field: "reportingDate", width: 80 },
    { headerName: "적요", field: "expenseReport", width: 110 },
    { headerName: "거래처", field: "customerCode", width: 50 },
    { headerName: "거래처명", field: "customerName", width: 70 },
    { headerName: "입금", field: "deposit", width: 70 },
    { headerName: "출금", field: "withdrawal", width: 70 },
    { headerName: "잔액", field: "balance", width: 100 },
  ];

  //========================== 조회 ==========================
  const getCashJournalList = async (e) => {
    dispatch({
      type: types.SEARCH_CASHJOURNAL_REQUEST,
      params: {
        fromDate: fromDate,
        toDate: toDate,
      },
    });
  }; // 전표조회 버튼 클릭했을 때 파라미터 가져가서 전표 데이터 들고와서 setData 해줌.

  return (
    <>
      <SearchButton getCashJournalList={getCashJournalList} />
      <AppBar position="relative" className={classes.subCategory}></AppBar>
      <div
        className={"ag-theme-balham"}
        style={{
          height: "600px",
          width: "100%",
          paddingTop: "20px",
        }}
      >
        <AgGridReact
          columnDefs={accountColumnDefs}
          rowData={data} // setData된 state를 결국 여기 넣어서 그리드에 표현함.
          onGridReady={onGridReady}
        />
      </div>
      <br />
    </>
  );
};

// 스타일 관련
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    height: 330,
    width: 1190,
  },
  subCategory: {
    background: "#232f3e",
    color: "white",
  },
}));
export default CashJournalGrid;
