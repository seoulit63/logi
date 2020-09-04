import React, { useState } from "react";
import UseStyles from "./UseStyles";
import {Paper,TextField,Button,Grid,AppBar,InputLabel,Typography,Toolbar,MenuItem,Select,
  FormControl,OutlinedInput, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText} from "@material-ui/core"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useAxios from "util/useAxios";
import useInput from "util/useInput";
import AttdApplInput from "./AttdApplInput";

import { useDispatch } from "react-redux";
import { UPDATE_ATTD_APPL_REQUEST } from "ERP/HR/ActionType/ActionType"

//************************* 결제승인관리 시작 _준서 *************************
const AttdApplComp = ({ attdApplList, searchAttdApplList, updateAttdApplList, errorCode, errorMsg }) => {
    const columnDefs = AttdApplInput;
    const classes = UseStyles();
    const dispatch = useDispatch();

  const fromDate = useInput("2020-01-01");
  const toDate = useInput("2020-12-31");
  let selectedInput = document.getElementsByName("deptDivision")[0];

  // 조회버튼(select) 
  // 승인,취소,반려버튼(그리드 칼럼 status변경) => 그리드 셀클릭이벤트
  // 확정버튼(update)

  const codeDivision = element => {
    if(typeof element == "undefined") return "";
    else {
      // console.log(element.value); 
      return element.value; 
    }
  }

  const searchInfoData = {
    url: "http://localhost:8282/hr/attendance/attendanceApploval.do",
    fetchOnStart: false,
    method: "get",
    params: {
      deptCode: codeDivision(selectedInput),
      startDate: fromDate.value,
      endDate: toDate.value
    }
  };

  const deptDivision = useInput();
  const [deptDivisionOpen, setDeptDivisionOpen] = React.useState(false);
  const [ applovalVal, setApplovalVal ] = useState("");
  const [ reqDateVal, setReqDateVal ] = useState("");
  const [ restAttdVal, setRestAttdVal ] = useState("");
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ rejectCauseInfo, setRejectCauseInfo ] = useState("");
  

  function deptDivisionHandleOpen() {
    setDeptDivisionOpen(true);
  }

  function deptDivisionHandleClose() {
    setDeptDivisionOpen(false);
  }

  const openApplDialog = () => {
    setOpenDialog(true);
  }

  const closeApplDialog = () => {
    let rejectCauseInfoEle = document.getElementsByName('rejectCauseInfo')[0];
    console.log(rejectCauseInfoEle);
    console.log(codeDivision(rejectCauseInfoEle));
    setRejectCauseInfo(codeDivision(rejectCauseInfoEle));
    console.log(rejectCauseInfo);
    setOpenDialog(false);
  }

  const { data, fetch } = useAxios(searchInfoData);

  const fetchAttdRestList = () => {
    if(!selectedInput.value) { alert("조회부서를 입력하세요"); return; }
    fetch();
    // dispatch({ type: SEARCH_ATTD_APPL_REQUEST, data: searchInfoData });
  }

  const onCellClicked = (event) => {
    console.log(event);
    setApplovalVal(event.data.applovalStatus);
    setReqDateVal(event.data.requestDate);
    setRestAttdVal(event.data.restTypeName);
  }

  const changeStatus = (event) => {
    console.log(applovalVal);
    if(applovalVal !== "승인대기") return;
    // Button을 @material-ui/core에서 가져다썼기때문에 해당 컴포넌트에 포함된 태그들을 구분하는 방법이 따로 없었음
    // console.log(event.currentTarget);    
    
    // eslint-disable-next-line default-case
    switch(event.currentTarget.name) {
      case "apploval": setApplovalVal(document.getElementsByClassName("MuiButton-label")[1].innerHTML); break;
      case "applovalCancel": setApplovalVal(document.getElementsByClassName("MuiButton-label")[2].innerHTML); break;
      case "companion": setApplovalVal(document.getElementsByClassName("MuiButton-label")[3].innerHTML); break;
    }
    console.log(applovalVal);

    if(event.currentTarget.name == "applovalCancel" || event.currentTarget.name == "companion") {
      openApplDialog();

    }
  }

  const attdApplData = {
    applovalStatus: applovalVal,
    rejectCause: rejectCauseInfo,   // REST_ATTD테이블을 확인해보면 한번에 여러줄이 변경될 것임. 이는 업무상 한명이 하루에 여러 근태외 신청을 넣지는 않기때문에 한 계정으로 여러번 집어넣어서 나온 결과일뿐이다
    empCode: sessionStorage.getItem("empCodeInfo_token"),
    requestDate: reqDateVal
  }

  const confirmApplChange = () => {
    console.log(rejectCauseInfo);
    dispatch({ type: UPDATE_ATTD_APPL_REQUEST, data: attdApplData });
    fetch();
  }

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return(    
    <Grid item xs={12}>
      <Paper className={classes.mainPaper}>
        <AppBar position="relative" className={classes.subCategory}>
          <Toolbar>
            <Typography variant="h5">결재승인관리</Typography>
          </Toolbar>
        </AppBar>
        <br/>
        <div>
          <FormControl variant="outlined" className={classes.searchTextField}>
            <InputLabel
              ref={inputLabel}
              htmlFor="outlined-cost-simple"
            >
            조회부서
            </InputLabel>
            <Select
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="deptDivision"
                  id="outlined-cost-simple"
                />
              }
              open={deptDivisionOpen}
              onClose={deptDivisionHandleClose}
              onOpen={deptDivisionHandleOpen}
              value={deptDivision.value}
              onChange={deptDivision.onChange}
            >
              <MenuItem value="DPT-01">총무부</MenuItem>
              <MenuItem value="DPT-02">영업부</MenuItem>
              <MenuItem value="DPT-03">생산부</MenuItem>
              <MenuItem value="DPT-04">인사부</MenuItem>
              <MenuItem value="DPT-05">개발부</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id={"fromDate"}
            label={"신청일자"}
            type={"date"}
            defaultValue={fromDate.value}
            onChange={fromDate.onChange}
            className={classes.textField}
            variant="outlined"
          />
          ~
          <TextField
            id={"toDate"}
            label={"신청일자"}
            type={"date"}
            defaultValue={toDate.value}
            onChange={toDate.onChange}
            className={classes.textField}
            variant="outlined"
          />
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick= {fetchAttdRestList}
            className={classes.searchButton}
          >
          조회
          </Button>
        </div>
        <div>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick= {changeStatus}
            className={classes.button}
            name={"apploval"}
          >
          승인
          </Button>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick= {changeStatus}
            className={classes.button}
            name={"applovalCancel"}
          >
          승인취소
          </Button>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick= {changeStatus}
            className={classes.button}
            name={"companion"}
          >
          반려
          </Button>
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick= {confirmApplChange}
            className={classes.button}
            name={"confirm"}
          >
          확정
          </Button>
        </div>
        <div
            className={"ag-theme-material"}
            style={{
              height: "400px",
              width: "100%"
            }}
          >
          <AgGridReact 
            columnDefs={columnDefs} 
            rowData={data ? data : []} 
            suppressRowClickSelection={"true"}
            onCellClicked={onCellClicked}
          />
          </div>
      </Paper>
      {/*   https://material-ui.com/components/dialogs/#dialog  FormDialog참조   */}
      <Dialog open={openDialog} onClose={closeApplDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="simple-dialog-title">
          [{sessionStorage.getItem("empNameInfo_token")}] 사원의 [{restAttdVal}] 신청내역  
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label={"승인취소 / 반려 사유"}
            name={"rejectCauseInfo"}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeApplDialog}>확인</Button>
        </DialogActions>
      </Dialog>
      
    </Grid>    
  );
};

export default AttdApplComp;

//************************* 결제승인관리 시작 _준서 *************************