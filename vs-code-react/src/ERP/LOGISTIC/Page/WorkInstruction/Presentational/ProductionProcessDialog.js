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


const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
      });
      
const ProductionProcessDialog = ({
                                  onRowSelected,
                                  isSubOpen,
                                  subRowData,
                                  handleClose
                                  }) => {

const columnDefs = [
    { headerName: "상세코드번호", field: "detailCode" },
    { headerName: "상세코드이름", field: "detailCodeName" },
    { headerName: "사용여부", field: "codeUseCheck" }
];


  return (
    <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={isSubOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"생산 공정 코드"}</DialogTitle>
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
                        rowSelection="single"
                        rowData={subRowData}
                        onRowSelected={onRowSelected}
                        onGridReady={event => {
                            event.api.sizeColumnsToFit();
                        }}
                    />
           </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           닫기
          </Button>
        </DialogActions>
      </Dialog>
  );
}



export default ProductionProcessDialog;