//============================= 2020.08.28 양지훈 수정 =============================
import React, { useState, useRef, useCallback } from "react";
import { Button, Paper, AppBar, Toolbar, Typography, TextField, makeStyles} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        fontSize: 16,
      },
    },
    priceRoot:{
        margin: 15
    },
}));

//견적 그리드 columns
const esColumns = [
    { headerName: "거래처코드", field: "customerCode", width: 150, hide:true },
    { headerName: "거래처명", field: "customerName", width: 150 },
    { headerName: "견적일자", field: "estimateDate", width: 150 },
    { headerName: "유효일자", field: "effectiveDate", width: 150 },
    { headerName: "견적담당자", field: "personCodeInCharge", width: 150 },
    { headerName: "견적요청자", field: "estimateRequester", width: 150, editable: true },
    { headerName: "비고", field: "description", width: 150, editable: true },
    { headerName: "CRUD상태", field: "status", width: 150 }, //기존에 Status 였음.
];

// 견적 상세 그리드 Columns
const esDetailColumns = [
    //please checked setting

    { headerName: "품목코드", field: "itemCode", width: 150 , hide:true },
    { headerName: "품목명", field: "itemName", width: 150 },
    { headerName: "단위", field: "unitOfEstimate", width: 150 },
    { headerName: "견적요청일(납기일)", field: "dueDateOfEstimate", width: 150 },
    { headerName: "견적수량", field: "estimateAmount", width: 150 },
    { headerName: "견적단가", field: "unitPriceOfEstimate", width: 150 },
    { headerName: "합계액", field: "sumPriceOfEstimate", width: 150 },
    { headerName: "비고", field: "description", width: 150, editable: true },
    { headerName: "CRUD상태", field: "status", width: 150 },
    // { headerName: "이전CRUD상태", field: "beforeStatus", width: 150, hide:true }
];

//modal window content Head
const commColumnDefs = [
    { headerName: "상 세 코 드 번 호", field: "detailCode", width: 100, },
    { headerName: "상 세 코 드 이 름", field: "detailCodeName", width: 100, },
    { headerName: "사 용 여 부", field: "codeUseCheck", width: 100, }
];

