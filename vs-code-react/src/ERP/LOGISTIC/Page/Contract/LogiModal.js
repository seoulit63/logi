import React from "react";
import { Dialog, DialogTitle, DialogContent, List, DialogActions, Button } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

const LogiModal = ({ isOpenModal, data, closeEsDialog, handleClose }) => {
    const state = {
        commColumnDefs: [ 
            { headerName: "상 세 코 드 번 호", field: "detailCode", width: 150, },
            { headerName: "상 세 코 드 이 름", field: "detailCodeName", width: 150, },
            { headerName: "사 용 여 부", field: "codeUseCheck", width: 100, }
        ],
        rowData: data,
    };
    
    return(
        <div>
            <Dialog open={isOpenModal} onClose={closeEsDialog} fullWidth={true} maxWidth={'xs'}>
                <DialogTitle id="simple-dialog-title">목 록</DialogTitle>
                <DialogContent>
                    <List>
                        <div className={"ag-theme-balham"}
                            style={{ height: "300px", width: "100%", paddingTop: "8px" }}>
                            <AgGridReact
                                columnDefs={state.commColumnDefs}
                                rowData={state.rowData}   // 뿌릴 data
                                rowSelection='single'  // 하나만 선택 가능.
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
    );
};
export default LogiModal;