import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import ProductionProcessDialogContainer from 'ERP/LOGISTIC/Page/WorkInstruction/Container/ProductionProcessDialogContainer';
import WISubDialogContainer from 'ERP/LOGISTIC/Page/WorkInstruction/Container/WISubDialogContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkInstructionDialog = ({
                                handleDate,
                                handleRequest,
                                handleActualRequest,
                                hideDialog,
                                subRowData,
                                isOpen,
                                codeName
                                }) => {

    const classes = useStyles();

    const columnDefs = [
        { headerName: "소요량전개번호", field: "mrpNo" },
        { headerName: "주생산계획번호", field: "mpsNo" },
        { headerName: "소요량취합번호", field: "mrpGatheringNo" },
        { headerName: "품목분류", field: "itemClassification", editable: true },
        { headerName: "품목코드", field: "itemCode" },
        { headerName: "품목명", field: "itemName" },
        { headerName: "단위", field: "unitOfMrp"},
        { headerName: "재고량(투입예정재고)", field: "inputAmount" },
        { headerName: "재고소요/제품제작수량", field: "requiredAmount" },
        { headerName: "재고량(재고소요이후)", field: "stockAfterWork" },
        { headerName: "작업지시기한", field: "orderDate" },
        { headerName: "작업완료기한", field: "requiredDate" },
    ];

  
    return (
        <Dialog
            fullWidth="lg"
            maxWidth="lg"
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={hideDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"모의 작업 지시"}</DialogTitle>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="사업장 및 생산공정" variant="outlined" placeholder="사업장 및 생산공정" value={codeName}/>
        </form>
        <DialogActions>
            <Button variant={"outlined"} color={"secondary"} onClick={handleDate}>현재 일자</Button>
            <Button variant={"outlined"} color={"secondary"} onClick={handleActualRequest}>현재 결과 작업 지시</Button>
            <Button variant={"outlined"} color={"secondary"} onClick={handleRequest}>사업장 및 생산공정</Button>
            <ProductionProcessDialogContainer  />
            <WISubDialogContainer />
        </DialogActions>
        <DialogContent>
            <div
                className={"ag-theme-material"}
                style={{
                height: "300px",
                width: "100%",
                }}
                >
                  <AgGridReact
                          columnDefs={columnDefs}
                          rowData={subRowData}
                          rowSelection="single"
                          onGridReady={event => {
                              event.api.sizeColumnsToFit();
                          }}
                  />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialog} color="primary">
           닫기
          </Button>
        </DialogActions>
      </Dialog>
    )
};




export default WorkInstructionDialog;