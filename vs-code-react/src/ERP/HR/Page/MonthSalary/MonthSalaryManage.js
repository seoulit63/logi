//**************************2020-08-20 63기 손유찬 ********************************* 

import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import Select from "react-select";
import useSelectItem from "./useSelectItem";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Button from "@material-ui/core/Button";
import { FormControl,AppBar,Toolbar,Typography } from "@material-ui/core";
import "./Grid.css";

const MonthSalaryManage = () => {
  const set1 = useSelectItem();
  console.log("나와 ", set1.selectedmonth);

  // monthList는 db에서 받아온 값 selectedmonth는 현재 Creatable에 사용할 state
  const [monthList, setMonthList] = useState([]);
  const [date, setDate] = useState("");
  const [DeptCode, setDeptCode] = useState("");
  const [gridEvent, setGridEvent] = useState();



  function click1() {
    axios
      .get(
        "http://localhost:8282/hr/salary/findCloseSalary.do",
        {
          params: {
            applyYearMonth: date,
            deptCode:DeptCode
          },
        },
      )
      .then(response => {
        console.log("리스펀스 ", response);
        setMonthList(response.data.monthSalary.result);
      })
      .catch(e => {
        console.log(e);
      });
  }
  //입력값 없으면 alert
  
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

  //역시 그리드의 헤드
  const state = {
    columnDefs: [
      {
        headerName: "사원코드",
        field: "empCode",
        sortable: true,
        filter: true,
        resizable: true,
        
      },
      { headerName: "부서코드", field: "deptCode" , hide: true},
      { headerName: "적용연월", field: "applyYearMonth" , hide: true},
      { headerName: "총 급여", field: "salary" , valueFormatter: currencyFormatter },
      { headerName: "연차미사용수당", field: "unusedDaySalary" , valueFormatter: currencyFormatter  },
      { headerName: "경비지급액", field: "cost" , valueFormatter: currencyFormatter  },
      { headerName: "초과수당 합계", field: "totalExtSal" , valueFormatter: currencyFormatter  },
      { headerName: "공제금액 합계", field: "totalDeduction" , valueFormatter: currencyFormatter  },
      { headerName: "차인지급액", field: "realSalary" , valueFormatter: currencyFormatter  },
      { headerName: "실지급액", field: "totalPayment" , hide: true},
      { headerName: "마감여부", field: "finalizeStatus" },

    ],
    rowData: monthList,
  };

  const DPThandleChange = (newValue) => {setDeptCode(newValue.value)};
  const DatehandleChange = (newValue) => {setDate(newValue.value);};


  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    console.log("콘솔임", monthList),
    (
      <div>
          <div>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5">월별 급여조회</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <br />
        <div>
        <FormControl style={{ minWidth: "410px" }}></FormControl>
        <FormControl style={{ minWidth: "200px" }}>
        <Select
              styles={customStyles}
              onChange={DPThandleChange}
              options={set1.selectDeptCode}
              placeholder="부서를 선택해주세요"
            >
            </Select>
        </FormControl>
          <FormControl style={{ minWidth: "250px" }}>
            <Select
              styles={customStyles}
              onChange={DatehandleChange}
              options={set1.selectedmonth}
              placeholder="값을 선택해주세요"
            >
            </Select>               
          </FormControl>
            <FormControl style={{ minWidth: "50px" }}>
                        <Button variant="contained" color="primary" onClick={click1}>
                        조회
                        </Button>
            </FormControl>

        </div>
        <br />
        <div
          className="ag-theme-balham"
          style={{
            height: "600px",
            width: "1300px",
            textAlign:"center"
          }}
        >
          <AgGridReact
            columnDefs={state.columnDefs}
            rowData={state.rowData}
            //rowSelection="multiple"
            
            onGridReady={event => {
              event.api.sizeColumnsToFit();
              setGridEvent(event);
            }}
          ></AgGridReact>
        </div>
      </div>
    )
  );
};
export default MonthSalaryManage;

//**************************2020-08-20 63기 손유찬 ********************************* 