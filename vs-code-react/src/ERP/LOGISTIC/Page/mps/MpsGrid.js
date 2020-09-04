import React, { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Button } from "@material-ui/core";
import logiApi from 'Api/logiApi';

const MpsGrid = mpsGridData => {
    const mpsGrid = mpsGridData.mpsGridData;
    const { columnDefs, mpsRowData, putUrl } = mpsGrid;

    const batchData = async event => {
        event.preventDefault();
        // console.log(mpsRowData[0].mrpApplyStatus);
        mpsRowData[0].mrpApplyStatus = 'Y';
        // console.log(mpsRowData[0].mrpApplyStatus);
        const response = await logiApi.put('/logi/production/registerMps', mpsRowData);
        //   console.log(response);
    }

    return (
        <React.Fragment>
            {/* <TextField value={changeData}/> */}
            <div
                className={"ag-theme-balham"}
                style={{
                    height: "250px",
                    width: "100%",
                    paddingTop: "20px"
                }}>
                <div align="right">
                    <br />
                    <Button
                        style={{
                            color: '#ecf0f1',
                            backgroundColor: '#4b4b4b'
                        }}
                        variant={"contained"}
                        color={"primary"}
                        onClick={batchData}
                    >Mps저장
                    </Button>
                </div>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={mpsRowData}
                    //rowSelection='single'
                    //onRowSelected={onRowSelected}
                    //onCellEditingStopped={onCellEditingStopped}
                    onGridReady={event => {
                        event.api.sizeColumnsToFit();
                    }}
                    onGridSizeChanged={event => {
                        event.api.sizeColumnsToFit();
                    }}
                    enableColResize='true'
                />

            </div>
        </React.Fragment>
    );
}

export default MpsGrid;