import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button } from "@material-ui/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as types from "ERP/ACCOUNT/ActionType/ActionType";

///////////////////////// 2020-08-24 김진호 추가 ///////////////////////////
const DetailTrialBalanceGrid = ({ date }) => {
  // prop 값을 사용하기 편하게 비구조 할당

  const { fromDate, toDate } = date;
  //const [data, setData] = useState([]);

  const data = useSelector(
    ({ AccReducer }) => AccReducer.detailTrialBalanceList,
    [fromDate, toDate],
  );

  const dispatch = useDispatch();

  const selectData = () => {
    console.log("클릭 selectData");
    dispatch({
      type: types.SEARCH_DETAILTRIAL_REQUEST,
      params: {
        fromDate: moment(fromDate).format("yyyy-MM-DD"),
        toDate: moment(toDate).format("yyyy-MM-DD"),
      },
    });
  };

  const formatNumber = number => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const currencyFormatter = params => {
    return "₩" + formatNumber(params.value);
  };

  const DetailTrialBalanceColumnDefs = [
    {
      headerName: "계층",
      field: "lev",
      width: 150,
      hide: "true",
    },
    {
      headerName: "계정내부코드",
      field: "accountInnerCode",
      width: 150,
      hide: "true",
    },
    {
      headerName: "차변",
      children: [
        {
          headerName: "계",
          field: "debitsSum",
          valueFormatter: currencyFormatter,
          width: 175,
          cellStyle: { textAlign: "right" },
        },
        {
          headerName: "대체",
          field: "exceptCashDebits",
          valueFormatter: currencyFormatter,
          width: 172,
          cellStyle: { textAlign: "right" },
        },
        {
          headerName: "현금",
          field: "cashDebits",
          valueFormatter: currencyFormatter,
          width: 172,
          cellStyle: { textAlign: "right" },
        },
      ],
    },
    {
      headerName: "개정과목",
      field: "accountName",
      width: 200,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "대변",
      children: [
        {
          headerName: "현금",
          field: "cashCredits",
          valueFormatter: currencyFormatter,
          width: 172,
          cellStyle: { textAlign: "right" },
        },
        {
          headerName: "대체",
          field: "exceptCashCredits",
          valueFormatter: currencyFormatter,
          width: 172,
          cellStyle: { textAlign: "right" },
        },
        {
          headerName: "계",
          field: "creditsSum",
          valueFormatter: currencyFormatter,
          width: 175,
          cellStyle: { textAlign: "right" },
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <br />
      <div align="right">
        <Button variant={"outlined"} color={"primary"} onClick={selectData}>
          조회
        </Button>
      </div>
      <br />
      <div
        className={"ag-theme-balham"}
        style={{
          height: "60%",
          wieth: "100%",
          paddingTop: "20px",
        }}
      >
        <AgGridReact
          columnDefs={DetailTrialBalanceColumnDefs}
          rowData={data}
          rowSelection="single"
          onGidReady={event => {
            event.api.sizeColumnsToFit();
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default DetailTrialBalanceGrid;
///////////////////////// 2020-08-24 김진호 추가 ///////////////////////////
