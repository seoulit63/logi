import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import ItemDialog from './Dialog/ItemDialog';
import Calendar from './Dialog/Calendar';
import EstimatePriceDialog from './Dialog/EstimatePriceDialog';
import moment from 'moment';
import {
    makeStyles,
    withStyles,
    Button,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

//========================== 통화표시 포매터 ==========================
function currencyFormatter(params) {
    return "￦" + formatNumber(params.value);
};
function formatNumber(number) {
    return Math.floor(number)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};   // 몰라. 통화표시 형식임.

const ColumnDefs2 = [
    { headerName: "", field: "", headerCheckboxSelection: true },
    { headerName: "품목코드", field: "estimateDetailNo", minWidth: 100 },
    { headerName: "품목명", field: "itemName", minWidth: 100 },
    { headerName: "단위", field: "unitOfEstimate", minWidth: 100 },
    { headerName: "납기일", field: "dueDateOfEstimate", minWidth: 100 },
    { headerName: "견적수량", field: "estimateAmount", minWidth: 100 },
    { headerName: "견적단가", field: "unitPriceOfEstimate", minWidth: 100, valueFormatter: currencyFormatter },
    { headerName: "합계액", field: "sumPriceOfEstimate", minWidth: 100, valueFormatter: currencyFormatter },
    { headerName: "비고", field: "description", minWidth: 100 },
    { headerName: "상태", field: "statue", minWidth: 100 },
];

const useStyles = makeStyles(theme => ({
    root: { margin: 0, maxWidth: 180 },
}));


const EstimateRegisterDetail = ({ dialogData, itemRowData, amoutpriceData, standardUnitPrice }) => {

    //========================== 그리드 객체 준비 ==========================
    const [gridApi, setGridApi] = useState();
    const [itemDialogOpen, setItemDialogOpen] = useState(false);
    const [CalendarDialogOpen, setCalendarDialogOpen] = useState(false);
    const [PriceDialogOpen, setPriceDialogOpen] = useState(false);
    const [CalendarValue, setCalendarValue] = useState('');
    const onGridReady = params => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();   // 그리드 초기화 시 칼럼 사이즈 자동조절.
    };   // 여긴 그냥 ag Grid의 api를 사용하기 위해 선언. 그리고 이곳은 ag Grid 초기화 시 실행된다.
    const [itemValue, setItemValue] = useState('');
    const [amountPriceValue, setAmountPriceValue] = useState({
        estimateAmount: 0,
        sumPriceOfEstimate: 0
    });

    //================견적 상세 추가==========================
    const addDetailBtn = () => {
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
            estimateDetailNo: '',
            itemName: '',
            unitOfEstimate: '',
            dueDateOfEstimate: '',
            estimateAmount: 0,
            unitPriceOfEstimate: 0,
            sumPriceOfEstimate: 0,
            description: '',
            statue: 'N',
        }

        return newData;
    };
    //==========유효일자 다이얼로그(Calendar.js)에서 넣어오는 값 렌더링===================

    useEffect(() => {
        console.log("array2", itemValue);

        if (!!itemValue) {
            let itemsToUpdate = [];
            gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
                if (index !== nodeRow) {
                    return;
                }   // nodeId : 그리드의 몇 번째 cell에 값을 박을 것인지를 알려줌.
                let dialogData = rowNode.data;
                switch (nodeId) {
                    case "estimateDetailNo":
                        dialogData.estimateDetailNo = itemValue.codeData
                        dialogData.itemName = itemValue.codeNameData
                        break;
                    case "unitOfEstimate":
                        dialogData.unitOfEstimate = itemValue.codeData
                        break;
                    default:
                        break;
                }
                console.log(dialogData);
                itemsToUpdate.push(dialogData);
            });
            gridApi.updateRowData({ update: itemsToUpdate });
        };
    }, [itemValue]);


    //==========유효일자 다이얼로그(Calendar.js)에서 넣어오는 값 렌더링===================
    useEffect(() => {

        if (CalendarValue[0] !== undefined) {  // Calendar에서 CalendarValue 를 주는데 이게 존재한다면,
            let itemsToUpdate = [];
            gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
                if (index !== nodeRow) {
                    return;
                }   // nodeId : 그리드의 몇 번째 cell에 값을 박을 것인지를 알려줌.
                let estimateData = rowNode.data;   // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
                estimateData.dueDateOfEstimate = moment(CalendarValue).format('yyyy-MM-DD');
                itemsToUpdate.push(estimateData);  // 배열에 집어넣고,
            });
            gridApi.updateRowData({ update: itemsToUpdate });   // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
        };
    }, [CalendarValue]);  // accountValue가 변할 때마다 이 useEffect를 실행하라.

    useEffect(() => {
        if (amountPriceValue.estimateAmount !== 0 && amountPriceValue.sumPriceOfEstimate !== 0) {  // accountDialog에서 accountValue 를 주는데 이게 존재한다면,
            let itemsToUpdate = [];
            gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
                if (index !== nodeRow) {
                    return;
                }   // nodeId : 그리드의 몇 번째 cell에 값을 박을 것인지를 알려줌.
                let estimateData = rowNode.data;   // rowNode 
                estimateData.estimateAmount = amountPriceValue.estimateAmount;
                estimateData.unitPriceOfEstimate = standardUnitPrice;
                estimateData.sumPriceOfEstimate = amountPriceValue.sumPriceOfEstimate;
                console.log(estimateData)
                itemsToUpdate.push(estimateData);  // 배열에 집어넣고,
            });
            console.log(itemsToUpdate)
            gridApi.updateRowData({ update: itemsToUpdate });   // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
        };
    }, [amountPriceValue]);  // accountValue가 변할 때마다 이 useEffect를 실행하라.


    //==============셀클릭 이벤트 =======
    const [nodeId, setNodeId] = useState('');
    const [nodeRow, setNodeRow] = useState('');
    const [itemCode, setItemCode] = useState('');
    const onCellClick = (id) => {
        console.log("액션객체,액션객체,액션객체 ", id.colDef.field);
        if (id.colDef.field === 'estimateDetailNo') {
            setItemDialogOpen(true); // 화면 열기
            setNodeId(id.colDef.field);
            setNodeRow(id.rowIndex)
            dialogData({
                type: "dialogData",
                divisionCode: "IT-_I",

            });
        } else if (id.colDef.field === 'unitOfEstimate') {
            setItemDialogOpen(true); // 화면 열기
            setNodeId(id.colDef.field);
            setNodeRow(id.rowIndex)
            dialogData({
                type: "dialogData",
                divisionCode: "UT",
            })
        } else if (id.colDef.field === 'dueDateOfEstimate') {
            setCalendarDialogOpen(true);
            setNodeId(id.colDef.field);
            setNodeRow(id.rowIndex)

        } else if (id.colDef.field === 'estimateAmount') {
            console.log("aklsdfjal;dfkjasl;fjkasdkl;fjadkl;f", id.data.estimateDetailNo);
            setItemCode(id.data.estimateDetailNo)
            setPriceDialogOpen(true);
            setNodeId(id.colDef.field); setNodeRow(id.rowIndex)

        }
    }
    const CalendarClose = value => {

        if (value.division === 'CalendarDialog') {
            setCalendarDialogOpen(false);
            setCalendarValue(value.data["estimateDate"]); // 닫을 때 클릭한 정보 넣기
        } return;
    }
    const handleClose = value => {
        if (value.division === 'ItemDialog') {
            setItemDialogOpen(false);
            setItemValue(value.data); // 닫을 때 클릭한 정보 넣기
        } return;
    }
    const priceClose = value => {
        if (value.division === 'EstimateDialog') {
            setPriceDialogOpen(false);
            setAmountPriceValue(value.data); // 닫을 때 클릭한 정보 넣기
            console.log(value)
            console.log(amountPriceValue)
        } return;
    }



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

    console.log("itemDialogOpenitemDialogOpen", itemDialogOpen);
    return (
        <div>
            <ColorButton onClick={() => addDetailBtn()}>견적 상세 추가</ColorButton>
            <ColorButton>선택한 항목 삭제</ColorButton>

            <div
                className={"ag-theme-material"}
                style={{
                    height: "300px",
                    width: "100%",
                }}
            >
                <AgGridReact
                    columnDefs={ColumnDefs2}
                    rowData={""}
                    rowSelection="single"
                    // onRowSelected={onRowSelected}
                    // onCellEditingStopped={onCellEditingStopped}
                    rowHeight="35"
                    onGridReady={onGridReady}
                    onCellClicked={onCellClick}
                />
            </div>
            <ItemDialog open={itemDialogOpen} itemRowData={itemRowData} onClose={handleClose} />
            <Calendar open={CalendarDialogOpen} onClose={CalendarClose} />
            <EstimatePriceDialog open={PriceDialogOpen} onClose={priceClose} itemCode={itemCode} amoutpriceData={amoutpriceData} standardUnitPrice={standardUnitPrice} />
        </div>
    )
};

export default EstimateRegisterDetail;