import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { Button } from "@material-ui/core";

import WorkInstructionDialogContainer from 'ERP/LOGISTIC/Page/WorkInstruction/Container/WorkInstructionDialogContainer';



const WorkInstructions = ({
                            onRowSelected,
                            handleClick,
                            handleRequest,
                            rowData
                          }) => {

  const columnDefs = [
      { headerName: "선택", checkboxSelection: true },
      { headerName: "소요량전개번호", field: "mrpNo" },
      { headerName: "주생산계획번호", field: "mpsNo" },
      { headerName: "소요량취합번호", field: "mrpGatheringNo" },
      { headerName: "품목분류", field: "itemClassification", editable: true },
      { headerName: "품목코드", field: "itemCode" },
      { headerName: "품목명", field: "itemName" },
      { headerName: "단위", field: "unitOfMrp"},
      { headerName: "필요수량", field: "requiredAmount" },
      { headerName: "작업지시기한", field: "orderDate" },
      { headerName: "작업완료기한", field: "requiredDate" },
  ];


 
return (
    <>
      <Button variant={"outlined"} color={"secondary"} onClick={handleClick}>
        작업지시 필요 목록 조회
      </Button>
      <Button variant={"outlined"} color={"secondary"} onClick={handleRequest}>
        모의 작업 지시
      </Button>
      <WorkInstructionDialogContainer />
          <div
            className={"ag-theme-material"}
            style={{
              height: "600px",
              width: "100%",
            }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              rowSelection="single"
              onRowSelected={onRowSelected}
              onGridReady={event => {
                event.api.sizeColumnsToFit();
              }}
            />
         </div>
    </>
);
};



export default WorkInstructions;