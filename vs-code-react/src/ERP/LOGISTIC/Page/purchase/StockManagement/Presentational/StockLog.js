import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Button, TextField, FormControl } from "@material-ui/core";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';



  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(yellow[500]),
      margin: theme.spacing(2),
      backgroundColor: yellow[500],
      '&:hover': {
        backgroundColor: yellow[700],
      },
    },
  }))(Button);

  const useStyles = makeStyles((theme) => ({
    textStart: {
      margin: '16px'
    },
    textEnd: {
      margin: theme.spacing(1)
    }
  }));


const StockLog = ({
                    logData,
                    handleClick,
                    handleStartDate,
                    handleEndDate,
                    startDate,
                    endDate
                  }) => {



    const classes = useStyles();

    const columnDefs = [
        { headerName: "로그날짜", field: "logDate" },
        { headerName: "품목코드", field: "itemCode" },
        { headerName: "품목명", field: "itemName" },
        { headerName: "수량", field: "amount" },
        { headerName: "사유", field: "reason" },
        { headerName: "원인", field: "cause" },
        { headerName: "결과", field: "effect" }
    ];


    return (
            <>
            <FormControl>
                <form className={classes.container} noValidate>
                  <TextField
                    id="startDate"
                    label="날짜"
                    type="date"
                    className={classes.textStart}
                    value={startDate}
                    onChange={handleStartDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
            
                  <TextField
                    id="endDate"
                    label="날짜"
                    type="date"
                    className={classes.textEnd}
                    value={endDate}
                    onChange={handleEndDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </FormControl>
            <ColorButton className={classes.colorButton} variant={"contained"} color={"secondary"} onClick={handleClick}>
              조회
            </ColorButton>
                <div
                  className={"ag-theme-material"}
                  style={{
                    height: "600px",
                    width: "100%",
                  }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={logData}
                    rowSelection="single"
                    onGridReady={event => {
                      event.api.sizeColumnsToFit();
                    }}
                  />
               </div>
          </>
    )

}


export default StockLog;