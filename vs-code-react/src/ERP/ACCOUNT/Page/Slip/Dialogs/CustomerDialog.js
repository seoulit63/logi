import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

import {useDispatch, useSelector} from "react-redux";

import * as types from 'ERP/ACCOUNT/ActionType/ActionType';

import { DialogActions , 
         List ,
         Button ,
         DialogTitle ,
         Dialog ,
        } from '@material-ui/core';


// CustomerDialog : 거래처만 뿌려주는 Dialog임. 따로 주석 안달겠음. 
// AccountDialog.js와 거의 동일하므로 거기 주석 보삼.
const CustomerDialog = (props) => {

    //========================== 그리드 객체 준비 ==========================
    const [positionGridApi, setPositionGridApi] = useState();
    const onGridReady = params => {
        setPositionGridApi(params.api);
    };

    const dispatch = useDispatch();

    const data = useSelector(({AccReducer}) => AccReducer.customerList , []);
    
    //========================== 그리드내용 ==========================
    const CustomerColumnDefs = [
        { headerName: "거래처 코드", field: "customerCode", width: 110},
        { headerName: "거래처 명", field: "customerName", width: 110},
        { headerName: "거래처 유형", field: "customerType", width: 110},
        { headerName: "업태", field: "customerBusinessConditions", width: 110},
        { headerName: "종목", field: "customerBusinessItems", width: 140},
    ];

    useEffect(() => {
        dispatch({ type : types.SEARCH_CUSTOMER_REQUEST, params :{searchCondition : 'ALL', workplaceCode : ''}});   // 일단 다 들고오게 했음 아니게 만들려면 Listitem 해서 값을 넣거나 세션스토리지에서 들고오면 됨
        // async function findDetailAccountList() {
        //     const response = await Axios.get('http://localhost:8282/hr/basicInfo/searchCustomer' , 
        //     {params:
        //             {searchCondition : 'ALL',
        //             workplaceCode : 'null'}
        //     });
        //     setData(response.data);
        // };
        // findDetailAccountList();
    }, []);

    const { onClose, open } = props;

    const handleClose = () => {
        onClose({
            data : positionGridApi.getSelectedRows(),
            division : 'customerDialog'
        });
    };
    const Close = () => {
        onClose({
            division : 'customerDialog'  // 구분은 accountDialog다.
        });
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle id="simple-dialog-title">거래처 선택창</DialogTitle>
            <List >
                <div className={"ag-theme-balham"}
                    style={{
                        height: "300px",
                        width: "100%",
                        paddingTop: "8px"
                    }}>
                    <AgGridReact
                        columnDefs={CustomerColumnDefs}
                        rowData={data}
                        rowSelection='single'
                        onGridReady={onGridReady}
                        onCellClicked={handleClose}
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

CustomerDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default CustomerDialog; 