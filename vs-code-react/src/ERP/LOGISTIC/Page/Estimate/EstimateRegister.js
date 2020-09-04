import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import EstimateDialog from './Dialog/EstimateDialog';
import Calendar from './Dialog/Calendar';
import {

  makeStyles,
  withStyles,
  Button,
  FormControl,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
// import EstimateRegisterDetail from 'ERP/LOGISTIC/Page/Estimate/EstimateRegisterDetail';



const ColumnDefs = [
  { headerName: "거래처명", field: "customerName", minWidth: 100, editable: true },
  { headerName: "견적일자", field: "estimateDate", minWidth: 100 },
  { headerName: "유효일자", field: "effectiveDate", minWidth: 100, editable: true, },
  { headerName: "견적담당자", field: "empName", minWidth: 100 },
  { headerName: "견적요청자", field: "estimateRequester", minWidth: 100, editable: true },
  { headerName: "비고", field: "description", minWidth: 100, editable: true },
  { headerName: "상태", field: "statue", minWidth: 100 },
];

const sessionId = sessionStorage.getItem('empNameInfo_token') // 견적담당자 입력 값

const useStyles = makeStyles(theme => ({
  root: { margin: 0, maxWidth: 180 },
}));
const EstimateRegister = ({ dialogData, DialogData }) => {
  console.log("rowData 잘 넘어오는지.. ", dialogData);
  const [EstimateDate, setEstimateDate] = useState(new Date().toDateString(),);
  const classes = useStyles();
  const handleDateChange = event => {
    setEstimateDate({
      [event.target.name]: event.target.value
    });
  };
  const [nodeId, setNodeId] = useState('');
  const [EstimateDialogOpen, setEstimateDialogOpen] = useState(false);
  const [EstimateValue, setEstimateValue] = useState('');
  const [CalendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [CalendarValue, setCalendarValue] = useState('');
  //========================== 그리드 객체 준비 ==========================
  const [gridApi, setGridApi] = useState();
  const onGridReady = params => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();   // 그리드 초기화 시 칼럼 사이즈 자동조절.
  };   // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.

  //================견적 추가==========================
  const addBtn = () => {
    if (gridApi.getDisplayedRowCount() === 0) {  // getDisplayedRowCount : 그리드에 표시된 row 수 count 해줌.
      const newItem = createNewRowData();   // 새로운 row를 만들어라.
      gridApi.updateRowData({ add: [newItem] });   // 만들어진 새로운 row를 그리드에 add 해라.
      console.log("만든 데이터 ::::", newItem)
    } else {
      alert('전표는 한번에 한개씩만 등록 가능합니다. 초기화를 통해 진행해주세요.');
    }  // 즉, 그리드에 암것도 없을 때 1줄 추가 가능함.
  }
  //============데이터 생성 =========
  const createNewRowData = () => {
    let newData = {
      customerName: '',
      estimateDate: EstimateDate["estimateDate"],
      effectiveDate: '',
      empName: sessionId,
      estimateRequester: "",
      description: "",
      statue: 'N'
    }

    return newData;
  };

  //====== 셀클릭 이벤트 =====================
  const onCellClick = (id) => {
    console.log("액션객체 ", dialogData);
    if (id.colDef.field === 'customerName') {
      console.log("여기도 오려나?", id.colDef.field);
      setEstimateDialogOpen(true); // 화면 열기
      setNodeId(id.rowIndex);
      dialogData({
        type: "dialogData",
        divisionCode: "CL-01",
      });
    } else if (id.colDef.field === 'effectiveDate') {
      setCalendarDialogOpen(true);
      setNodeId(id.rowIndex);
    }
  }
  const CalendarClose = value => {
    console.log("달력 닫을때 오는 값", value.data["estimateDate"])
    if (value.division === 'CalendarDialog') {
      setCalendarDialogOpen(false);
      setCalendarValue(value.data["estimateDate"]); // 닫을 때 클릭한 정보 넣기
    } return;
  }

  const handleClose = value => {  // Dialog가 닫힐 때마다 handleClose 이 메서드가 실행됨. value라는 객체를 가지고 있음.
    console.log("캘린더에서 온 데이터", value)

    if (value.division === 'EstimateDialog') {
      setEstimateDialogOpen(false); // 화면 닫기
      setEstimateValue(value.data); // 닫을 때 클릭한 정보 넣기

    }
    return;
  }

  //===== 거래처명 값 생기거나 바뀌면 렌더링====================
  useEffect(() => {

    if (EstimateValue[0] !== undefined) {  // accountDialog에서 accountValue 를 주는데 이게 존재한다면,
      let itemsToUpdate = [];
      gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        if (index !== nodeId) {
          return;
        }   // nodeId : 그리드의 몇 번째 cell에 값을 박을 것인지를 알려줌.

        let estimateData = rowNode.data;   // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
        estimateData.customerName = EstimateValue;   // 계정코드와

        itemsToUpdate.push(estimateData);  // 배열에 집어넣고,
      });
      gridApi.updateRowData({ update: itemsToUpdate });   // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
    };
  }, [EstimateValue]);  // accountValue가 변할 때마다 이 useEffect를 실행하라.
  //===================================================

  //==========유효일자 다이얼로그(Calendar.js)에서 넣어오는 값 렌더링===================
  useEffect(() => {

    if (CalendarValue[0] !== undefined) {  // Calendar에서 CalendarValue 를 주는데 이게 존재한다면,
      let itemsToUpdate = [];
      gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        if (index !== nodeId) {
          return;
        }   // nodeId : 그리드의 몇 번째 cell에 값을 박을 것인지를 알려줌.

        let estimateData = rowNode.data;   // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
        estimateData.effectiveDate = moment(CalendarValue).format('yyyy-MM-DD');   // 계정코드와
        console.log("데이트 형식 변경 필요?", estimateData.effectiveDate);
        itemsToUpdate.push(estimateData);  // 배열에 집어넣고,
      });
      gridApi.updateRowData({ update: itemsToUpdate });   // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
    };
  }, [CalendarValue]);  // accountValue가 변할 때마다 이 useEffect를 실행하라.



  ///========= 버튼 생성============
  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      margin: theme.spacing(0.8),
      "&:hover": {
        backgroundColor: purple[700],
      },
    },
  }))(Button);



  return (
    <div>

      <FormControl style={{ minWidth: "450px" }}>
        <form className={classes.container} noValidate>

          <TextField name="estimateDate" label="견적일자" type={"date"} onChange={handleDateChange} />
          <ColorButton onClick={() => addBtn()}>견적추가</ColorButton>
          <ColorButton>일괄저장</ColorButton>
        </form>


      </FormControl>

      <div
        className={"ag-theme-material"}
        style={{
          height: "300px",
          width: "100%",
        }}
      >
        <AgGridReact
          columnDefs={ColumnDefs}
          rowData={""}
          rowSelection="single"
          // onRowSelected={onRowSelected}
          // onCellEditingStopped={onCellEditingStopped}
          rowHeight="35"
          onGridReady={onGridReady}
          onCellClicked={onCellClick}
        />
      </div>


      <EstimateDialog open={EstimateDialogOpen} DialogData={DialogData} onClose={handleClose} />
      <Calendar open={CalendarDialogOpen} onClose={CalendarClose} />

    </div>
  );
};

export default EstimateRegister;
