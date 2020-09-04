import React, { useState, useEffect } from 'react';

import * as types from 'ERP/ACCOUNT/ActionType/ActionType';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux";

import AccountDialog from './Dialogs/AccountDialog'
import BalanceDialog from './Dialogs/BalanceDialog'
import CustomerDialog from './Dialogs/CustomerDialog'
import JournalDetailDialog from './Dialogs/JournalDetailDialog';

const AddJournal = ({ slipNo, flag , setFlag , batchArray , setBatchArray}) => {
    // slipNo : SlipGrid 컴포넌트에서 넘어온 slipNo로 journal 조회함.
    // flag : 3개 버튼 활성화.

    const dispatch = useDispatch();

    const data = useSelector(({AccReducer}) => AccReducer.journalList , []);

    //========================== 그리드 객체 준비 ==========================
    const [gridApi, setGridApi] = useState();

    const classes = useStyles();

    const [nodeId, setNodeId] = useState('');    // 분개 그리드 한 cell을 클릭했을 때 어느 줄에 넣을지에 대한 정보를 가지고 있음.
    const [lPrice, setLPrice] = useState(0);    // 차변의 금액
    const [rPrice, setRPrice] = useState(0);    // 대변의 금액
    const [breakEffect,setBreakEffect] = useState(true); // useEffect 가 반복되서 무한으로 작동되어서 사용하게됨
    
    useEffect(                                           // 음... 먼가 찜찜함..
        () => {                                          // 나중에 머리가 더 비상하시면 수정을 좀 해주시길 바랍니다 ...
            if(!breakEffect) return;
            let journalData = []
            if(gridApi === undefined) return;
                if(lPrice - rPrice !== 0 ) {
                    alert("대차변 금액이 맞지 않습니다");
                    setBreakEffect(false)
                    initalBtn()
                    return;
                }
            gridApi.forEachNode((n,i)=>{journalData.push(n.data)});
            batchArray.slip[0].journalList = journalData;
            //console.log(batchArray);
            setBatchArray(batchArray)
            setBreakEffect(false)
            initalBtn()
        },[batchArray]
    )


    const onGridReady = params => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    };
 

    //========================== 그리드초기화 ==========================
    const initalBtn = () => {
        gridApi.selectAll();      // 그리드를 모두 선택해라.
        const allData = gridApi.getSelectedRows();   // 선택한 그리드 데이타 들고온나.
        gridApi.updateRowData({ remove: allData });  // 데이터 전부 지아라.
    };


    //========================== 분개조회 ==========================
    useEffect(() => {
      if (slipNo === '' || slipNo === 'NEW') return ;
            dispatch({ type : types.SEARCH_JOURNAL_REQUEST, params : { slipNo: slipNo }});
        // try {
        //     async function getJournalListForSlip() {
        //         const response = await Axios.get('http://localhost:8282/acc/account/findSingleJournalList', {
        //             params : {
        //                       slipNo: slipNo
        //             }
        //         });
        //         setData(response.data.journalList);
        //     };
        // getJournalListForSlip();
        // } catch (error) {
        // }
    }, [slipNo]);   // SlipGrid 컴포넌트에서 보낸 slipNo 가 바뀔 때마다, slipNo 를 파라미터로 분개 List를 가져와라. setData 해라.

    
    const addBtn = () => {
        setFlag(false)
        setBreakEffect(true)
        const newItem = createNewRowData();   // 새 row 만들어서
        gridApi.updateRowData({ add: [newItem] });   // 그리드에 추가시켜라.
    }
    const createNewRowData = () => {
        let newData = {
            journalNo: `NEW JOURNAL`,   // 여기서 분개 번호가 만들어짐.
            slipNo: slipNo,
            leftDebtorPrice: 0,   // 차변
            rightCreditsPrice: 0,   // 대변
            summaryNumber: 0,   // 몰라. db에 있길래 걍 넣었음.
            price:0,
        };
        return newData;
    };



    //========================== 분개그리드 클릭 이벤트 ==========================

    // Dialog는 분개 그리드의 각 cell을 클릭했을 때 띄위지는데, 밑에 return 문에 이미 컴포넌트화 해서 뿌려놓았다. 그게 뜨는 것임.
    // 각 cell을 클릭했을 때, ...DialogOpen 이라는 state로  값이 true가 되면서 Dialog가 띄워짐.
    // 그러면서 Dialog 컴포넌트에서 보낸 ...Value 값이 각 state에 저장되어,
    // 다시 분개 그리드에 뿌려지는 형태가 되는 것.
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    const [selValue, setselValue] = useState('');
    const [accountDialogOpen, setAccountDialogOpen] = useState(false);
    const [accountValue, setAccountValue] = useState('');
    const [balanceDialogOpen, setBalanceDialogOpen] = useState(false);
    const [balanceValue, setBalanceValue] = useState('');
    const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
    const [journalDetailDialogOpen, setJournalDetailDialogOpen] = useState(false);
    const [customerValue, setCustomerValue] = useState('');

    const handleClose = value => {  // Dialog가 닫힐 때마다 handleClose 이 메서드가 실행됨. value라는 객체를 가지고 있음.
        if (value.division === 'accountDialog') {
                setAccountDialogOpen(false);
            if(value.data === undefined) return;
                setAccountValue(value.data);
        } else if (value.division === 'balanceDialog') {
                setBalanceDialogOpen(false);
            if(value.data === undefined) return;
                setBalanceValue(value.data);
        } else if (value.division === 'customerDialog') {
                setCustomerDialogOpen(false);
            if(value.data === undefined) return;
                setCustomerValue(value.data);
        }else if (value.division === 'detailDialog') {
            setJournalDetailDialogOpen(false);
        }
    };   // value는 어느 그리드인지 구분하기 위해서 division 이라는 key와 Dialog를 클릭했을 때 저장되는 data 라는 key를 가지고 있다.

    useEffect(() => {
        if (accountValue[0] !== undefined) {  // accountDialog에서 accountValue 를 주는데 이게 존재한다면,
            let itemsToUpdate = [];
            gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
                if (index !== nodeId) {
                    return;
                }   // nodeId : 그리드의 몇 번째 cell에 값을 박을 것인지를 알려줌.
                let accountData = rowNode.data;   // rowNode : Dialog에서 넘어온 data를 accountData에 넣고,
                accountData.accountCode = accountValue[0].accountCode;   // 계정코드와
                accountData.accountName = accountValue[0].accountName;   // 계정명을 넣고,
                itemsToUpdate.push(accountData);  // 배열에 집어넣고,
            });
            gridApi.updateRowData({ update: itemsToUpdate });   // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
        };
    }, [accountValue]);  // accountValue가 변할 때마다 이 useEffect를 실행하라.

    useEffect(() => {
        if (balanceValue) {  // 대차구분 value가 존재한다면,
            let itemsToUpdate = [];
            gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
                if (index !== nodeId) {
                    return;
                }
                let balanceData = rowNode.data;
                balanceData.balanceDivision = balanceValue;
                itemsToUpdate.push(balanceData);
            });
            gridApi.updateRowData({ update: itemsToUpdate });   // 대차구분 cell에 update 시켜라.
        };
    }, [balanceValue]);   // balanceValue 변할 때마다 이 useEffect를 실행하라.

    useEffect(() => {
        if (customerValue) {
            let itemsToUpdate = [];
            gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
                if (index !== nodeId) {
                    return;
                }
                let customerData = rowNode.data;
                customerData.customerCode = customerValue[0].customerCode;
                customerData.customerName = customerValue[0].customerName;
                itemsToUpdate.push(customerData);
            });
            gridApi.updateRowData({ update: itemsToUpdate });
        };
    }, [customerValue]);   // 마찬가지다.

    const onCellClicked = id => {   // cell을 클릭했을 때마다 일어나는 event.
        if (id.colDef.field === 'accountName') {   // 계정코드 또는 계정명 cell을 클릭했을 때,
            setselValue('abcdefg');
            setAccountDialogOpen(true);
            setNodeId(id.rowIndex);  // rowIndex : 몇번째 줄인지 알려줌.
        } else if (id.colDef.field === 'balanceDivision') {   // 대차구분 cell을 클릭했을 때,
            setBalanceDialogOpen(true);
            setNodeId(id.rowIndex);
        } else if (id.colDef.field === 'customerCode' || id.colDef.field === 'customerName') {   // 거래처코드, 거래처명 cell을 클릭했을 때,
            setCustomerDialogOpen(true);
            setNodeId(id.rowIndex);
        } 
        else if (id.colDef.field === 'price') {
                if (gridApi.getSelectedRows()[0].balanceDivision === undefined){
                    alert(" 대차구분 먼저 선택해 주세요 ")
                }
        }else if (id.colDef.field === 'summaryComment') {
            console.log("적요")
        }else if (id.colDef.field === 'journalNo') {
            setJournalDetailDialogOpen(true);
        }
        dispatch( { type : types.SET_JOURNAL_NO_REQUEST, 
            journalNo: id.data.journalNo,
        });
    };



    //========================== 분개삭제 ==========================
    const deleteBtn = () => {
        const selectedData = gridApi.getSelectedRows();   // 분개 그리드에서 check된 녀석 가져오고,
        if (selectedData.length === 0) {
            alert('삭제할거 선택해라');
        } else {
            gridApi.updateRowData({ remove: selectedData });  // 그리드에서 없애라.
        }
    };



    //========================== 분개저장 ==========================
    const saveOnchange =  (id) => {   // 분개 저장버튼을 눌렀을 때,
        if (id.colDef.field === 'price') {   // 계정코드 또는 계정명 cell을 클릭했을 때,
            let batchArray = gridApi.getSelectedRows();   // 선택된 row 정보를 array에 다 담음.
                if (batchArray[0].balanceDivision === '차변') {   // 대차구분이 차변이면,
                    batchArray[0].leftDebtorPrice = batchArray[0].price;   // leftDebtorPrice(차변) 칼럼에 price를 담고,
                    setLPrice(batchArray[0].price);   // 밑에서 차변 - 대변 = 0(대차평균의 원리) 검증을 해야하므로 lPrice에 담는다.
                } else if (batchArray[0].balanceDivision === '대변') {
                    batchArray[0].rightCreditsPrice = batchArray[0].price;
                    setRPrice(batchArray[0].price);
                }

        } 
    };


    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: '', field: 'check', width: 50, checkboxSelection: true },
        { headerName: "분개일련번호", field: "journalNo", width: 230 },
        { headerName: "계정코드", field: "accountCode", width: 100 },
        { headerName: "계정명", field: "accountName", width: 130 },
        { headerName: "대차구분", field: "balanceDivision", width: 100 },
        { headerName: "적요", field: "summaryComment", width: 230, editable: true, onCellClicked:(params)=>{console.log(params)} },
        { headerName: "거래처코드", field: "customerCode", width: 110 },
        { headerName: "거래처명", field: "customerName", width: 110 },
        { headerName: "금액", field: "price", width: 110, editable: true, valueFormatter: currencyFormatter },
        // valueFormatter : 그리드의 표시형식.
        { headerName: "전표번호", field: "slipNo", width: 110, hide: true },
        { headerName: "차변", field: "leftDebtorPrice", width: 110, hide: true },
        { headerName: "대변", field: "rightCreditsPrice", width: 110, hide: true },
        { headerName: "적요번호", field: "summaryNumber", width: 110, hide: true },
    ];

    //========================== 통화표시 포매터 ==========================
    function currencyFormatter(params) {
        return "￦" + formatNumber(params.value);
    };
    function formatNumber(number) {
        return Math.floor(number)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };   // 몰라. 통화표시 형식임.

    //==============================================================================
    return (
        <div>
                <div className={classes.root} style={{ width: '26%', float: 'right' }}>
                    <Button variant="contained" color="primary" disabled={flag} onClick={initalBtn}>
                        그리드 초기화
                    </Button>
                    <Button variant="contained" color="primary" disabled={flag} onClick={addBtn}>
                        분개추가
                    </Button>
                    <Button variant="contained" color="primary" disabled={flag}  onClick={deleteBtn}>
                        분개삭제
                    </Button>
                </div>
                <AppBar position="relative" className={classes.subCategory}>
                    <Toolbar>
                        <Typography variant="h5">분개</Typography>
                    </Toolbar>
                </AppBar>
                <div
                    className={"ag-theme-balham"}
                    style={{
                        height: "200px",
                        width: "100%",
                        paddingTop: "20px",
                    }}>
                    <AgGridReact
                        columnDefs={accountColumnDefs}
                        rowData={data}   // 그리드에 data 뿌림.
                        rowSelection='multiple'  // 여러 줄 선택가능.
                        onGridReady={onGridReady}  // 그리드가 초기화 되면.
                        onCellClicked={onCellClicked}  // cell 한개 클릭했을 때 발생 event.
                        onCellValueChanged={saveOnchange}
                    />
                </div>
                <br />
            {/* 여기 각 Dialog가 컴포넌트가 선언되어 있음. */}
            {/* 그리고 각 Dialog는 단순하게 뒷단과 연결되어 값을 agGrid로 뿌리게 되어있고, */}
            {/* onClose 이벤트로 value라는 객체에 data를 담아, 매개변수로 넘겨줘서 작업을 함. */}
            <AccountDialog open={accountDialogOpen} onClose={handleClose} />
            <BalanceDialog open={balanceDialogOpen} onClose={handleClose} />
            <CustomerDialog open={customerDialogOpen} onClose={handleClose} />
            <JournalDetailDialog open={journalDetailDialogOpen} onClose={handleClose} />
        </div>
    );
};

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

export default AddJournal;