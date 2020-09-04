import React,{useState,useEffect} from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {useDispatch, useSelector} from "react-redux";
import * as types from 'ERP/ACCOUNT/ActionType/ActionType';

import {makeStyles,
 } from "@material-ui/core";

 import {
    Button,
    Toolbar,
    AppBar,
    Typography,
  } from "@material-ui/core";

const AddSlip = ({ headInfo, setSlipNo, today, setFlag , flag  , setBatchArray }) => {

const classes = useStyles();  // 스타일 먹임

const { startDate, endDate, slipStatus } = headInfo;  // props로 받아온 headInfo의 상태 값을 비구조 할당.
const [slipFlag, setSlipFlag] = useState(true);  // 전표를 추가 가 한번만 되게 해놓은 true/false 이다 

// 현업나가서는 잘 모르겠지만 Hook 을 잘 쓰는게 좋을것 입니다
// 두번째 인자값은 useCallback 이나 useMemo 의 두번째 인자값이랑 동일 
const empInfo = useSelector(({logInOutReducer}) => logInOutReducer.empInfo , []);
const periodNo = useSelector(({AccReducer}) => AccReducer.periodNo , []);
const data = useSelector(({AccReducer}) => AccReducer.slipList , [startDate,endDate,slipStatus]);

//dispatch Hook 함수이다
const dispatch = useDispatch();

//========================== 그리드 객체 준비 ==========================
const [positionGridApi, setPositionGridApi] = useState();
const onGridReady = params => {
    setPositionGridApi(params.api);
    params.api.sizeColumnsToFit();   // 그리드 초기화 시 칼럼 사이즈 자동조절.
};   // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.


useEffect(
    () => {
        dispatch( { type : types.SEARCH_PERIOD_NO_REQUEST, params : { toDay:today } } );
    }
,[])

// 오늘날짜로 승인이 미결인 전표만 들고옴

//========================== 그리드내용 ==========================
const accountColumnDefs = [
    { headerName: '', field: 'check', width: 50, checkboxSelection: true },  // checkboxSelection : 체크박스 추가함
    { headerName: "전표일련번호", field: "slipNo", width: 150 },
    { headerName: "기수일련번호", field: "accountPeriodNo", width: 100 },
    { headerName: "전표유형", field: "slipType", width: 100, },
    { headerName: "작성날짜", field: "reportingDate", width: 100 },
    { headerName: "작성자명", field: "reportingEmpName", width: 100 },
    { headerName: "작성자코드", field: "reportingEmpCode", width: 100 , hide: true},
    { headerName: "품의내역", field: "expenseReport", width: 180, editable: true },  // editable : 편집가능
    { headerName: "승인날짜", field: "approvalDate", width: 100 },
    { headerName: "승인자", field: "approvalEmpCode", width: 100 },
    { headerName: "승인상태", field: "slipStatus", width: 80 },  
    { headerName: "부서코드", field: "deptCode", hide: true},
    { headerName: "status", field: 'status', hide: true}
];

//========================== 조회 ==========================
const getSlipList = async () => {
    
    if(slipStatus === '' ) {
        return;
    }else{
        dispatch( { type : types.SEARCH_SLIP_REQUEST, 
                    params : { 
                        startDate: startDate,
                        endDate: endDate,
                        slipStatus: slipStatus,
                    }});
        // 밑에는 saga를 사용 하지 않을경우.
        //     const response = await accountApi.get('/account/findRangedSlipList', {
        //         params: {
        //         startDate: startDate,
        //         endDate: endDate,
        //         slipStatus: slipStatus
        //     }
        // });
        // setData(response.data);
        setSlipFlag(true);       
    }
    
};   // 전표조회 버튼 클릭했을 때 파라미터 가져가서 전표 데이터 들고와서 setData 해줌.


//========================== 전표추가 ==========================
const addBtn = () => {
    
    if(positionGridApi.getDisplayedRowAtIndex(positionGridApi.getLastDisplayedRow()) === undefined){    // 조회하지 않고 전표를 추가를 누르면 undefined 가 뜨기때문에 
        setSlipFlag(false)                                                                              // 전표추가를 한번만 하기 위해서 막아두는것
    } else if(positionGridApi.getDisplayedRowAtIndex(positionGridApi.getLastDisplayedRow()).data.slipNo !== 'NEW'){     // 만약 조회를 하고 전표를 추가를 할경우
        setSlipFlag(false)                                                                                              // 그리고 90번째 줄에도 setSlipFlag(true) 를 사용 하는 이유는 조회하고 나서도 다시 전표를 추가 할수 있게 하도록 함
    }
    if(slipFlag){
        const newItem = createNewRowData();   // 새로운 row를 만들어라.
        positionGridApi.updateRowData({ add: [newItem] });   // 만들어진 새로운 row를 그리드에 add 해라.
        setFlag(false);
    }else{
        alert('전표는 한개만 등록 가능 합니다!')
    }
} 
    

const createNewRowData = () => {
    let newData = {
        slipNo: `NEW`,  // 전표 번호 생성
        slipType: '대체',
        accountPeriodNo : periodNo,
        reportingDate: today,
        reportingEmpCode: empInfo.empCode,   // session단위로 올라간 empCode
        reportingEmpName: empInfo.empName,
        slipStatus: '미결',
        deptCode: empInfo.deptCode,   // session단위로 올라간 deptCode
        journalList : [] ,            
        status : 'insert'
    };
    return newData;
};



//========================== 전표삭제 ==========================
const deleteBtn = () => {
    const selectedData = positionGridApi.getSelectedRows();   // 그리드에 선택된 모든 정보를 들고와라.
    if (selectedData.length === 0) {   // 선택된게 없으면.
        alert('삭제할거 선택해라');
    } else {
        setSlipFlag(true)
        positionGridApi.updateRowData({ remove: selectedData });   // 선택된걸 삭제해라.
    }
};



//========================== 그리드초기화 ==========================
const initalBtn = () => {
    positionGridApi.selectAll();   // 그리드에 뿌려진 모든 데이터를 선택해라.
    const allData = positionGridApi.getSelectedRows();   // 선택된 데이터를 담아라.
    positionGridApi.updateRowData({ remove: allData });  // 그리드에서 제거해라.\
    setFlag(true);
};



//========================== 전표저장 ==========================
const saveBtn =  () => {

    if(positionGridApi.getSelectedRows()[0] !== undefined){   // 그리드에서 체크 한게 있으면.
        setBatchArray({slip:positionGridApi.getSelectedRows()});
        setSlipFlag(true);
        initalBtn();
    } else {
        alert('선택된 전표가 없습니다.');
    }
};

//========================== 전표그리드 row를 눌렀을 때, 이벤트 ==========================
const slipChange = () => {
    const rowData = positionGridApi.getSelectedRows();   // 선택된 row 정보
    setSlipNo(rowData[0].slipNo);  // row 정보의 slipNo를 세팅해라. JournalGrid 컴포넌트로 보내기 위함.
};

//==============================================================================
return (
    <>
    <div className={classes.root} style={{ width: '30%', float: 'left' }}>
        <Button variant="contained" color="primary" onClick={getSlipList}>
            조회
        </Button>
        <Button variant="contained" color="primary" onClick={initalBtn}>
            그리드초기화
        </Button>
    </div>
    <div className={classes.root} style={{ width: '26%', float: 'right' }}>
        <Button variant="contained" color="primary" onClick={addBtn}>
            전표추가
        </Button>
        <Button variant="contained" color="primary" onClick={deleteBtn}>
            전표삭제
        </Button>
        <Button variant="contained" color="secondary" disabled={flag} onClick={saveBtn}>
            일괄저장
        </Button>
    </div>
        <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
                <Typography variant="h5">전표</Typography>
            </Toolbar>
        </AppBar>
    <div
        className={"ag-theme-balham"}
        style={{
        height: "250px",
        width: "100%",
        paddingTop: "20px"
    }}>
        <AgGridReact
            columnDefs={accountColumnDefs}
            rowData={data}  // setData된 state를 결국 여기 넣어서 그리드에 표현함.
            rowSelection='single'  // 그리드 여러개 선택가능
            onGridReady={onGridReady}
            onCellClicked={slipChange}   // 그리드 cell 하나 클릭할 때,
        />
    </div>
    <br />
    </>
);
};

// 스타일 관련
const useStyles = makeStyles(theme => ({
paper: {
    padding: theme.spacing(1),
    height: 330,
    width: 1190
},
subCategory: {
    background: "#232f3e",
    color: "white"
},
root: {
    '& > *': {
        margin: theme.spacing(1),
    },
},
}));

export default AddSlip;