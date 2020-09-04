//****************************************************2020-08-28 63기 손유찬 ********************************* **********************

import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Button from "@material-ui/core/Button";
import { FormControl,AppBar,Toolbar,Typography,} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
//수정된 값을 담을 배열
let list = [];
let lastCell=[];
let count = 0; 
//콘솔에 찍어보려고 선언한 count 
const BaseDeductionManage = () => {

    const [dataList, setDataList] = useState([]);
    const [gridEvent, setGridEvent] = useState();


    useEffect(() => {
        axios
            .get("http://localhost:8282/hr/salary/baseSalaryManage.do",)
            .then(response => {
                console.log("리스펀스 ", response);
                setDataList(response.data.baseSalaryList);
                console.log(dataList);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);


//그리드 수정이 끝난후 발생하는 이벤트의 콜백메서드
function CellEditingStopped(row) {
  if(row.data.status!='insert'){
    row.data.status = "update"
    list.push(row.data);
    console.log("이건 로우 데이타");
  console.log(row.data);
  console.log("count = "+count);
  console.log(list[count].positionCode);
  console.log(list[count].positionName);
  console.log(list[count].hobongRatio);
  console.log(list[count].status); 
    count++;
  }else {    
    if(row.data.deptName!=='부서명 입력'&&row.data.positionName!=='직급명 입력'&&
       row.data.baseSalary!=='0000'&&row.data.hobongRatio!=='인상율 입력')
        list.push(row.data);
  }
};

//그리드에 줄 생성 메서트
const createNewRowData = () => {
  let newData = {
    workPlaceCode : "BRC-01",
    deptName: '부서명 입력', 
    positionCode: '입력하지 마세요',
    positionName : '직급명 입력',    
    baseSalary : '0000',
    hobongRatio : '인상율 입력',
      status : 'insert'
  };
  return newData;
}

//추가 버튼 이벤트
const addOnClick= evet =>{
  const newItem = createNewRowData();
  gridEvent.updateRowData({ add: [newItem] });   // 만들어진 새로운 row를 그리드에 add 해라.
}



//수정 버튼 이벤트
const updateOnClick = event => {

if (list) {
    console.log("온셀로우 이벤트 " + list);
    axios.post("http://localhost:8282/hr/salary/baseSalaryManage.do", 
    { sendData: list }, 
    {  headers: {  "Content-Type": "application/json" }
    },
              );
        alert("성공적으로 수정 되었습니다.");
        window.location.reload(true);
        
    } else 
        alert("수정 된 내역이 없습니다.");
    }
;

//셀클릭 한 값을 담는 함수
function LastClick(event){
    lastCell = event.data;
}
//삭제 버튼 이벤트
const deleteOnClick = event =>{
  lastCell.status = "delete";
  list.push(lastCell);
  updateOnClick();
}


// 그리드 숫자형식 변경 함수 시작
function currencyFormatter(params) {
  return formatNumber(params.value) + " 원";
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
// 그리드 숫자형식 변경 함수 끝

  //AG 그리드의 헤드
  const state = {
    columnDefs: [
      { headerName: "사업장코드", field: "workPlaceCode" ,hide:true },
      { headerName: "부서명", field: "deptName" ,editable:true },
      { headerName: "직급코드", field: "positionCode" },
      { headerName: "직급명", field: "positionName",editable:true },
      { headerName: "기본급", field: "baseSalary",editable:true , valueFormatter: currencyFormatter},
      { headerName: "호봉인상율", field: "hobongRatio", editable:true},

    ],
    rowData: dataList,
  };
  

  return (
    console.log("콘솔임", dataList),
    (<div>
          <div>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5">급여기준관리</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <br /><br />
        <div
          className="ag-theme-balham"
          style={{
            height: "600px",
            width: "600px",
            textAlign:"center"
          }}
        >
         <AgGridReact
            columnDefs={state.columnDefs}
            rowData={state.rowData}
            onCellEditingStopped={CellEditingStopped}
            onCellClicked={LastClick}
            onGridReady={event => {
              event.api.sizeColumnsToFit();
              setGridEvent(event.api);
            }}
          ></AgGridReact>
          </div>
          <br/><br/>
        <FormControl style={{ minWidth: "85px" }}/>
        <FormControl style={{ minWidth: "100px" }}>
          <Button  variant="contained" color="primary" size="large" onClick={addOnClick} startIcon={<InputIcon />}>
              추가
          </Button>
        </FormControl> <FormControl style={{ minWidth: "10px" }}/>       
        <FormControl style={{ minWidth: "100px" }}>           
          <Button variant="contained" color="primary" size="large"  onClick={updateOnClick} startIcon={<InputIcon />}>
              등록
          </Button>
        </FormControl>   <FormControl style={{ minWidth: "10px" }}/>       
          <FormControl style={{ minWidth: "100px" }}>           
          <Button  variant="contained" color="primary" size="large" onClick={updateOnClick} startIcon={<InputIcon />}>
              수정
          </Button>
        </FormControl> <FormControl style={{ minWidth: "10px" }}/>   
          <FormControl style={{ minWidth: "100px" }}>   
          <Button  variant="contained" color="primary"  size="large"  onClick={deleteOnClick}  startIcon={<InputIcon />}>
              삭제
          </Button>
        </FormControl>
      </div>
      
    )
  );
};
export default BaseDeductionManage;

//**************************2020-08-28 63기 손유찬 ********************************* 