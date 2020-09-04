import React, { useState } from 'react';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { Button } from "@material-ui/core";

const MpsContractGrid = ({ gridData, mpsGridData, setMpsGridData }) => {
    console.log(gridData);
    const { columDefs, rowData } = gridData;
    //const { columDefs, rowData} = congridData;
    // 그리드 데이터 처리

    const [changeData, setChangeData] = useState([]);
    //const [mpsData, setMpsData] = useState([]);
    const [amount, setAmount] = useState({
        estimateAmount: '',
        unitPriceOfContract: '',
        productionRequirement: '',
        itemName: ''

    });
    const { estimateAmount, unitPriceOfContract, productionRequirement, itemName } = amount;
    const toDay = new Date().toISOString().substr(0, 10).replace('T', ' ');



    ////////////////////////////////////////////////////////////////////////////

    const index = 0;

    const onRowSelected = event => {
        console.log(event);

        console.log(event.data.contractDetailNo);

        if (event.node.selected) {
            setAmount({
                estimateAmount: event.data.estimateAmount,
                unitPriceOfContract: event.data.unitPriceOfContract,
                productionRequirement: event.data.productionRequirement,
                itemName: event.data.itemName
            });

            setChangeData([{
                mpsNo: ("MPS" + toDay + "-" + (index + 1)),
                mpsPlanClassification: "수주",
                contractDetailNo: event.data.contractDetailNo,
                itemCode: event.data.itemCode,
                itemName: event.data.itemName,
                unitOfMps: event.data.unitOfContract,
                mpsPlanDate: toDay,
                mpsPlanAmount: (event.data.estimateAmount - event.data.stockAmountUse),
                dueDateOfMps: (event.data.dueDateOfContract),
                scheduledEndDate: (event.data.dueDateOfContract + 30), //날짜변환 해야됨..ㅠㅠ
                mrpApplyStatus: 'N'
            }]

            );
            // console.log(changeData);
        }
    }

    const selectData = event => {
        // console.log("@@@@@@@@ Mps로가는길 @@@@@@@");
        // console.log(estimateAmount);

        if (unitPriceOfContract > estimateAmount) {
            alert("재고가 존재합니다. 납품페이지로 이동하시겠습니까?");
        } else {
            alert("품목명 : " + itemName);
            alert("창고현재 재고량 : " + unitPriceOfContract + " - 수주수량 : " + estimateAmount + " = 생산계획수량 : " + productionRequirement);
            setMpsGridData({
                ...mpsGridData,
                mpsRowData: changeData
            });
        }

        // console.log(mpsGridData);
    }


    //////////////////////////////////////////////////////////////////////////////


    return (
        <React.Fragment>
            <br />
            <div
                className={"ag-theme-balham"}
                style={{
                    height: "250px",
                    width: "100%",
                    paddingTop: "20px"
                }}>
                <AgGridReact
                    columnDefs={columDefs}
                    rowData={rowData}
                    rowSelection='single'
                    onRowSelected={onRowSelected}
                    //onCellEditingStopped={onCellEditingStopped}
                    onGridReady={event => {
                        event.api.sizeColumnsToFit();
                    }}

                    onGridSizeChanged={event => {
                        event.api.sizeColumnsToFit();
                    }}

                    enableColResize='true'
                />
                <div align="center">
                    <br />
                    <Button
                        style={{
                            color: '#ecf0f1',
                            backgroundColor: '#4b4b4b'
                        }}
                        variant={"contained"}
                        // color={"primary"}
                        onClick={selectData}
                    >▼
                    </Button>
                </div>
            </div>
            <div>
                <br />
                <br />
                {/* <MpsGrid mpsData={mpsData}/> */}
            </div>

        </React.Fragment>
    );
}

export default MpsContractGrid;