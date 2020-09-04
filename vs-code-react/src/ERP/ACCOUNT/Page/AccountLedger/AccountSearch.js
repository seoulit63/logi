import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import useInput from "util/useInput";
import { Button, TextField } from "@material-ui/core";
import SearchAccountDialog from "ERP/ACCOUNT/Page/AccountLedger/SearchAccountDialog";

//========================================= 2020-08-25 계정별원장 조편백 ==============================================

const AccountSearch = ({ code, setAccountCode }) => {
  var [openSearchAccountDialog, setOpenSearchAccountDialog] = useState(false); //다이알로그 기본값 false 하면 안보임
  const accountCodes = useInput("");
  const clickAccountCode = useInput(""); //util에 있음 공통함수라고생각하면됨 ( 가져다쓰는거임 )

  //검색버튼을 누르면 다이알로그가 열린다
  const handleClickOpen = () => {
    setOpenSearchAccountDialog(true);
  };

  //다이알로그가 닫힐때 실행
  const handleClose = value => {
    setOpenSearchAccountDialog(false);
    if (value.data === undefined) return;

    //AccountLedgerSearch 에 선택한 accountCode 값 전달
    setAccountCode({
      accountCode: value.data[0].accountInnerCode,
    });
    accountCodes.setValue(value);
    clickAccountCode.setValue(value.data[0].accountInnerCode);
  };

  const AccountGrid = [
    // 칼럼정의
    {
      headerName: "계정코드",
      field: "accountInnerCode",
    },
    {
      headerName: "계정명",
      field: "accountName",
    },
  ];

  return (
    <div Align="center">
      <SearchAccountDialog open={openSearchAccountDialog} close={handleClose} />{" "}
      <TextField
        id="accountCode"
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleClickOpen()}
              value="accountCode"
            >
              검색
            </Button>
          ),
        }}
        margin="normal"
        placeholder="계정코드"
        disabled={true}
        value={clickAccountCode.value}
      />
      <div
        className={"ag-theme-material"}
        style={{
          height: "400px",
          width: "100%",
          paddingTop: "25px",
        }}
      >
        <AgGridReact
          columnDefs={AccountGrid}
          rowData={accountCodes.value.data}
          rowSelection="single"
          getRowStyle={function (param) {
            if (param.node.rowPinned) {
              return { "font-weight": "bold", background: "#CEFBC9" };
            }
            return { "text-align": "center" }; // bady 값 가운데정렬
          }}
          onGridReady={e => {
            //그리드 크기자동조절
            e.api.sizeColumnsToFit();
          }}
        />
      </div>
    </div>
  );
};
export default AccountSearch;