const EsRegister = () => {
    // 스타일 적용하기
    const classes = useStyles();

    // 견적담당자 이름
    const sessionId = sessionStorage.getItem('empNameInfo_token');

    // 견적 그리드 상태 변경
    const [esPositionGridApi, setEsPositionGridApi] = useState('');
    // 견적상세 그리드 상태 변경
    const [esDetailPositionGridApi, setEsDetailPositionGridApi] = useState('');
    // 공통 모달 그리드 상태 변경
    const [commModalGridApi,setCommModalGridApi] = useState('');
    // 견적추가 가 한번만 되게 해놓은 true/false;
    const [esFlag, setEsFlag] = useState(true);
    // modal window true: 보이기/ false: 가리기
    const [openEs, setOpenEs] =useState(false);
    // modal 화면에 보여질 grid data
    const [codeList, setCodeList] = useState([]);
    // 견적 그리드 rows
    const [esList, setEsList] = useState([]);
    // 견적상세 행들의 값
    const [esDetailList, setEsDetailList] = useState([]);
    // 견적 그리드 모달 달력
    const [calendarModal, setCalendarModal] =  useState(false);
    // 견적 상세 그리드 달력 모달
    const [calendarEsDetail, setCalendarEsDetail] = useState(false);
    // 견적 상세 그리드 견적수량,단가,합계 모달
    const [showPrice, setShowPrice] = useState(false);
    // 견적수량,단가,합계의 값;
    const [inputs, setInputs] = useState({
        estimateAmount: '',
        standardUnitPrice:'',
        sumPrice: ''
    });  
    const { estimateAmount, standardUnitPrice, sumPrice } = inputs;

    // 견적상세 rowId
    const nextRowId = useRef(0);

    // 모달의 그리드 api
    const onModaGridReady = params => {
        console.log('commModalGridApi',params.api);
        setCommModalGridApi(params.api);
        params.api.sizeColumnsToFit();
    };
    // 견적 그리드 api
    const onGridReady = params => {
        console.log('esPositionGridApi',params.api);
        setEsPositionGridApi(params.api);
        params.api.sizeColumnsToFit();
    };
    // 견적상세 그리드 api
    const onGridReady2 = params => {
        console.log('esDetailPositionGridApi',params.api);
        setEsDetailPositionGridApi(params.api);
        params.api.sizeColumnsToFit();
    };

    // leadingZeros는 자릿수를 맞추기 위한 펑션임.
    const leadingZeros =(date, digits) => {
        let zero = '';
        date = date.toString();
        if (date.length < digits) {
            for (let i = 0; i < digits - date.length; i++)
                zero += '0';
        };
        return zero + date;
    };
    // 견적등록일자 오늘 날짜 기본 선택;
    let now = new Date();
    let year = now.getFullYear();
    let month = leadingZeros(now.getMonth() + 1, 2);
    let date = leadingZeros(now.getDate(), 2);
    let today = year + '-' + month + '-' + date;

    // 견적추가버튼
    const esInsertBtn = () => {
        const dateVal = document.getElementsByName('addEsDate')[0].value;
        if(!esFlag) {
            alert('등록중인 견적이 존재합니다');
            return;
        }else if(esFlag){
            // useState로 바꿔야 하나?****************
            let newRow = {
                customerCode: 'open modal',
                customerName: 'open modal',
                estimateDate: dateVal,
                effectiveDate: 'datepicker',
                personCodeInCharge: sessionId,
                estimateRequester: 'edittable',
                description: 'edittable',
                status: 'INSERT',
            };
            setEsList([
                ...esList,
                newRow,
            ]);
            setEsFlag(false);
        };
    };

    //견적 그리드 cell click event (===handleClickOpen)
    const onEsCellClick = async (e) => {
        // column name
        let colName= e.colDef.field;
        console.log('cell click event', colName);
        //거래처 검색
        if (colName === 'customerName') {
            //modal open
            setOpenEs(true);
            try {
                await axios.get(
                    'http://localhost:8282/logi/base/codeList.do',
                    { params: { divisionCode: 'CL-01' }, },
                ).then( response => {
                    const jsonData = response.data.detailCodeList; // return array;
                    setCodeList(jsonData);// data 불변성 적용해야 한다.!!!!!!!!!!!!!!!!!!!!
                });
            } catch (e) {
                console.log(e);
            }
        //유효일자 편집
        } else if (colName === 'effectiveDate') {
            setCalendarModal(true);
        };
    };

    // 유효일자 modal calendar value update;
    const modalCalendarOnChange = e => {
        setCalendarModal(false);
        setEsList(
            esList.map( row => ({
                ...row,
                effectiveDate:e.target.value,
            }))
        );
    };

// ****************************************************************************************************************

    // 유효일자 modal calendar 닫기버튼
    const closeCalendarDialog = () => {
        setCalendarModal(false);
        setCalendarEsDetail(false);
    };

    // dbData modal window cell Click; useEffect 적용하기
    const handleClose = event => {
        // console.log('modal onClick_event', event);
        // console.log('modal onClick_event.data', event.data);
        // console.log('modal onClick_divisionCodeNo', event.data.divisionCodeNo);
        setOpenEs(false);
        const commValueData = event.data;
        const divisionCodeNo=event.data.divisionCodeNo;
        // 거래처 data를 가져왔을 때;
        if(divisionCodeNo === "CL-01"){
            setEsList(
                esList.map( row =>({
                        ...row,
                        customerCode : commValueData.detailCode,
                        customerName : commValueData.detailCodeName,})
                )
            );
        // divisionCodeNo: "IT-CI"
        } else if (divisionCodeNo.indexOf("IT") !== -1) {
            const selRow = esDetailPositionGridApi.getSelectedRows()[0].rowId;
            setEsDetailList(
                esDetailList.map( row =>
                    row.rowId === selRow ? {
                        ...row,
                        itemCode : commValueData.detailCode,
                        itemName : commValueData.detailCodeName,
                    } : row
                )
            );
        } else if (divisionCodeNo.indexOf("UT") !== -1) {
            // console.log('** target **',event.data.codeUseCheck);
            if(event.data.codeUseCheck === 'N'){
                alert('사용할 수 없습니다');
                return;
            };
            const selRow = esDetailPositionGridApi.getSelectedRows()[0].rowId;
            setEsDetailList(
                esDetailList.map( row =>
                    row.rowId === selRow ? {
                        ...row,
                        unitOfEstimate : commValueData.detailCode,
                    } : row
                )
            );
        }
    };
    // dbData modal window 닫기버튼
    const closeEsDialog = () => {
        setOpenEs(false);
        // 모달창 닫을 때 내부 데이터 화면에서 지우기 구현해야 함;
    };

// ****************************************************************************************************************

    // 견적상세추가 - fn-concat 사용해 ag-grid에 추가; 
    const esDetailInsertBtn = () => {
        const esRow = esPositionGridApi.getSelectedRows().length;
        console.log('::: esDetailList :::',esDetailList);
        if(esRow < 1){
            alert('견적을 먼저 추가해주세요;');
            return;
        };
        // 견적 행이 있을 때 처리
        const newEsDetailRow = [{
            rowId: nextRowId.current,
            itemCode: 'open modal',
            itemName: 'open modal',
            unitOfEstimate: 'open modal',
            dueDateOfEstimate: 'datePicker',
            estimateAmount: 'open modal',
            unitPriceOfEstimate: 'db',
            sumPriceOfEstimate: 'open modal',
            description: 'edittable',
            status: 'INSERT',
        }];
        setEsDetailList( esDetailList.concat(newEsDetailRow) );
        nextRowId.current += 1;
    };
    //견적상세 셀 클릭
    const onEsDetailCellClick = async (e) => {
        // e.event.target === 클릭한 cell의 node;
        console.log('* 견적상세셀클릭-e.event.target *', e.event.target);
        console.log('** 견적상세셀클릭-e.data **', e.data);

        const colName= e.colDef.field;
        if (colName === 'itemName') {
            //modal open
            setOpenEs(true);
            try {
                await axios.get(
                    'http://localhost:8282/logi/base/codeList.do',
                    { params: { divisionCode: 'IT-_I' }, },
                ).then( response => {
                    const jsonData = response.data.detailCodeList;// return array;
                    setCodeList(jsonData);
                });
            } catch (e) {
                console.log(e);
            }
        // (견적)단위 Click
        } else if (colName === 'unitOfEstimate') {
            setOpenEs(true);
            try {
                await axios.get(
                    'http://localhost:8282/logi/base/codeList.do',
                    { params: { divisionCode: 'UT' }, },
                ).then( response => {
                    const jsonData = response.data.detailCodeList; // return array;
                    setCodeList(jsonData);
                });
            } catch (e) {
                console.log(e);
            }
        // 견적요청일자(납기일) Click
        } else if (colName === 'dueDateOfEstimate') {
            setCalendarEsDetail(true);
        // 견적수량, 견적단가, 합계액 Click
        } else if (colName === 'estimateAmount' || colName === 'unitOfEstimate' || colName === 'sumPriceOfEstimate') {
            setShowPrice(true);
            const itemcode = esDetailPositionGridApi.getSelectedRows()[0].itemCode;
            try {
                await axios.get(
                    'http://localhost:8282/logi/logisticsInfo/getStandardUnitPrice.do',
                    { params: { itemCode: itemcode }, },
                ).then( response => {
                    const itemPrice = response.data.gridRowJson; // return array;
                    setInputs({
                        standardUnitPrice:itemPrice,
                    });
                });
            } catch (e) {
                console.log(e);
            }
        };
    };
    // 견적상세 calendar value update
    const calendarEsDetailOnChange = e => {
        setCalendarEsDetail(false);
        const selRow = esDetailPositionGridApi.getSelectedRows()[0].rowId;
        setEsDetailList(
            esDetailList.map( row =>
                row.rowId === selRow ? {
                    ...row,
                    dueDateOfEstimate : e.target.value,
                } : row
            )
        );
    };
    // 견적 단가 책정 modal update
    const onSumChange = e => {
        // console.log('* onSumChange *', e.target);
        // console.log('* sumPrice *', e.target.value * standardUnitPrice);
        setInputs({
            ...inputs,
            estimateAmount:e.target.value,
            sumPrice:e.target.value * standardUnitPrice,
        });
    };
    // 견적 단가 책정 modal 확인 버튼
    const handlePrice = e => {
        setShowPrice(false);
        const selRow = esDetailPositionGridApi.getSelectedRows()[0].rowId;
        setEsDetailList(
            esDetailList.map( row =>
                row.rowId === selRow ? {
                    ...row,
                    estimateAmount : estimateAmount,
                    unitPriceOfEstimate : standardUnitPrice,
                    sumPriceOfEstimate : sumPrice,
                } : row
            )
        );
        setInputs({
            estimateAmount: '',
            standardUnitPrice:'',
            sumPrice: '',
        });
    };
    // 체크한견적상세삭제
    const esDetailRemove = useCallback( () => {
        const selRow = esDetailPositionGridApi.getSelectedRows()[0].rowId;
        console.log('* selRow * ',selRow);
        setEsDetailList( esDetailList => esDetailList.filter( esDetailRow => esDetailRow.rowId !== selRow ));
    }, [esDetailPositionGridApi]);

    // 일괄저장버튼
    const batchProcess = () => {
        // if( rowObject.itemCode == "" ) {
        //     alertError("사용자 에러", "품목코드를 입력하지 않은 행이 있습니다 </br> 저장 목록에서 제외합니다");   return;            
        //  } else if(rowObject.unitOfEstimate == "" ) {
        //     alertError("사용자 에러", "단위를 입력하지 않은 행이 있습니다 </br> 저장 목록에서 제외합니다");
        //  } else if(rowObject.dueDateOfEstimate == ""){
        //     alertError("사용자 에러", "납기일을 입력하지 않은 행이 있습니다 </br> 저장 목록에서 제외합니다");
        //  } else if(rowObject.estimateAmount == "0" || rowObject.unitPriceOfEstimate == "0") {
        //     alertError("사용자 에러", "견적수량/견적단가를 입력하지 않은 행이 있습니다 </br> 저장 목록에서 제외합니다");
        //  } else {
        //     resultList.push(rowObject);   
        //  }
        let batchObj = esList[0];
        batchObj.estimateDetailTOList=esDetailList;
        console.log("batchObj:: ",JSON.stringify(batchObj));

        const confirmMsg =  "견적일자 " + today +
                            " , 견적상세 " +  esDetailList.length +
                            "건을 추가합니다. \r\n계속하시겠습니까?" ; 
        if(window.confirm(confirmMsg)){
            // console.log("키값 구하는 메서드: "+Object.keys(newEstimateRowValue));    
            try {
                axios.post(
                    "http://localhost:8282/logi/sales/addNewEstimates.do",
                    { estimateDate: today, newEstimateInfo: batchObj,},
                    { headers: { "Content-Type": "application/json" },}
                ).then( response => {
                    const result = response.data.result; // return array;
                    console.log(result);
                    const resultMsg =   "< 견적 등록 내역 >   <br/><br/>"  +
                                        "새로운 견적번호 : " + result.newEstimateNo + "</br></br>" +
                                        "견적상세번호 : " + result.INSERT  + "</br></br>" +
                                        "위와 같이 작업이 처리되었습니다";
                    alert(resultMsg);
                })
            } catch (e) {
                console.log('* 에러다이 *',e);
            };
            // 견적 그리드, 견적상세 그리드 init
            setEsDetailList([]);
            setEsList([]);
        };
    };

    return (
        <>
            <h1>견 적 등 록</h1>
            <hr/>
            <div  align="right">
                <fieldset name='addEstimate' align='center'>
                    <legend>
                        <strong>견적등록일자</strong>
                    </legend>                  {/* onChange : 값이 변경되면 콜백이 발생. */}
                    <TextField name="addEsDate" type={"date"} defaultValue={today} //ref={useReference} onChange={onDateChange}
                    />
                </fieldset>
            </div>
            <br/>
            <Paper>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h5'>견 적</Typography>
                        <div className={classes.root}>
                            <Button variant="contained" color="secondary" size="large" onClick={esInsertBtn}
                            >견적추가</Button>
                            <Button variant="contained" color="secondary" size="large" onClick={batchProcess}
                            >견적일괄저장</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={"ag-theme-balham"} style={{ height: "100px", width: "100%", textAlign: 'center', paddingTop: "0px" }} >
                    <AgGridReact
                                columnDefs={esColumns}
                                rowData={esList}
                                rowSelection='single'
                                onGridReady={onGridReady}
                                onCellClicked={onEsCellClick} />
                </div>
                <hr/>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h5'>견 적 상 세</Typography>
                        <div className={classes.root}>
                            <Button variant="contained" color="secondary" size="large" onClick={esDetailInsertBtn}
                                >견적상세추가</Button>
                            <Button variant="contained" color="secondary" size="large" onClick={esDetailRemove}
                            >체크한견적상세삭제</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={"ag-theme-balham"} style={{ height: "200px", width: "100%", textAlign: 'center', paddingTop: "0px" }} >
                <AgGridReact
                    columnDefs={esDetailColumns}
                    rowData={esDetailList}
                    rowSelection='single'
                    onGridReady={onGridReady2}
                    onCellClicked={onEsDetailCellClick}
                />
                </div>
            </Paper>
            {/* {견적 - 거래처명},{견적상세 - 품목명} - agrid dialog; */}
            <div>
                <Dialog open={openEs} onClose={closeEsDialog} fullWidth={true} maxWidth={'xs'}>
                    <DialogTitle id="simple-dialog-title">회 사 목 록</DialogTitle>
                    <DialogContent>
                        <List>
                            <div className={"ag-theme-balham"}
                                style={{ height: "300px", width: "100%", paddingTop: "8px" }}>
                                <AgGridReact
                                    columnDefs={commColumnDefs}
                                    rowData={codeList}   // 뿌릴 data
                                    rowSelection='single'  // 하나만 선택 가능.
                                    onGridReady={onModaGridReady}
                                    onCellClicked={handleClose}  // cell을 클릭하면, handleClose가 실행된다.
                                />
                            </div>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={closeEsDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            {/* 견적 - 유효일자 - date dialog */}
            <div>
                <Dialog open={calendarModal} onClose={closeCalendarDialog} fullWidth={true} maxWidth={'xs'}>
                    <div>
                    <DialogTitle id="simple-dialog-title">유 효 일 자</DialogTitle>
                    </div>
                    <DialogContent align='center'>
                    <TextField name="addEsDate2" type={"date"} onChange={modalCalendarOnChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={closeCalendarDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
             {/* 견적상세 - dueDateOfEstimate(납기일) - date dialog */}
            <div>
                <Dialog open={calendarEsDetail} onClose={closeCalendarDialog} fullWidth={true} maxWidth={'xs'}>
                    <div>
                    <DialogTitle id="simple-dialog-title">납 기 일 자</DialogTitle>
                    </div>
                    <DialogContent align='center'>
                    <TextField name="addEsDate2" type={"date"} onChange={calendarEsDetailOnChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={closeCalendarDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Dialog open={showPrice} >
                <DialogTitle id="simple-dialog-title">견 적 단 가 책 정</DialogTitle>
                <DialogContent align='center'>
                    <div> {"수량 : "}
                        <input className={classes.priceRoot} name='amount' value={estimateAmount} onChange={ e => onSumChange(e)}
                        />
                    </div>
                    <div> {"단가 : "}
                        <input className={classes.priceRoot} name='price' value={standardUnitPrice}
                        />
                    </div>
                    <div> {"합계액 :"} 
                        <input className={classes.priceRoot} name='sum' value={sumPrice} />
                    </div>
                </DialogContent>
                <DialogActions><Button onClick={e => handlePrice(e)} color="primary"
                >확인</Button>
                </DialogActions>
        </Dialog>
        </>
    );
};

export default EsRegister;
//========================================== 2020.08.28 양지훈 수정 ================================================