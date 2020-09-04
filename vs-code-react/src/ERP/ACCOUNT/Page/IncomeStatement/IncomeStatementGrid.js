import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_INCOME_REQUEST } from "../../ActionType/ActionType";

const IncomeStatementGrid = ({ date }) => {
  console.log(JSON.stringify(date) + "1111111111111");
  // prop 값을 사용하기 편하게 비구조 할당
  const dispatch = useDispatch();
  const { approvalDate } = date;
  const data = useSelector(({ AccReducer }) => AccReducer.IncomeList, []); //2020-08-31 수정 
  // const { data } = useSelector((state) => state.AccReducer);
  const { error } = useSelector((state) => state.AccReducer);
  const { isLoading } = useSelector((state) => state.AccReducer);

  const selectData = async () => {
    console.log("손익계산서 조회" + approvalDate);
    await dispatch({
      type: SEARCH_INCOME_REQUEST,
      params: { date: approvalDate },
    });
  };

  const IncomeStatementGrid = [
    // 칼럼정의
    {
      headerName: "번호",
      field: "accountInnerCode",
      hide: true,
    },
    {
      headerName: "계정명",

      field: "accountName",
      sortable: true, //컬럼눌러서 정렬가능하게하기
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "당기 합계금액",
      field: "incomeSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"₩"',
    },
    {
      headerName: "전기 합계금액",
      field: "earlyIncomeSummary",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"₩"',
    },
  ];

  return (
    <>
      <br />
      <div align="right">
        <Button
          size="large"
          variant="contained"
          color="primary"
          disableElevation
          onClick={selectData}
          startIcon={<FindInPageIcon />}
        >
          조회
        </Button>
      </div>

      <div
        className={"ag-theme-material"}
        skipHeaderOnAutoSize="true"
        enableColResize="true"
        enableSorting="true"
        enableFilter="true"
        enableRangeSelection="true"
        rowStyle={{ "text-align": "center" }}
        style={{
          height: "500px",
          width: "100%",
          paddingTop: "25px",
          float: "center",
        }}
        cellStyle={{ textAlign: "center" }}
      >
        {!isLoading ? (
          <AgGridReact
            columnDefs={IncomeStatementGrid}
            rowData={data}
            rowSelection="single"
            getRowStyle={function (param) {
              //가운데
              if (param.node.rowPinned) {
                return { "font-weight": "bold", background: "#dddddd" };
              }
              return { "text-align": "center" };
            }}
            onGridReady={(event) => {
              event.api.sizeColumnsToFit();
            }}
            // onGridReady={onGridReady}
            // onCellClicked={onCellClicked}
          />
        ) : (
          <h1 align="center">로딩중</h1>
        )}
      </div>
    </>
  );
};

export default IncomeStatementGrid;
