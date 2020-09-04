import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { Button } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { SEARCH_FINANCIAL_REQUEST } from "../../ActionType/ActionType";

const FinancialStatementsGrid = ({ date }) => {
  // prop 값을 사용하기 편하게 비구조 할당
  const dispatch = useDispatch();
  const { approvalDate } = date;
  const { data } = useSelector(state => state.AccReducer);
  const { error } = useSelector(state => state.AccReducer);
  const { isLoading } = useSelector(state => state.AccReducer);

  console.log(isLoading);
  
  useEffect(()=>{
    console.log(error);    
    //데이터를 그리드에 세팅하는 함수
    // setGrid(datas);
  },[error]);

  const selectData = async () => {
    console.log("클릭 selectData");
    await dispatch( { type : SEARCH_FINANCIAL_REQUEST, params : {date : approvalDate} } );
  };

  const FinancialStatementscolumnDefs = [
    // 칼럼정의
    {
      headerName: "계정과목",
      field: "accountName",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "당기",
      children: [
        {
          headerName: "세부금액",
          field: "balanceDetail",
        },
        {
          headerName: "합계금액",
          field: "balanceSummary",
        },
      ],
    },
    {
      headerName: "전기",
      children: [
        {
          headerName: "세부금액",
          field: "preBalanceDetail",
        },
        {
          headerName: "합계금액",
          field: "preBalanceSummary",
        },
      ],
    },
  ];

  return (
    <>
      <br />
      <div align="right">
        <Button variant={"contained"} color="secondary" size="small" onClick={selectData} startIcon={<FindInPageIcon/>}>
          조회
        </Button>        
      </div>

      <div
        className={"ag-theme-balham"}
        style={{
          height: "500px",
          width: "100%",
          paddingTop: "25px",
        }}
      >
       {!isLoading ? 
       <AgGridReact
          columnDefs={FinancialStatementscolumnDefs}
          rowData={data}
          rowSelection="single"
          onGridReady={event => {
            event.api.sizeColumnsToFit();
          }}
          // onGridReady={onGridReady}
          // onCellClicked={onCellClicked}
          /> 
          : <h1 align='center'>로딩중</h1>
        }
      </div>
    </>
  );
};

export default FinancialStatementsGrid;