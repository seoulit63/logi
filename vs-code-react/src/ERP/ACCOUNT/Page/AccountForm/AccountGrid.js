//********************************** 2020-08-26 정대현 추가 **********************************
import React,{useState} from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const AccountGrid = ({ accountInfo}) => {
const data = accountInfo;

//========================== 그리드 객체 준비 ==========================
const [positionGridApi, setPositionGridApi] = useState();
const onGridReady = params => {
    setPositionGridApi(params.api);
    params.api.sizeColumnsToFit();   // 그리드 초기화 시 칼럼 사이즈 자동조절.
};   // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.



//========================== 그리드내용 ==========================
const accountColumnDefs = [
    { headerName: "계정과목코드", field: "accountInnerCode", width: 80},
    { headerName: "계정과목명", field: "accountName", width: 100 },
    { headerName: "성격", field: "accountCharacter", width: 80 },
];


return (
    <>
    <div
        className={"ag-theme-balham"}
        style={{
            height: "560px",
            width: "430px",
            paddingTop: "60px",
            paddingLeft: "25px",
        }}
    >
        <AgGridReact
            columnDefs={accountColumnDefs}
            rowData={data}  // setData된 state를 결국 여기 넣어서 그리드에 표현함.
            onGridReady={onGridReady}
        />
    </div>
    <br />
    </>
);
};

export default AccountGrid;