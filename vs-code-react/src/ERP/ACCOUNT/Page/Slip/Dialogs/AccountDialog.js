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
const AccountDialog = ({ onClose, open }) => {
    
    //========================== 그리드 객체 준비 ==========================
    const [positionGridApi, setPositionGridApi] = useState();
    const [accountName, setAccountName] = useState('null');

    const dispatch = useDispatch();

    const data = useSelector(({AccReducer}) => AccReducer.accountList , []);

    const accountCode = useInput('');

    const onGridReady = params => {
        setPositionGridApi(params.api);
    };
    
    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: "계정과목 코드", field: "accountCode", width: 210},
        { headerName: "계정과목 명", field: "accountName", width: 210 }
    ];



    //========================== 계정과목 조회 ==========================
    // 이 Dialog가 한번 랜더링 되면 get 방식으로 뒷단에서 모든 계정과목 data를 들거와서 data에 저장함.
    useEffect(() => {
        dispatch({ type : types.SEARCH_ACCOUNT_REQUEST, params : { accountName: accountName }});
        // async function findDetailAccountList() {
        //     const response = await Axios.get('http://localhost:8282/acc/account/getAccountListByName', {
        //         params: {
        //             accountName: accountName  // code를 null을 주면 마이바티스의 동적쿼리로 모든 계정과목이 조회되어 날라옴.
        //         }
        //     });
        //     setData(response.data.accountList);
        // };
        // findDetailAccountList();
    }, [accountName]);



    const searchAccountCode = () => {
        setAccountName(accountCode.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setAccountName(accountCode.value);
        }
      }


    const handleClose = () => {
        onClose({
            data : positionGridApi.getSelectedRows(),  // data는 클릭한 row의 정보이고,
            division : 'accountDialog'  // 구분은 accountDialog다.
        });
    };

    const Close = () => {
        onClose({
            division : 'accountDialog'  // 구분은 accountDialog다.
        });
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'xs'}>
            <DialogTitle id="simple-dialog-title">계정과목 선택창</DialogTitle>
            <div style={{float: 'center' }} >
                <TextField name="search" 
                           id="standard-search" 
                           label="검 색" 
                           onKeyPress={(e) => { handleKeyPress(e) }} 
                           onChange={ accountCode.onChange }
                           type="search"
                />
                <Button variant="contained" color="primary" onClick = {() => {searchAccountCode()}} > 찾 기 </Button>
            </div>
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
                        onCellClicked={handleClose}  // cell을 클릭하면, handleClose가 실행된다.
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

AccountDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default AccountDialog; 