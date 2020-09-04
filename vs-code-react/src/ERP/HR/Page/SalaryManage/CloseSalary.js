import React, { useState, useMemo, memo } from "react";
import axios from "axios";
import useMonth from "../MonthAttendance/useMonth"; //이거 나중에 util로 집어넣자
import { AgGridReact } from "ag-grid-react";
import Select from "react-select";
import { Button, FormControl,AppBar,Toolbar,Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputIcon from "@material-ui/icons/Input";
import SearchIcon from "@material-ui/icons/Search";
//**************************2020-08-20 63기 손유찬 수정 ********************************* 

//ag그리드 숫자형식 변환 함수 시작
function currencyFormatter(params) {
  return formatNumber(params.value) + " 원";
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
//ag그리드 숫자형식 변환 함수 끝
const CloseSalary = ({
  handleChange,
  callCloseSalary,
  onRowSelected,
  salaryList,
  findCloseSalary,
  setEvent,
  empCodes,
}) => {
  const state = {
    columnDefs: [
      {
        headerName: "사원코드",
        field: "empCode",
        sortable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      { headerName: "적용월", field: "applyYearMonth", hide: true },
      { headerName: "기본급", field: "salary"  , valueFormatter: currencyFormatter},
      { headerName: "심야근무시간", field: "cost" },
      { headerName: "휴일근무일수", field: "unusedDaySalary" },
      { headerName: "추가수당", field: "totalExtSal"  , valueFormatter: currencyFormatter},
      { headerName: "총급여", field: "totalPayment"  , valueFormatter: currencyFormatter},
      { headerName: "공제금액", field: "totalDeduction"  , valueFormatter: currencyFormatter},
      { headerName: "실지급금", field: "realSalary"  , valueFormatter: currencyFormatter},
      { headerName: "마감상태", field: "finalizeStatus" },
      { headerName: "부서코드", field: "deptCode", hide: true },
    ],
    rowSelection: "multiple",
    rowData: salaryList,
  };

  const set1 = useMonth();

  const selectedDeptd = [
    {
      value: "DPT-01",
      label: "총무부",
    },
    {
      value: "DPT-02",
      label: "영업부",
    },
    {
      value: "DPT-03",
      label: "생산부",
    },
  ];

  return (
    <div>
        <div>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5">월급여 마감</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <br />
      <FormControl style={{ minWidth: "300px" }}></FormControl>
      <FormControl style={{ maxWidth: "600px" }}></FormControl>
      <FormControl style={{ minWidth: "250px" }}>
        <Select
          onChange={handleChange}
          name="dept"
          // onInputChange={handleInputChange}
          placeholder="부서를 선택해주세요"
          options={selectedDeptd}
          style={{
            width: "500px",
          }}
        ></Select>
      </FormControl>

      <FormControl style={{ Width: "600px" }}> </FormControl>
      <FormControl style={{ minWidth: "250px" }}>
        <Select
          onChange={handleChange}
          name="date"
          // onInputChange={handleInputChange}
          placeholder="날짜를 선택해주세요"
          options={set1.selectedmonth}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SearchIcon />}
        onClick={findCloseSalary}
      >
        조회
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<InputIcon />}
        onClick={callCloseSalary}
      >
        마감
      </Button>
      <div
        className="ag-theme-balham"
        style={{
          height: "600px",
          width: "1200px",
          textAlign:"center"
        }}
      >
                <br />
        <AgGridReact
          suppressRowClickSelection={true}
          columnDefs={state.columnDefs}
          rowData={state.rowData}
          onRowSelected={onRowSelected}
          rowSelection={state.rowSelection}
          onGridReady={event => {
            event.api.sizeColumnsToFit();
            setEvent(event.api);
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default CloseSalary;
//**************************2020-08-20 63기 손유찬 수정 ********************************* 