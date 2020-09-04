import React from "react";
import useInput from "util/useInput";
import { AgGridReact } from "ag-grid-react";
import { TextField, Button } from "@material-ui/core";
import useStyles from "ERP/ACCOUNT/Page/AccountLedger/Theme";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_ACCOUN_TINFO_REQUEST } from "../../ActionType/ActionType";

//========================================= 2020-08-25 계정별원장 조편백 ==============================================

//AccountSearch 선택한 코드 넘겨받음 {code}
const AccountLedgerSearch = ({ code }) => {
  const classes = useStyles(); //스타일적용

  console.log(":::::: code :::::::" + JSON.stringify(code) + "::::");
  const { accountCode } = code; //비구조 할당 (궁금하면 구글검색 ㄱ )
  console.log(
    "::::::  accountCode :::::::" + JSON.stringify(accountCode) + "::::",
  );

  const dispatch = useDispatch(); //action dispatch를 사용할 필요 없이 바로 action 객체를 dispatch함
  const { data } = useSelector((state) => state.AccReducer); //DB에서 받아온 값을 그리드에뿌리려고 데꼬옴
  const { isLoading } = useSelector((state) => state.AccReducer); // 그리드뿌릴때 쓸 LOADING....

  //REDUCER 로 비동기처리 실행
  const selectData = async () => {
    if (code.accountCode === "") {
      alert("계정코드를 선택해주세요.");
      return;
    } else {
      await dispatch({
        type: SEARCH_ACCOUN_TINFO_REQUEST,
        params: {
          startDate: startDate.value,
          endDate: endDate.value,
          accountCode: accountCode,
        },
      });
    }
  };
  //시작 날짜 초기값 세팅
  const startDate = useInput(
    new Date().toISOString().substr(0, 10).replace("T", " "),
  );

  //종료 날짜 초기값 세팅
  const endDate = useInput(
    new Date().toISOString().substr(0, 10).replace("T", " "),
  );

  // 그리드 컬럼 정의
  const AccountLedgerGrid = [
    {
      headerName: "작성일자",
      field: "reportingDate",
      sortable: true, //컬럼 눌러서 정렬가능하게 함
    },
    {
      headerName: "차변",
      field: "leftDebtorPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"', // 3칸마다 , 찍고 마지막에 원 붙임
    },
    {
      headerName: "대변",
      field: "rightCreditsPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    },
    {
      headerName: "잔액금",
      field: "totalPrice",
      valueFormatter:
        ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+"원"',
    },
  ];

  return (
    <div align="center" className={classes.root2}>
      <br />
      <br />
      <TextField
        name="startDate"
        type={"date"}
        defaultValue={new Date().toISOString().substr(0, 10).replace("T", " ")} //defaultValue : 초기값.
        onChange={startDate.onChange}
      />
      <TextField
        name="endDate"
        type={"date"}
        defaultValue={new Date().toISOString().substr(0, 10).replace("T", " ")}
        onChange={endDate.onChange}
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={selectData}
        value="accountCode"
      >
        조회
      </Button>{" "}
      <div
        className={"ag-theme-material"}
        style={{
          height: "400px",
          width: "90%",
          paddingTop: "25px",
        }}
      >
        {!isLoading ? (
          <AgGridReact
            columnDefs={AccountLedgerGrid}
            rowData={data}
            rowSelection="single"
            getRowStyle={function (param) {
              if (param.node.rowPinned) {
                return { "font-weight": "bold", background: "#CEFBC9" };
              }
              return { "text-align": "center" }; // bady 값 가운데정렬
            }}
            onGridReady={(event) => {
              //그리드 크기자동조절
              event.api.sizeColumnsToFit();
            }}
          />
        ) : (
          <h1 align="center">Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default AccountLedgerSearch;
