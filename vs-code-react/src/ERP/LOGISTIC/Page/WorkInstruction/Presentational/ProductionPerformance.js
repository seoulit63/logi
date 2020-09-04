import React from 'react';


import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


import { Button } from "@material-ui/core";


const ProductionPerformance = ({ handleClick, rowData }) => {

  const columnDefs = [
      { headerName: "생산완료날짜", field: "workOrderCompletionDate" },
      { headerName: "작업지시일렬번호", field: "workOrderNo" },
      { headerName: "주생산계획번호", field: "mpsNo" },
      { headerName: "수주상세일렬번호", field: "contractDetailNo" },
      { headerName: "품목구문", field: "itemClassification", editable: true },
      { headerName: "품목코드", field: "itemCode" },
      { headerName: "품목이름", field: "itemName" },
      { headerName: "단위", field: "unit" },
      { headerName: "작업지시수량", field: "workOrderAmount"},
      { headerName: "실제제작수량", field: "actualCompletionAmount" },
      { headerName: "공정성공률", field: "workSuccessRate" }
  ]


return (
<>
 <Button variant={"outlined"} color={"secondary"} onClick={handleClick} >
    생산 실적 조회
 </Button>

  <div
    className={"ag-theme-material"}
    style={{
      height: "600px",
      width: "100%"
    }}
  >
    <AgGridReact
      columnDefs={columnDefs}
      rowData={rowData}
      rowSelection="single"
      onGridReady={event => {
        event.api.sizeColumnsToFit();
      }}
    />
  </div>
  </>
);
};

export default ProductionPerformance;