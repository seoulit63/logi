import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Button } from "@material-ui/core";

const InstructionStatus = ({ rowData, handleClick }) => {
  
  const columnDefs = [
      { headerName: "선택" },
      { headerName: "작업지시일렬번호", field: "workOrderNo" },
      { headerName: "소요량전개번호", field: "mpsNo" },
      { headerName: "주생산계획번호", field: "mrpNo" },
      { headerName: "소요량취합번호", field: "mrpGatheringNo", editable: true },
      { headerName: "품목분류", field: "itemClassification" },
      { headerName: "품목코드", field: "itemCode" },
      { headerName: "품목명", field: "itemName"},
      { headerName: "단위", field: "unitOfMrp" },
      { headerName: "지시수량", field: "requiredAmount" },
      { headerName: "생산공정명", field: "productionProcessName" },
      { headerName: "작업장명", field: "workSiteName" },
      { headerName: "완료상태", field: "completionStatus" }
  ]


return (
    <>
        <Button variant={"outlined"} color={"secondary"} onClick={handleClick} >
            작업지시 현황 조회
        </Button>
        <Button variant={"outlined"} color={"secondary"} >
            작업 완료 등록
        </Button>
            <div
            className={"ag-theme-material"}
            style={{
              height: "600px",
              width: "100%",
            }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowSelection="single"
              rowData={rowData}
              onGridReady={event => {
                event.api.sizeColumnsToFit();
              }}
            />
          </div>
  </>
);
};

export default InstructionStatus