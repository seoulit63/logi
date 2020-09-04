//========================================== 2020.08.24 양지훈 수정 ================================================

//================= 2020.08.24 양지훈 수정=========================================================================

/******************************************************************
 * Class Name:  EsGather.js
 * Description: 견적 조회/수정/등록 components를 취합하는 Component
 * author:      양지훈
 * since:       2020-08-21
 * version 1.0
 *  Copyright (C) JiHun Yang All rights reserved.
 ******************************************************************/
import React, { useState, useCallback } from "react";
import { AppBar, Toolbar, Typography, Paper, TextField, Button, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import axios from "axios"; 
import { makeUseAxios } from "axios-hooks";

// 견적 그리드 Columns
const esColumns = [
    { headerName: "견적번호", field: "estimateNo", width: 150 },
    { headerName: "거래처코드", field: "customerCode", width: 150 },
    { headerName: "견적일자", field: "estimateDate", width: 150 },
    { headerName: "유효일자", field: "effectiveDate", width: 150 },
    { headerName: "수주여부", field: "contractState", width: 150 },
    { headerName: "견적요청자", field: "estimateRequester", editable: true, width: 150 },
    { headerName: "견적담당자코드", field: "personCodeInCharge", width: 150 },
    { headerName: "비고", field: "description", editable: true, width: 150 },
  ];

// 견적 상세 그리드 Columns
const esDetailColumns = [
    { headerName: "", field: "checked", width: 30 },
    { headerName: "견적상세번호", field: "estimateDetailNo", width: 150 },
    { headerName: "견적번호", field: "estimateNo", width: 150 },
    { headerName: "품목코드", field: "itemCode", width: 150 },
    { headerName: "품목명", field: "itemName", width: 150 },
    { headerName: "단위", field: "unitOfContract", width: 150 },
    { headerName: "견적요청일(납기일)", field: "dueDateOfEstimate", width: 150 },
    { headerName: "견적수량", field: "estimateAmount", width: 150 },
    { headerName: "견적단가", field: "unitPriceOfEstimate", width: 150 },
    { headerName: "합계액", field: "sumPriceOfEstimate", width: 150 },
    { headerName: "비고", field: "description", width: 150 },
];

const EsInfo = () => {

    //기준일
    const [dateSearchCondition, setDateSearchCondition] = useState('');
    //날짜
    const [date, setDate] = useState({
        startDate: '',
        endDate: '',
    });
    //날짜 구조 분해 문법(=비구조화 할당)
    const { startDate, endDate } = date;
    //견적 data array
    const [esList, setEsList] = useState([]);
    const [esDetailList, setEsDetailList] = useState([]);
    
    //날짜 변경 fn
    const onChangeDate = (e) => {
        const { value, name } = e.target;
        setDate({
            ...date,
            [name]: value,
        });
    };
    
    //기준일 변경 fn
    const onChangeCondition = (e) =>{
        setDateSearchCondition(e.target.value);
    };

    //url
    // const [url, setUrl] = useState('');
    //
    // const useAxios = makeUseAxios({
    //     axios: axios.create({ baseURL: "http://localhost:8282/" })
    // });
    // const [{ data }, refetch] = useAxios(url);

    //export render fn
    // const estimateList = () => {

    //     if(!fromDate && !toDate){
    //         alert('날짜를 선택해주세요 ^^');
    //         return;
    //     }else{
    //         setUrl('logi/business/findEstimateList?fromDate='+fromDate+'&toDate='+toDate);
    //         console.log(data);
    //         refetch();
    //     }
    // };

    // 견적조회 버튼
    const searchEs = async () => {
        if(!dateSearchCondition){
            alert('기준일 선택해주세요');
            return;
        }
        if(!startDate && !endDate){
            alert('날짜를 선택해주세요');
            return;
        }
        try {
            const response = await axios.get(
                'http://localhost:8282/logi/sales/searchEstimate.do',
                { params: { dateSearchCondition: dateSearchCondition, startDate: startDate, endDate:endDate },  },
            ).then( response => {
                const jsonData = response.data.gridRowJson; // return array;
                setEsList(jsonData);
                const array = [];
                jsonData.forEach( data => {
                    array.push( setEsDetailList(data.estimateDetailTOList));
                });
                console.log('array',array);
            });
        } catch (e) {
            console.log(e);
        }
    };


    ////////////////////////////////

    //역할 모름
    const [positionGridApi, setPositionGridApi] = useState('');
    //역할 모름
    const onGridReady = params => {
        setPositionGridApi(params.api);
        params.api.sizeColumnsToFit(); 
    };

//     //========================== 그리드 객체 준비 ==========================
//   const [gridApi, setGridApi] = useState();
//   const onGridReady = params => {
//     setGridApi(params.api);
//     params.api.sizeColumnsToFit();   // 그리드 초기화 시 칼럼 사이즈 자동조절.
//   };   // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.

//   //================견적 추가==========================
//   const addBtn = () => {
//     if (gridApi.getDisplayedRowCount() === 0) {  // getDisplayedRowCount : 그리드에 표시된 row 수 count 해줌.
//       const newItem = createNewRowData();   // 새로운 row를 만들어라.
//       gridApi.updateRowData({ add: [newItem] });   // 만들어진 새로운 row를 그리드에 add 해라.
//       console.log("만든 데이터 ::::", newItem)
//     } else {
//       alert('전표는 한번에 한개씩만 등록 가능합니다. 초기화를 통해 진행해주세요.');
//     }  // 즉, 그리드에 암것도 없을 때 1줄 추가 가능함.
//   }
//   //============데이터 생성 =========
//   const createNewRowData = () => {
//     let newData = {
//       customerName: '',
//       estimateDate: EstimateDate["estimateDate"],
//       effectiveDate: '',
//       empName: sessionId,
//       estimateRequester: "",
//       description: "",
//       statue: 'N'
//     }

//     return newData;
//   };

    //견적상세추가
    const addEsDetail = () => {
        //화면에 나타나는 견적상세행의 개수
        console.log('DisplayedRowCount',  positionGridApi.getDisplayedRowCount());
        const newRow = [{
            estimateDetailNo: '',
            itemName: '',
            unitOfEstimate: '',
            dueDateOfEstimate: '',
            estimateAmount: 0,
            unitPriceOfEstimate: 0,
            sumPriceOfEstimate: 0,
            description: '',
            statue: 'N',
        }];
        positionGridApi.updateRowData({ add: [newRow] });// 만들어진 새로운 row를 그리드에 add 해라.
        console.log('새로운 행:', newRow);
    };

    return (
        <>
            <h1>견 적 조 회 / 수 정</h1>
            <hr/>
            <RadioGroup row aria-label="position" value={dateSearchCondition} onChange={onChangeCondition} >
                <fieldset name='dateSearchCondition'>
                    <legend>
                        <strong>기준일</strong>
                    </legend>
                    <FormControlLabel value="estimateDate" control={<Radio />} label="견적일자" />
                    <FormControlLabel value="effectiveDate" control={<Radio />}  label="유효일자" />
                </fieldset>
                <div align='left'>
                    <TextField name="startDate" type={"date"} defaultValue={startDate} onChange={onChangeDate} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField name="endDate" type={"date"} defaultValue={endDate} onChange={onChangeDate} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant={"contained"} color={"primary"} onClick={searchEs}
                    >견적조회</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                     <Button variant={"contained"} color={"primary"} //onClick={searchEs}
                    >PDF출력/저장</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                     <Button variant={"contained"} color={"primary"} //onClick={searchEs}
                    >메일로 보내기</Button>
                </div>
            </ RadioGroup>
            <br/>
            <Paper>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6'>견 적</Typography>
                    </Toolbar>
                </AppBar>
                <div className={"ag-theme-balham"}
                     style={{ height: "200px", width: "100%", textAlign: 'center', paddingTop: "0px" }} >
                    <AgGridReact columnDefs={esColumns}
                                 rowData={esList}
                                 rowSelection='single'
                                 onGridReady={onGridReady} />
                </div>
                <hr/>
                <div align='left'>
                <Button variant={"contained"} color={"primary"} onClick={addEsDetail}
                    >견적상세추가</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant={"contained"} color={"primary"} //onClick={searchEs}
                >체크한견적상세삭제</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant={"contained"} color={"primary"} //onClick={searchEs}
                >일괄저장</Button>
                </div>
                <br/>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6'>견 적 상 세</Typography>
                    </Toolbar>
                </AppBar>
                <div className={"ag-theme-balham"}
                     style={{ height: "250px", width: "100%", textAlign: 'center', paddingTop: "0px" }} >
                    <AgGridReact columnDefs={esDetailColumns}
                                 rowData={esDetailList}
                                 rowSelection='single'
                                 onGridReady={onGridReady} />
                </div>
            </Paper>
        </>
    );
};

export default EsInfo;

//================= 2020.08.24 양지훈 수정=========================================================================
