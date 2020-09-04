import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import {DialogTitle,
        DialogActions,
        Dialog,
        Button,
        TextField,
    } from '@material-ui/core';
    
import * as types from 'ERP/ACCOUNT/ActionType/ActionType';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import {useDispatch, useSelector} from "react-redux";

import useInput from 'util/useInput';


// AccountDialog : 계정과목만 뿌려주는 Dialog임.
const JournalDetailDialog = ({ journalNo, onClose, open }) => {
    
    //========================== 그리드 객체 준비 ==========================
    const [positionGridApi, setPositionGridApi] = useState();
    const [accountName, setAccountName] = useState('null');

    const dispatch = useDispatch();

    const data = useSelector(({AccReducer}) => AccReducer.journalDetailList.journalDetailList , []);
    
    const accountCode = useInput('');

    const onGridReady = params => {
        setPositionGridApi(params.api);
    };
    
    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: "항목", field: "accountControlName", width: 210},
        { headerName: "항목내용", field: "journalDescription", width: 210 }
    ];

    //========================== 계정과목 조회 ==========================
    // 이 Dialog가 한번 랜더링 되면 get 방식으로 뒷단에서 모든 계정과목 data를 들거와서 data에 저장함.
    useEffect(() => {
        dispatch( { type : types.SET_JOURNAL_NO_REQUEST, 
            journalNo: journalNo,
        });
    }, [journalNo]);
    

    const Close = () => {
        onClose();
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'xs'}>
            <DialogTitle id="simple-dialog-title">분개상세</DialogTitle>
            <List >
                <div className={"ag-theme-balham"}
                    style={{
                        height: "300px",
                        width: "100%",
                        paddingTop: "8px"
                    }}>
                    
                    <AgGridReact
                        columnDefs={accountColumnDefs}
                        rowData={data}   // 뿌릴 data
                        rowSelection='single'  // 하나만 선택 가능.
                        onGridReady={onGridReady}
                        onCellClicked=''  // cell을 클릭하면, handleClose가 실행된다.
                    />
                    
                </div>
            </List>
            <DialogActions>
                <Button onClick={Close} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
JournalDetailDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default JournalDetailDialog; 