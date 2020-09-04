import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_ACCOUNT_REQUEST } from "../../ActionType/ActionType";
import SearchIcon from "@material-ui/icons/Search";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";

//========================================= 2020-08-25 계정별원장 조편백 ==============================================

const SearchAccountDialog = ({ open, close, value }) => {
  const [positionGridApi, setPositionGridApi] = useState();
  const data = useSelector(({ AccReducer }) => AccReducer.accountList, []); //DB에서 받아온 값 을 그리드에뿌리려고 데꼬옴
  const dispatch = useDispatch(); //action dispatch를 사용할 필요 없이 바로 action 객체를 dispatch함

  //========================== 그리드 객체 준비 ==========================
  const onGridReady = params => {
    setPositionGridApi(params.api);
  };

  //========================== 그리드내용 ==========================
  const accountColumnDefs = [
    { headerName: " 코 드 ", field: "accountInnerCode", width: 180 },
    { headerName: "계 정 과 목 ", field: "accountName", width: 210 },
  ];

  //========================== 그리드를 클릭했을 때 발생되는 이벤트 ==========================
  // onClose 와 open 값을 비구조 할당과 동시에 Dialog가 닫히면서
  // onClose안에 객체(data, division) 을 가지고 AccountSearch 컴포넌트로 감.

  // onclick 에 handleClose 실행되면서 close 함수호출
  const handleClose = () => {
    close({
      data: positionGridApi.getSelectedRows(), // data는 클릭한 row의 정보이고,
      division: "accountDialog",
    });
  };

  const Close = () => {
    close({
      division: "accountDialog",
    });
  };

  const [accountName, setDate] = useState("");

  //onChange 이벤트 걸어서 입력한 상태값을 accountName 에 담음
  const onChange = event => {
    setDate(event.target.value);
  };

  //검색 버튼누르면 액션타입명에맞는 비동기함수가 호출된다
  const selectData = async () => {
    console.log("계정별원장 코드 조회" + accountName);
    await dispatch({
      type: SEARCH_ACCOUNT_REQUEST,
      params: { accountName: accountName },
    });
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle id="simple-dialog-title" Align="center">
        계 정 과 목
      </DialogTitle>
      <DialogContent dividers>
        <List>
          <div Align="center">
            <TextField
              margin="normal"
              placeholder="계정코드"
              onChange={onChange}
            />
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<SearchIcon />} //아이콘
              onClick={selectData}
            >
              검색
            </Button>
          </div>
          <div
            className={"ag-theme-balham"} //그리드 모양
            style={{
              height: "300px",
              width: "100%",
              paddingTop: "8px",
            }}
          >
            <AgGridReact
              columnDefs={accountColumnDefs} //컬럼명
              rowData={data} // 뿌릴 data
              rowSelection="single" // 하나만 선택 가능.
              onGridReady={onGridReady}
              onCellClicked={handleClose} // cell을 클릭하면, handleClose가 실행된다.
            />
          </div>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={Close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchAccountDialog;
