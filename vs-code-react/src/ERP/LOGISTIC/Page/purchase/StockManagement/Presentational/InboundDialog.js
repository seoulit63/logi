import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
      },
    }));
    
const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });



export default ({ isDeliveryOpen, deliveryData, hideOnDelivery, inboundRequest }) => {

    const classes = useStyles();

    const columnDefs = [
        { headerName: "선택",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true, },
        { headerName: "발주번호", field: "orderNo" },
        { headerName: "발주날짜", field: "orderDate" },
        { headerName: "상태", field: "orderInfoStatus" },
        { headerName: "발주구분", field: "orderSort" },
        { headerName: "품목코드", field: "itemCode" },
        { headerName: "품목명", field: "itemName" },
        { headerName: "수량", field: "orderAmount", editable: true},
    ];

    const onRowSelected = () => {

    }

    return (
        <>
        <Dialog
            fullWidth="lg"
            maxWidth="lg"
            open={isDeliveryOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={hideOnDelivery}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"입고"}</DialogTitle>
        <DialogActions>
            <Button variant={"outlined"} color={"secondary"} onClick={inboundRequest}>현재 체크된 발주품목 입고</Button>
        </DialogActions>
        <DialogContent>
            <div
                className={"ag-theme-material"}
                style={{
                height: "300px",
                width: "100%",
                }}
                >
                  <AgGridReact
                          columnDefs={columnDefs}
                          rowData={deliveryData}
                          rowSelection="multiple"
                          onRowSelected={onRowSelected}
                          onGridReady={event => {
                              event.api.sizeColumnsToFit();
                          }}
                />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideOnDelivery} color="primary">
           닫기
          </Button>
        </DialogActions>
      </Dialog>
        </>
    );
}