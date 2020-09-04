import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Axios from "axios";

const SearchItemCodeDialog = ({ open, close, data}) => {
    const [positionGridApi, setPositionGridApi] = useState();
    const dispatch = useDispatch(); //action dispatch를 사용할 필요 없이 바로 action 객체를 dispatch함
    

    //========================== 그리드 객체 준비 ==========================
    const onGridReady = params => {
        setPositionGridApi(params.api);
    };

    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: "상세코드번호", field: "itemCode", width: 180 },
        { headerName: "상세코드이름", field: "itemName", width: 210 },
    ];

    //========================== 그리드를 클릭했을 때 발생되는 이벤트 ==========================
    // onClose 와 open 값을 비구조 할당과 동시에 Dialog가 닫히면서
    // onClose안에 객체(data, division) 을 가지고 AccountSearch 컴포넌트로 감.

    // onclick 에 handleClose 실행되면서 close 함수호출
    const handleClose = () => {
        close({
        data: positionGridApi.getSelectedRows(), // data는 클릭한 row의 정보이고,
        });
    };

    const Close = () => {
        close({
        });
    };


    return (
        <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle id="simple-dialog-title">
        품목코드
      </DialogTitle>
      <DialogContent dividers>
        <List>
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

export default SearchItemCodeDialog;
