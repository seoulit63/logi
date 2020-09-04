import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { yellow, pink } from '@material-ui/core/colors';
import InboundDialogContainer from 'ERP/LOGISTIC/Page/purchase/StockManagement/Container/InboundDialogContainer';

const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);
  

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(yellow[500]),
      backgroundColor: yellow[500],
      '&:hover': {
        backgroundColor: yellow[700],
      },
    },
  }))(Button);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));


const Stock = (props) => {

    const { onDeliveryRequest, handleClick, handleDate, rowData, today } = props;

    const classes = useStyles();

    const columnDefs = [
        { headerName: "창고코드", field: "warehouseCode" },
        { headerName: "품목코드", field: "itemCode" },
        { headerName: "품목명", field: "itemName" },
        { headerName: "단위", field: "unitOfStock" },
        { headerName: "안전재고량", field: "safetyAllowanceAmount" },
        { headerName: "재고량", field: "stockAmount" },
        { headerName: "입고예정재고량", field: "orderAmount" },
        { headerName: "투입예정재고량", field: "inputAmount"},
        { headerName: "납품예정재고량", field: "deliveryAmount" },
    ];

    return (
            <>
            <ColorButton variant={"contained"} color={"secondary"} onClick={handleClick}>
              조회
            </ColorButton>
            <BootstrapButton variant="contained" color="secondary" onClick={handleDate} disableRipple className={classes.margin}>
              현재 일자
            </BootstrapButton>
            <Button variant={"contained"} color={"secondary"} onClick={()=>onDeliveryRequest()}>
              입고
            </Button>
            <InboundDialogContainer/>

                <div
                  className={"ag-theme-material"}
                  style={{
                    height: "600px",
                    width: "100%",
                  }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    rowSelection="single"
                    onGridReady={event => {
                      event.api.sizeColumnsToFit();
                    }}
                  />
               </div>
          </>
    )

}

export default Stock;